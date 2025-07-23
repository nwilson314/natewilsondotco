<svelte:head>
	<title>About - Nate Wilson</title>
	<meta name="description" content="Learn more about Nate Wilson, software developer and digital creator." />
</svelte:head>

<div class="py-12">
	<div class="max-w-3xl mx-auto">
		<div class="mb-12">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me 🌱</h1>
			<div class="prose prose-lg max-w-none">
				<p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
					I build software that doesn't suck. Currently doing healthcare APIs at Prevounce Health - lots of Python, React, 
					and the occasional fire drill that comes with the territory of building complex systems.
				</p>
				
				<div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
					<p class="text-gray-700 dark:text-gray-300 leading-relaxed">
						When I'm not debugging someone else's brilliant ideas, I'm training for triathlons (just finished Ironman Ohio 2025 - barely), 
						reading Sanderson novels at unhealthy speeds, or fixing things around our farm. There's something therapeutic about 
						both untangling code and untangling actual wires.
					</p>
				</div>
			</div>
		</div>

		<div class="grid md:grid-cols-2 gap-12 mb-12">
			<div>
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💼 Day Job Adventures</h2>
				<div class="space-y-4 text-gray-600 dark:text-gray-300">
					<p>
						<strong>Prevounce Health</strong> - Building their API platform and developer tools. Python/FastAPI backends, 
						React frontends, lots of AWS infrastructure. Healthcare data is surprisingly complex and surprisingly fragile.
					</p>
					<p>
						<strong>Previously:</strong> Skipper Hospitality (booking platform chaos), HealthCrowd/mPulse Mobile 
						(healthcare communication systems). Each place taught me something different about how software 
						actually gets used in the wild.
					</p>
					<p>
						<strong>Education:</strong> Started with electrical engineering at Ohio State (hardware is hard), 
						then pivoted to a master's in computer science at Northeastern (software is also hard, just differently).
					</p>
				</div>
			</div>

			<div>
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">⚡ Technical Arsenal</h2>
				<div class="space-y-3">
					<div>
						<h3 class="font-medium text-gray-900 dark:text-white">Languages I Actually Use</h3>
						<p class="text-gray-600 dark:text-gray-300">Python, TypeScript, Odin (for fun)</p>
					</div>
					<div>
						<h3 class="font-medium text-gray-900 dark:text-white">Frameworks That Don't Hate Me</h3>
						<p class="text-gray-600 dark:text-gray-300">FastAPI, SvelteKit, React/Next.js</p>
					</div>
					<div>
						<h3 class="font-medium text-gray-900 dark:text-white">Cloud & Infrastructure</h3>
						<p class="text-gray-600 dark:text-gray-300">AWS (Lambda, EC2, S3, API Gateway), Docker, gRPC</p>
					</div>
					<div>
						<h3 class="font-medium text-gray-900 dark:text-white">Databases</h3>
						<p class="text-gray-600 dark:text-gray-300">PostgreSQL, DynamoDB, Redis, MongoDB</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-8">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">🎯 Current Fixations</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Game Dev</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">ECS architecture, Odin language, and pretending I have time for side projects</p>
				</div>
				<div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Reading</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Currently: Stormlight Archive Book 3. Will argue about fantasy novels for hours</p>
				</div>
				<div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
					<h3 class="font-medium text-gray-900 dark:text-white mb-2">Farm Life</h3>
					<p class="text-sm text-gray-600 dark:text-gray-300">Growing veggies is surprisingly similar to debugging. Both involve a lot of swearing and things inexplicably dying overnight.</p>
				</div>
			</div>
		</div>

		<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How I Think About Code</h2>
			<div class="prose max-w-none text-gray-600 dark:text-gray-300">
				<p>
					I like building things that just work. Not in a perfectionist way, but in a "people can actually use this 
					without pulling their hair out" way. Most of my time is spent figuring out why something broke, how to make 
					it not break again, and occasionally building something new from scratch.
				</p>
				<p>
					The best part of this job is when you write some code and it actually solves someone's real problem. 
					Maybe it saves them time, maybe it prevents errors, maybe it just makes their day a little less frustrating. 
					That's what keeps me interested in all this.
				</p>
			</div>
		</div>

		<div class="mt-12 text-center">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Let's Connect</h2>
			<p class="text-gray-600 dark:text-gray-300 mb-6">
				I'd love to hear from you! Whether you want to collaborate on a project, 
				discuss technology, or just say hello.
			</p>
			<div class="flex justify-center space-x-4">
				<a 
					href="/contact" 
					class="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
				>
					Get in Touch
				</a>
				<a 
					href="/Nate_Wilson_Resume_2025.pdf" 
					download
					class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
				>
					Download Resume
				</a>
			</div>
		</div>
	</div>
</div>