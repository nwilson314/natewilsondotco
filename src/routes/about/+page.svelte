<svelte:head>
	<title>Get to Know Me - Nate Wilson</title>
	<meta name="description" content="Software developer, farm life enthusiast, and Ironman finisher. Here's the story." />
</svelte:head>

<div class="py-8">
	<!-- Header with early web vibes -->
	<div class="mb-12">
		<div class="border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-6 bg-green-50 dark:bg-green-950/20 mb-8">
			<h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
				👋 Hey, I'm Nate
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-1">
				Software developer by day, farm hand by evening, Ironman finisher when I'm feeling masochistic
			</p>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Last updated: Recently • Status: Probably debugging something
			</p>
		</div>
		
		<p class="text-xl text-gray-600 dark:text-gray-300 mb-4">
			I write code for a living and like solving complex problems with real world implications.
			Lately I've been getting obsessed with making software that's not just correct, but actually fast. 
			There's something deeply satisfying about code that does what it's supposed to do without making users wait.
		</p>
		<p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
			Currently wrangling healthcare APIs at Prevounce Health while simultaneously trying to keep vegetables alive on our farm.
		</p>
	</div>

	<!-- Colorful content sections -->
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
		<!-- Day job -->
		<div class="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-300 dark:border-blue-700 pb-2">
				💼 Day Job Status
			</h2>
			<div class="space-y-3 text-gray-700 dark:text-gray-300">
				<div>
					<span class="text-blue-600 dark:text-blue-400">→</span> 
					<strong>Currently:</strong> Prevounce Health
				</div>
				<div>
					<span class="text-blue-600 dark:text-blue-400">→</span> 
					<strong>What I do:</strong> Healthcare APIs & developer tools
				</div>
				<div>
					<span class="text-blue-600 dark:text-blue-400">→</span> 
					<strong>Stack:</strong> Python, React, AWS
				</div>
				<div>
					<span class="text-blue-600 dark:text-blue-400">→</span> 
					<strong>Reality:</strong> Healthcare data is surprisingly fragile
				</div>
			</div>
		</div>

		<!-- Tech stuff -->
		<div class="bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-green-300 dark:border-green-700 pb-2">
				🔧 Tech I Know
			</h2>
			<div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
				<div>
					<span class="font-medium">Languages:</span><br/>
					Python, TypeScript, Odin (for fun)
				</div>
				<div>
					<span class="font-medium">Frameworks:</span><br/>
					FastAPI, SvelteKit, React/Next.js
				</div>
				<div>
					<span class="font-medium">Cloud stuff:</span><br/>
					AWS, Docker, gRPC
				</div>
				<div>
					<span class="font-medium">Databases:</span><br/>
					PostgreSQL, DynamoDB, Redis
				</div>
			</div>
		</div>

		<!-- Current obsessions -->
		<div class="bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-6 md:col-span-2 lg:col-span-1">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-purple-300 dark:border-purple-700 pb-2">
				🎯 Current Obsessions
			</h2>
			<div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
				<div>
					<span class="text-purple-600 dark:text-purple-400">→</span> 
					<strong>Game dev:</strong> ECS architecture & Odin
				</div>
				<div>
					<span class="text-purple-600 dark:text-purple-400">→</span> 
					<strong>Reading:</strong> Stormlight Archive Book 3
				</div>
				<div>
					<span class="text-purple-600 dark:text-purple-400">→</span> 
					<strong>Farm life:</strong> Keeping vegetables alive
				</div>
				<div>
					<span class="text-purple-600 dark:text-purple-400">→</span> 
					<strong>Athletics:</strong> Plotting the next race
				</div>
			</div>
		</div>
	</div>

	<!-- Random facts section -->
	<div class="mb-12">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b-2 border-orange-300 dark:border-orange-700 pb-2">
			🎲 Random Facts & Life Updates
		</h2>
		<div class="grid md:grid-cols-2 gap-6">
			<div class="bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-200 dark:border-orange-800 rounded-lg p-6">
				<h3 class="font-medium text-gray-900 dark:text-white mb-3">📍 Background</h3>
				<div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
					<div>Started with electrical engineering at Ohio State</div>
					<div>Pivoted to computer science masters at Northeastern</div>
					<div>Turns out hardware and software are both hard, just differently</div>
				</div>
			</div>
			<div class="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
				<h3 class="font-medium text-gray-900 dark:text-white mb-3">🏃 Triathlon Status</h3>
				<div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
					<div>Full Ironman: Fall 2024 ✅</div>
					<div>Half Ironman Ohio: 2025 ✅</div>
					<div>Current state: Recovering but plotting the next one</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Philosophy section -->
	<div class="bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-8 mb-12">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-yellow-300 dark:border-yellow-700 pb-2">
			💭 How I Think About This Stuff
		</h2>
		<div class="space-y-4 text-gray-700 dark:text-gray-300">
			<p>
				I like building things that just work. Not in a perfectionist way, but in a "people can actually use this 
				without pulling their hair out" way. Most of my time is spent figuring out why something broke, how to make 
				it not break again, and occasionally building something new from scratch - which is where I get to think 
				about performance from the ground up.
			</p>
			<p>
				The best part of this job is when you write some code and it actually solves someone's real problem. 
				Maybe it saves them time, maybe it prevents errors, maybe it just makes their day a little less frustrating. 
				That's what keeps me interested in all this.
			</p>
		</div>
	</div>

	<!-- Contact/Social section -->
	<div class="text-center">
		<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b-2 border-blue-300 dark:border-blue-700 pb-2">
			📬 Want to Chat?
		</h2>
		<p class="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
			Always up for talking about code, farm life, triathlon training, or why Oathbringer is the best Stormlight book.
			Hit me up!
		</p>
		<div class="flex justify-center space-x-4">
			<a 
				href="/contact" 
				class="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
			>
				Say Hello →
			</a>
			<a 
				href="/Nate_Wilson_Resume_2025.pdf" 
				download
				class="inline-flex items-center px-6 py-3 border-2 border-green-300 dark:border-green-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors"
			>
				Grab My Resume →
			</a>
		</div>
	</div>

	<!-- ASCII art footer -->
	<div class="mt-16 text-center">
		<pre class="text-xs text-gray-400 dark:text-gray-600 font-mono leading-tight">╔══════════════════════════════════════════╗
║  Thanks for reading my digital diary! 📖  ║
╚══════════════════════════════════════════╝</pre>
	</div>
</div>