<script lang="ts">
	import Cat from './../lib/components/common/cat.svelte';
	import SEO from '$lib/components/common/seo.svelte';
	import Form from './form.svelte';
	import cloud1 from '$lib/assets/cloud1.svg';
	import cloud2 from '$lib/assets/cloud2.svg';
	import cloud3 from '$lib/assets/cloud3.svg';
	import logo from '$lib/assets/logo.svg';
	import cn_mel from '$lib/assets/cn-mel.png';
	import sun from '$lib/assets/sun.svg';
	import { onMount } from 'svelte';
	import { gsap } from '$lib';

	let { data } = $props();

	const feedbackmock = [{}, {}, {}];

	onMount(() => {
		gsap.from('#logo', {
			x: -100,
			opacity: 0,
			duration: 1,
			// scrollTrigger: {
			// 	trigger: '#logo',
			// 	start: 'top 80%',
			// 	toggleActions: 'play none none reverse'
			// }
		});

	});
</script>

<SEO title="The Behalism" noSuffix />

<section class="relative h-[150vh] overflow-hidden bg-[#C2F3FA]">
	<img
		class="absolute -right-16 top-1/3 animate-in duration-1000 slide-in-from-right-30"
		src={cloud1}
		alt=""
	/>
	<img
		class="absolute top-2/5 -left-32 animate-in duration-1000 slide-in-from-left-30"
		src={cloud2}
		alt=""
	/>
	<img
		class="absolute top-16 -left-28 animate-in delay-150 duration-1000 slide-in-from-left-30"
		src={cloud3}
		alt=""
	/>

	<img id="logo" class="absolute top-1/3 left-28 h-72" src={logo} alt="" />
	<img id="sun" class="absolute h-1/4 right-0" src={sun} alt="" />

	<Cat />
</section>

<section class="space-y-4 px-6 md:px-12 lg:px-32 xl:px-64">
	<h2 class="text-4xl font-semibold">Phần feedback nè!</h2>
	<Form />
</section>

<section class="space-y-4 px-6 md:px-12 lg:px-32 xl:px-64">
	<h2 class="text-4xl font-semibold">Feedback của các bạn trước</h2>
	<div class="">
		{#each feedbackmock as item}
			<!-- <div>hi</div> -->
		{/each}
	</div>
</section>
