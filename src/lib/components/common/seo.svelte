<script lang="ts">
	import { GetTitleSuffix } from '$lib/utils/seo';

	type Props = {
		title: string;
		noSuffix?: boolean;
	};

	let { title, noSuffix = false }: Props = $props();

	const SEPARATOR = '|'
	const DEFAULT_SUFFIX = 'The Behalism';

	if (!noSuffix) title += ` ${SEPARATOR} ${GetTitleSuffix() ?? DEFAULT_SUFFIX}`;
</script>

<svelte:head>
	<title>{title}</title>
	
	<meta name="description" content="">
	<meta name="keywords" content="the behalism">

	<meta property="og:type" content="website" />

	<!-- <link rel="icon" href="/favicon.ico" sizes="any" /> -->
	<!-- <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> -->
	<link rel="icon" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png">
</svelte:head>
