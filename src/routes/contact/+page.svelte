<svelte:head>
	<title>Drop Me a Line - Nate Wilson</title>
	<meta name="description" content="Want to chat about code, farm life, weird project ideas, or just say hello? I'm always up for a good conversation." />
</svelte:head>

<script lang="ts">
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};
	
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		
		// Simulate form submission for now
		// In a real implementation, you'd send this to your backend
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			submitStatus = 'success';
			formData = { name: '', email: '', subject: '', message: '' };
		} catch (error) {
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
		}
	}

	const contactMethods = [
		{
			title: '📧 Email',
			description: 'Best for detailed discussions, weird project ideas, or sharing random thoughts',
			value: 'nsw.wilson@gmail.com',
			href: 'mailto:nsw.wilson@gmail.com',
			icon: 'email'
		},
		{
			title: '💼 LinkedIn',
			description: 'Professional networking and "I saw your profile and..." messages',
			value: 'linkedin.com/in/natewilson2',
			href: 'https://linkedin.com/in/natewilson2',
			icon: 'linkedin'
		},
		{
			title: '🐙 GitHub',
			description: 'Code collaboration, open source contributions, and judging my commit messages',
			value: 'github.com/nwilson314',
			href: 'https://github.com/nwilson314',
			icon: 'github'
		},
		{
			title: '📄 Resume',
			description: 'The official version of "here\'s what I\'ve been up to"',
			value: 'Download Resume',
			href: '/Nate_Wilson_Resume_2025.pdf',
			icon: 'resume'
		}
	];
</script>

<div class="py-12">
	<div class="max-w-4xl mx-auto">
		<!-- Header with digital garden vibes -->
		<div class="mb-12">
			<div class="border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-6 bg-green-50 dark:bg-green-950/20 mb-8">
				<h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
					📬 Let's Chat!
				</h1>
				<p class="text-lg text-gray-600 dark:text-gray-300 mb-1">
					Always up for talking about code, farm life, triathlon training, weird project ideas, or why Oathbringer is the best Stormlight book
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					Response time: Usually pretty quick unless I'm debugging something cursed • Status: Inbox open
				</p>
			</div>
			
			<p class="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center">
				Drop me a line about literally anything - I promise I don't bite (much).
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-12">
			<!-- Contact Form -->
			<div class="bg-blue-50 dark:bg-blue-950/20 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-8">
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b-2 border-blue-300 dark:border-blue-700 pb-2">💌 Drop Me a Message</h2>
				
				{#if submitStatus === 'success'}
					<div class="bg-green-50 dark:bg-green-900/20 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-4 mb-6">
						<p class="text-green-800 dark:text-green-200">
							🎉 Message received! I'll get back to you soon (probably while procrastinating on something else).
						</p>
					</div>
				{/if}

				{#if submitStatus === 'error'}
					<div class="bg-red-50 dark:bg-red-900/20 border-2 border-dashed border-red-300 dark:border-red-700 rounded-lg p-4 mb-6">
						<p class="text-red-800 dark:text-red-200">
							😅 Oops, something went wrong! The form gremlins are at it again. Try emailing me directly instead.
						</p>
					</div>
				{/if}

				<form on:submit={handleSubmit} class="space-y-6">
					<div class="grid md:grid-cols-2 gap-6">
						<div>
							<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Name *
							</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								required
								disabled={isSubmitting}
								class="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
								placeholder="Your name"
							>
						</div>
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Email *
							</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								required
								disabled={isSubmitting}
								class="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
								placeholder="your.email@example.com"
							>
						</div>
					</div>

					<div>
						<label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Subject *
						</label>
						<input
							type="text"
							id="subject"
							bind:value={formData.subject}
							required
							disabled={isSubmitting}
							class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700"
							placeholder="What's this about?"
						>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Message *
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							disabled={isSubmitting}
							rows="6"
							class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-700 resize-vertical"
							placeholder="Tell me more about your project, idea, or just say hello!"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
					>
						{#if isSubmitting}
							Sending...
						{:else}
							Send Message
						{/if}
					</button>
				</form>
			</div>

			<!-- Contact Information -->
			<div class="space-y-8">
				<div class="bg-purple-50 dark:bg-purple-950/20 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg p-6">
					<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b-2 border-purple-300 dark:border-purple-700 pb-2">🤝 Other Ways to Find Me</h2>
					<div class="space-y-6">
						{#each contactMethods as method}
							<div class="flex items-start space-x-4">
								<div class="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
									{#if method.icon === 'email'}
										<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26c.3.16.67.16.97 0L19 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
										</svg>
									{:else if method.icon === 'linkedin'}
										<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
										</svg>
									{:else if method.icon === 'github'}
										<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
										</svg>
									{:else if method.icon === 'resume'}
										<svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
									{/if}
								</div>
								<div class="flex-1">
									<h3 class="text-lg font-medium text-gray-900 dark:text-white">{method.title}</h3>
									<p class="text-gray-600 dark:text-gray-300 text-sm mb-2">{method.description}</p>
									<a 
										href={method.href}
										{...method.icon === 'resume' ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' }}
										class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
									>
										{method.value}
									</a>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="bg-orange-50 dark:bg-orange-950/20 border-2 border-dashed border-orange-300 dark:border-orange-700 rounded-lg p-6">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b-2 border-orange-300 dark:border-orange-700 pb-1">⏱️ Response Time</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
						Usually within 24-48 hours, unless I'm deep in a debugging rabbit hole or the chickens have escaped again. 
						For urgent stuff, mention it in your subject line or hit me up on LinkedIn.
					</p>
				</div>

				<div class="bg-green-50 dark:bg-green-950/20 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-6">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b-2 border-green-300 dark:border-green-700 pb-1">🎯 What I'm Into</h3>
					<ul class="text-gray-700 dark:text-gray-300 text-sm space-y-2">
						<li>• Weird project collaborations (the weirder, the better)</li>
						<li>• Open source adventures</li>
						<li>• Speaking opportunities (I promise I'm not boring)</li>
						<li>• Mentoring exchanges and learning random stuff</li>
						<li>• Discussing why Sanderson is the GOAT</li>
						<li>• Just saying hello (seriously, I like meeting people!)</li>
					</ul>
				</div>
			</div>
		</div>
		
		<!-- ASCII art footer -->
		<div class="mt-16 text-center">
			<pre class="text-xs text-gray-400 dark:text-gray-600 font-mono leading-tight">╔══════════════════════════════════════════╗
║     Don't be a stranger, say hello! 👋    ║
╚══════════════════════════════════════════╝</pre>
		</div>
	</div>
</div>