import { getContext, setContext } from 'svelte';

const key = {};

export function SetTitleSuffix(titleSuffix: string) {
	setContext(key, titleSuffix);
}

export function GetTitleSuffix() {
	return getContext(key) as string;
}