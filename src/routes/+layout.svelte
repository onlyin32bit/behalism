<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import cn_mel from '$lib/assets/cn-mel.png';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="space-y-16 px-6 py-10 md:px-12 lg:px-32 xl:px-64">
	{@render children()}
</main>

<footer class="relative bg-foreground text-white">
	<h2 class="sr-only">Site-wide Links</h2>
	<div class="flex px-16 py-8">
		<div class="grow">
			<h3 class="text-2xl font-sacramento font-bold">The Behalism</h3>
		</div>
		<Button
			class=""
			variant="ghost"
			onclick={() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
		>
			Lên đầu trang <ArrowUp />
		</Button>
	</div>
	<div class="flex flex-row-reverse px-16 py-8">
		<span class="opacity-20">
			website by <a class="hover:underline" href="https://github.com/onlyin32bit">@onlyin32bit</a>,
			<a class="hover:underline" href="https://github.com/onlyin32bit/behalism">source↗</a>
		</span>
	</div>
	<img class="absolute bottom-0 left-20 h-44" src={cn_mel} alt="" />
</footer>
