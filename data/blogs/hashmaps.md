---
title: "Hashmap Collisions Deepdive"
excerpt: "Hash collision strategies and why context determines which one to use"
date: "2026-01-12"
tags: ["computer-science", "systems", "learning", "databases", "go"]
series: "Databases"
series_part: 2
readTime: "10 min read"
---
# Learnings about Hashmaps

Recently, I had been building out some simple datastructures from scratch in an effort to learn Go (as a part of a larger database internals deepdive). One of these datastructures was the Hashmap (or HashTable if you prefer).

I had previously built one from scratch as a learning exercise and they aren't very complicated conceptually. Developers use them every day without much fanfare. They are a handy tool that provide O(1) lookups and inserts. But overall pretty boring, right? Well, turns out there's a bit more going on (as with many things in computer science). 

## What it is

So first, let's get the "what is a hashmap" out of the way. 

The idea is simple. We have some "value" we wish to store quickly and lookup later, also quickly. Fixed length arrays are an obvious choice. They have O(1) lookups/inserts if you directly index into the piece of memory you're trying access/write to. That index being called a "key" usually. So here, we have conceived the concept of (key, value) pairs.

That's basically what a Hashmap is: a wrapper around a fixed length array. The key is how we choose the index into the array. The index is chosen by hashing the key (hence the name), modulo-ling (yeah, I don't know if I can verb that one) it to ensure it's an allowed index for the array. We want it such that this hashed index is "random" and, importantly, evenly distributed across the entire contiguous block of memory space that makes up the array. Once we have that random, evenly distributed index (and also importantly, repeatable), we know what space in the array this particular key "belongs" to.

That's more or less all there is to it at a high level. If you're new to CS, welcome. If not, sorry.

If one stops to think for a bit though, what happens when two keys hash-modulo to the same index? Most of the interesting bits algorithmically for a Hashmap implementation occurs when trying to answer this question (and the point of this post!).

## Hash Collision Techniques

Alright, let's dive in. At a high level, we can break down collision techniques into two broad buckets, each with variants of their own: Open addressing and separate chaining.

**Open Addressing**

This technique, also called closed hashing, keeps everything in the main array. If there's a collision, we probe for another slot using some algorithm. The choice for the algorithm gives rise to a few variants, some of which we will discuss shortly.

**Separate Chaining**

Sometimes referred to as "closed addressing," each index in the main array is treated as a bucket that points to some auxiliary data structure. If there's a collision, we add the value to this data structure. Usually, it's just a linked list, but it can also be a tree, skip list, or overflow pages (depending on the use case).

### Open Addressing

As I mentioned, there are a few variants of the Open Addressing technique. I'll discuss each and touch on performance as we go.

#### Linear Probing

Linear probing is fairly self explanatory. When we encounter a collision, we simply increment the index by 1 and check this new spot. If it's open great! If not, we keep going until we find an open spot.

The advantages of this technique are that it is fairly simple. You can implement the logic easily and readily and if your array is large enough and your hash function good enough, you have amortized inserts and gets at your expected O(1) time complexity.

However, while average times are O(1), it is easy to see that there are some worst case scenarios where the time complexity approaches O(n) (if not exactly outright) due to the fact that we are not *guaranteed* to continue to not have collisions.

Moreover, linear probing also suffers from "clumping." If a certain section has collisions, you're more likely to hit that section again, causing a collision, and dumping your value to the first available spot immediately after the clump, making it larger (and increasing the likelihood of hitting that clump again).

So while linear probing tends to be the simplest to implement, it often is not used in production environments due to (comparatively) low performance.

#### Swiss Tables (and Quadratic Probing)

The further reading section has a few articles that will explain this better and more thoroughly than I could. 

But the general idea is that Swiss Tables are a form of open addressed tables that break down their backing array into logical groups (usually of 8). Each group has a control word consisting of a byte per slot in the group (so usually 64-bits total for the group of 8 slots). The value of the byte can be used to determine the current status of the slot: empty, deleted, or filled. And if it is in use, the byte contains the lower 7-bits of the hashed key for that slot.

From there, during insertion, we will:

1. Hash the key in the normal, open addressed way. However, we will break the hash into the upper 57-bits and the lower 7-bits.
2. The upper bits are used to determine what group we want to check first
3. In Swiss tables, any slot within a group is a-ok to make the insertion, so we have to check them all to see if the key already exists within the group (and if it is make an update). This step is where the speed ups happen generally for Swiss Tables over other implementations.
4. If no slot contains the key, and there are empty slots, put it in one
5. If the group is full, we probe for a new group.

**Quadratic Probing**

A quick aside here to address quadratic probing. In a typical Swiss table, we will employ quadratic probing. However, the two are actually not inherently tied together. Swiss tables typically make use of this probing technique because they are *trying* to be as fast as possible hence the note here.

As discussed earlier, linear probing has some limitations in practical use. For linear probing, we hash to an index h and incrementally add one until we find an open slot (h, h + 1, h + 2, h + 3...). For quadratic probing, we take that same sequence and instead square the increment (h, h + 1^2, h + 2^2, h + 3^2...). This solves the limitation of the clustering issue with linear probing by attempting to "escape" the current cluster. This obviously *still* doesn't work very well if your hash function hashes every key to the same group, but it's at least not worse.

Ok, back to Swiss tables. 

**Slot Lookups**

In step 3 above, slot lookups, I mentioned that this is where the magic happens for Swiss Tables. At first glance, it seems unintuitive: if a key can be inserted into ANY slot, doesn't that mean you have to do a lookup in every slot to make sure that the key isn't already there? Well, yes, that's correct. The key here is the control word. 

Remember, the control word contains the lower 7-bits of the hashed key. We can use this to quickly find candidate slots that the key *might* be in and quickly eliminate others by doing a byte-by-byte comparison. And it just so happens this operation is supported by [SIMD](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data), meaning we can do multiple comparisons in parallel (and on modern hardware, conveniently, 8 comparisons is a safe bet). So, in the case of groupings of 8 slots, we've done 8 steps of a probe at once! That's pretty good.

There is a chance (1/128 for a 7-bit hash) where the lower 7-bits match but the full hashes are different. So while it is relatively low chance, we still have to make one further comparison against the found candidates. But overall, this lookup technique is quite fast compared to others.

### Separate Chaining

Separate chaining starts similarly to open addressing. You hash-modulo a key to find an index to insert at. However, the difference is that while open addressing treats each spot as uniquely owned by a something while it occupies that index, separate chaining allows multiple objects at a single index.

Instead, when you find an appropriate index and something is there, instead of finding a new spot, the object is inserted into some *other* data structure that lives in the index. Meaning that implementation is often easier for this method.

The simplest version we can think of is a linked list. When a new object is inserted, it is added to a linked list that is located at the index. So the original array is not an array of generic values and their keys, it's an array of linked lists where each linked list holds the key-value pairs. However, it's also easy to see that any old data structure could live there (and often we'd like better ones than linked lists for a variety of reasons).

Separate chaining has some advantages over open addressed maps. Namely, we never have to worry about collisions. Just insert and be done with it. There are times where you can even pre-allocate the space for the auxiliary data structure. This way memory access remains fast because it's contiguous AND you don't have to allocate as you're inserting new objects. 

Separate chaining though does often lead to pointer chasing once it starts filling up. This leads to worse memory locality and cache-unfriendliness that can degrade performance.

They are also generally larger than their open addressed peers due to allocating data for the auxiliary data structures. 

Though, we, in theory, never have to resize because you can keep inserting into the same location (thus load sizes > 1 are possible). And even as it fills, lookups, insertions, and deletions never get worse performance than their auxiliary data structure (unlike linear probing where clusters can start to form).

## Lessons in Applications

We've introduce a few different algorithms for selecting indexes and/or handling collisions. How do we choose which one to use? Let's look at some real world applications/programs to see what they use as a guide.

### Golang Implementation

Prior to Go 1.24, Go utilized a separate chaining technique with fixed sized bucket arrays and overflow pointers to preallocated overflow buckets to manage collisions. Kind of a linked list where each node is an array (a fat bucket if you will).

In Go 1.24, the built-in map type was [updated to use the Swiss Table implementation](https://go.dev/blog/swisstable). They saw up to a 60% speed up in map operations over their previous version in microbenchmarks.

This appears to point to Swiss tables as being a better choice. If Go, the widely used language and invented at Google (where literal geniuses work), utilizes Swiss tables then we have our answer, right? Swiss tables MUST be the best choice.

Well, not exactly. It turns out there are some good reasons why you might choose a different implementation.

### SQLite and PostgreSQL

As the high level section header suggests, the "good reasons" are usually application driven. 

For example, both PostgreSQL and SQLite utilize separate chaining techniques in their HashTable implementations. We have seen that Go originally made use of separate chaining, moved away from it, and saw pretty significant performance improvements. And, as it turns out, PostgreSQL's in-memory hashing makes use of a very similar technique to pre-Go 1.24.

So why? Well, for one, simplicity is often a ruling factor. Swiss tables are MUCH more complicated to implement and as a result have many more edge cases to consider. For Go, the tradeoff was worth it because often Maps ARE the workload. However, in a database application like PostgreSQL the bottlenecks are almost always elsewhere (I/O, query planning, disk reads, etc). There are more low hanging fruit to be had for performance gains.

In addition, because it is not usually the bottleneck, separate chaining techniques also have one more important factor: more stable worst case performance. As we discussed with open addressed implementations, we can sometimes find clustering of elements that worsen performance over time. For separate chaining, particularly bucketed versions like the old Go and PostgreSQL implementations, you can have some guarantee about how poorly your operations *may* perform. And in PostgreSQL's case, this guarantee that the table is NOT the bottleneck furthers separate chaining's usefulness.

### DuckDB

Finally, we arrive at the last application: an OLAP database called DuckDB. Unlike typical OLTP databases (the types of databases you typically think of PostgreSQL, SQLite, MySQL, etc), OLAP DB's concern themselves with accessing data used for (frequently) large batch analytics processes.

What's interesting is that the use case requires YET ANOTHER version of the Hashmap that we have already discussed: open addressed linear probing. That's right. The one I opened with and defiantly stated that it had no practical, real world use case (yes, I am an untrustworthy narrator, sorry about that ;) ).

DuckDB is able to outperform other in memory aggregation operations from Pandas, Polars, and Arrow even across workloads up to 100 million rows.

For OLAP style workloads, caching performance does matter. As I mentioned, these are huge, often correlated datasets (think time series information) where doing a lookup, colliding, and then chasing pointers is bad performance. Even swiss tables' bucketed approach with quadratic probing cannot as effectively make use of cache locality the way linear probing can and does.

But why is pointer chasing sometimes bad? Well, it's a physical hardware limitation. L1 cache is FAST, like single digits nanoseconds fast. Whereas accessing from main memory can be 100's of ns. So while linear probing *might* end up in a bunch of sequential, linear time probes to find the right spot, if we never have a cache miss and have to exit out to main memory to find what we are looking for, we can still be quite fast in wall clock time. 5 pointer chases to main memory is much slower than even 100 or 200 sequential linear probes without a cache miss.

And while it's not quite that simple, because DuckDB does do some other fancy hash groupings for aggregate queries, the underlying concept of linear probing is still quite effective in certain contexts.

## Takeaways

As with all things, context matters. In this case, general purpose algorithms have to achieve baseline performance across a bunch of use cases. Swiss Tables are fast, generally, but often complex. The Golang implementation cannot assume what the workload is and often the workload IS the hashmap operations. Other times, the workload is something else and a simple implementation will do just fine.

When I first started this post, I really didn't expect to find myself in a deep, deep rabbit hole. Hashmaps seemed simple enough, but when you scratch a bit deeper, there's a whole world underneath.

Hopefully, next time you do a map insert (for the hundredth time that day) you can appreciate all of the intricacies going on under the hood in a new light.

Until next time.

## Further reading/Resources

- [Go Blog on Swiss Tables](https://go.dev/blog/swisstable)
- [Swiss Table Design Notes](https://abseil.io/about/design/swisstables)
- [DuckDB Implementation Notes](https://duckdb.org/2022/03/07/aggregate-hashtable)