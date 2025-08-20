<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import cn_mel from '$lib/assets/cn-mel.png';
	import logo from '$lib/assets/logo.svg';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ArrowUp from '@lucide/svelte/icons/arrow-up';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="space-y-16">
	{@render children()}
</main>

<footer class="relative bg-foreground text-white overflow-hidden mt-12">
	<h2 class="sr-only">Site-wide Links</h2>
	<div class="flex px-16 py-8">
		<div class="grow">
			<img class="h-20" src={logo} alt="">
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
	<div class="text-end px-16 py-8">
		<span class="opacity-20">
			website by <a class="hover:underline" href="https://github.com/onlyin32bit">@onlyin32bit</a>,
			<a class="hover:underline" href="https://github.com/onlyin32bit/behalism">source↗</a>
		</span>
	</div>
	<img class="absolute -bottom-2 animate-walk h-28 scale-x-100 animate-bounce" src={cn_mel} alt="Mel Beha" title="Cn Mel Beha" />
</footer>

<style>
	@keyframes walk {
		0% {
			left: -100px;
			transform: scaleX(-1) translateY(0);
		}
		/* bounce almost every 5% */
		5%, 15%, 25%, 35%, 45% {
			transform: scaleX(-1) translateY(-10px);
		}
		10%, 20%, 30%, 40% {
			transform: scaleX(-1) translateY(0);
		}
		49% {
			left: 50%; /* halfway across */
			transform: scaleX(-1) translateY(0);
		}
		50% {
			left: 50%;
			transform: scaleX(1) translateY(0); /* flip */
		}
		55%, 65%, 75%, 85% {
			transform: scaleX(1) translateY(-10px);
		}
		60%, 70%, 80%, 90% {
			transform: scaleX(1) translateY(0);
		}
		95% {
			left: -100px;
			transform: scaleX(1) translateY(0);
		}
		100% {
			left: -100px;
			transform: scaleX(-1) translateY(0);
		}
	}
	.animate-walk {
		animation: walk 30s linear infinite;
	}
</style>