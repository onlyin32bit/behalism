<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { pb } from '$lib';
	import { createEventDispatcher } from 'svelte';
	// import { toast } from 'svelte-sonner';

	const dispatch = createEventDispatcher();

	let shouldAnonymous = $state(false);
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);

	let name = $state('');
	let feedback = $state('');
	let errors = $state<Record<string, string>>({});

	const validateForm = () => {
		errors = {};
		
		if (!shouldAnonymous && !name.trim()) {
			errors.name = 'Vui lòng nhập tên của bạn';
		}
		
		if (!feedback.trim()) {
			errors.feedback = 'Vui lòng nhập phản hồi của bạn';
		} else if (feedback.trim().length < 10) {
			errors.feedback = 'Phản hồi phải có ít nhất 10 ký tự';
		}
		
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		
		if (!validateForm()) {
			// toast.error('Vui lòng kiểm tra lại thông tin');
			return;
		}

		isSubmitting = true;
		
		try {
			const record = await pb.collection('feedbacks').create({
				from: shouldAnonymous ? 'Ẩn danh' : name.trim(),
				content: feedback.trim()
			});
			
			console.log('Feedback submitted:', record);
			// toast.success('Cảm ơn bạn đã gửi phản hồi!');
			isSubmitted = true;
			
			// Notify parent component to refresh feedback list
			dispatch('feedbackSubmitted');
			
			// Reset form
			name = '';
			feedback = '';
			shouldAnonymous = false;
			
		} catch (error) {
			console.error('Error submitting feedback:', error);
			// toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
		} finally {
			isSubmitting = false;
		}
	};

	const handleAnonymousChange = (checked: boolean) => {
		shouldAnonymous = checked;
		if (checked) {
			name = '';
			errors.name = '';
		}
	};
</script>

{#if isSubmitted}
	<div class="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
		<div class="rounded-full bg-green-100 p-3">
			<svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
			</svg>
		</div>
		<h3 class="text-lg font-semibold text-green-800">Cảm ơn bạn!</h3>
		<p class="text-green-700">Phản hồi của bạn đã được gửi thành công.</p>
		<Button 
			variant="outline" 
			onclick={() => isSubmitted = false}
			class="mt-4"
		>
			Gửi phản hồi khác
		</Button>
	</div>
{:else}
	<form 
		class="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md" 
		onsubmit={handleSubmit}
	>
		<div class="space-y-2">
			<h2 class="text-xl font-semibold text-gray-900">Gửi phản hồi</h2>
			<p class="text-sm text-gray-600">Dự án này rất mong nhận được ý kiến đóng góp từ bạn!</p>
		</div>

		<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
			<Label for="name" class="text-sm font-medium text-gray-700">
				Chúng mình có thể gọi bạn là gì?
			</Label>
			<div class="flex items-center gap-2">
				<Checkbox
					id="anonymous"
					checked={shouldAnonymous}
					onCheckedChange={handleAnonymousChange}
				/>
				<Label for="anonymous" class="text-sm text-gray-600">
					Tui muốn ẩn danh
				</Label>
			</div>
		</div>

		{#if !shouldAnonymous}
			<div class="space-y-2">
				<Input 
					class="animate-in fade-in duration-200 bg-white {errors.name ? 'border-red-300 focus:border-red-500' : ''}" 
					id="name" 
					placeholder="Hãy nhập biệt danh của bạn nhé!" 
					bind:value={name}
					disabled={isSubmitting}
				/>
				{#if errors.name}
					<p class="text-sm text-red-600">{errors.name}</p>
				{/if}
			</div>
		{/if}

		<div class="space-y-2">
			<Label for="feedback" class="text-sm font-medium text-gray-700">
				Phản hồi của bạn
			</Label>
			<Textarea 
				class="min-h-44 resize-none {errors.feedback ? 'border-red-300 focus:border-red-500' : ''}" 
				id="feedback" 
				placeholder="Bạn có phản hồi gì từ dự án? Hãy chia sẻ suy nghĩ của bạn nhé!" 
				bind:value={feedback}
				disabled={isSubmitting}
			/>
			{#if errors.feedback}
				<p class="text-sm text-red-600">{errors.feedback}</p>
			{:else}
				<p class="text-xs text-gray-500">
					{feedback.length}/1000 ký tự
				</p>
			{/if}
		</div>

		<Button 
			class="w-full transition-all" 
			type="submit"
			disabled={isSubmitting}
		>
			{#if isSubmitting}
				<div class="flex items-center gap-2">
					<div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
					Đang gửi...
				</div>
			{:else}
				<b>Gửi</b>
			{/if}
		</Button>
	</form>
{/if}
