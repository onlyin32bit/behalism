<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';

	let shouldAnonymous = $state(false);
</script>

<form class="space-y-3" method="POST" use:enhance>
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
		<Input class="animate-in fade-in" id="name" placeholder="Hãy nhập biệt danh của bạn nhé!" />
	{/if}

	<Textarea id="feedback" placeholder="Bạn có phản hồi gì từ dự án?" />

	<Button class="w-full" type="submit"><b>Gửi</b></Button>
</form>
