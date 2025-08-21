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
	import { pb } from '$lib';
	import { Button } from '$lib/components/ui/button';

	let feedbacks = $state<any[]>([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	const fetchFeedbacks = async () => {
		try {
			isLoading = true;
			error = null;
			
			const records = await pb.collection('feedbacks').getList(1, 50, {
				sort: '-created'
			});
			
			feedbacks = records.items;
		} catch (err) {
			console.error('Error fetching feedbacks:', err);
			error = 'Không thể tải phản hồi. Vui lòng thử lại sau.';
		} finally {
			isLoading = false;
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

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

		fetchFeedbacks();
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

	<img id="logo" class="absolute top-1/3 left-28 h-72 select-none" src={logo} alt="" />
	<img id="sun" class="absolute h-1/4 right-0" src={sun} alt="" />

	<Cat />
</section>

<section class="space-y-4 px-6 md:px-12 lg:px-32 xl:px-64">
	<h2 class="text-4xl font-semibold">Phần feedback nè!</h2>
	<Form on:feedbackSubmitted={fetchFeedbacks} />
</section>

<section class="space-y-6 px-6 md:px-12 lg:px-32 xl:px-64">
	<div class="flex items-center justify-between">
		<h2 class="text-4xl font-semibold">Feedback của các bạn trước</h2>
		<Button 
			variant="outline" 
			size="sm"
			onclick={fetchFeedbacks}
			disabled={isLoading}
		>
			{#if isLoading}
				<div class="flex items-center gap-2">
					<div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
					Đang tải...
				</div>
			{:else}
				Làm mới
			{/if}
		</Button>
	</div>

	{#if isLoading}
		<div class="flex flex-col items-center justify-center space-y-4 py-12">
			<div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
			<p class="text-gray-600">Đang tải phản hồi...</p>
		</div>
	{:else if error}
		<div class="flex flex-col items-center justify-center space-y-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
			<div class="rounded-full bg-red-100 p-3">
				<svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
				</svg>
			</div>
			<p class="text-red-700">{error}</p>
			<Button variant="outline" onclick={fetchFeedbacks}>
				Thử lại
			</Button>
		</div>
	{:else if feedbacks.length === 0}
		<div class="flex flex-col items-center justify-center space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
			<div class="rounded-full bg-gray-100 p-3">
				<svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-gray-800">Chưa có phản hồi nào</h3>
			<p class="text-gray-600">Hãy là người đầu tiên chia sẻ ý kiến của!</p>
		</div>
	{:else}
		<div class="grid gap-6">
			{#each feedbacks as feedback}
				<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
					<div class="flex items-start justify-between">
						<div class="flex items-center gap-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
								<span class="text-sm font-semibold text-blue-600">
									{feedback.isAnonymous ? 'A' : feedback.from?.charAt(0)?.toUpperCase() || 'U'}
								</span>
							</div>
							<div>
								<h3 class="font-semibold text-gray-900">
									{feedback.isAnonymous ? 'Ẩn danh' : feedback.from || 'Không tên'}
								</h3>
								<p class="text-sm text-gray-500">
									{formatDate(feedback.created)}
								</p>
							</div>
						</div>
						{#if feedback.isAnonymous}
							<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
								Ẩn danh
							</span>
						{/if}
					</div>
					<div class="mt-4">
						<p class="text-gray-700 leading-relaxed">
							{feedback.content}
						</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
