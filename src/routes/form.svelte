<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { pb } from '$lib';

	let shouldAnonymous = $state(false);

	let name = $state('');
	let feedback = $state('');

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		console.log(name, feedback, shouldAnonymous);
		const record = await pb.collection('feedbacks').create({
			name,
			feedback
		});
		console.log(record);
	};
</script>

<form class="space-y-3 rounded-2xl border p-8" onsubmit={handleSubmit}>
	<div class="flex justify-between">
		<Label for="name">Chúng mình có thể gọi bạn là gì?</Label>
		<div class="flex items-center gap-2">
			<Checkbox
				id="anonymous"
				onCheckedChange={(v) => {
					if (v) shouldAnonymous = true;
					else shouldAnonymous = false;
				}}
			/>
			<Label for="anonymous">Tui muốn ẩn danh</Label>
		</div>
	</div>
	{#if !shouldAnonymous}
		<Input class="animate-in fade-in" id="name" placeholder="Hãy nhập biệt danh của bạn nhé!" bind:value={name} />
	{/if}

	<Textarea class="min-h-44" id="feedback" placeholder="Bạn có phản hồi gì từ dự án?" bind:value={feedback} />

	<Button class="w-full" type="submit"><b>Gửi</b></Button>
</form>
