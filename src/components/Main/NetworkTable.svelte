<script>
	import { afterUpdate } from 'svelte';

	export let chainData;
	export let changeName;

	afterUpdate(() => {
		console.log(chainData, '내 컴포넌트');
	});
</script>

<main>
	<div>
		{#each chainData as data}
			<div on:click={() => changeName(data.chain)} style="color:orange;">
				{data.chain}
			</div>
		{/each}
	</div>
</main>

<style>
</style>
