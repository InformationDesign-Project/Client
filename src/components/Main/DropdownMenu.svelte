<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	let dropdownButton: HTMLButtonElement | null = null;
	let dropdownContent: HTMLDivElement | null = null;
	const dispatch = createEventDispatcher();

	onMount(() => {
		dropdownButton = document.getElementById('dropdownButton') as HTMLButtonElement | null;
		dropdownContent = document.getElementById('dropdownContent') as HTMLDivElement | null;

		if (dropdownButton && dropdownContent) {
			dropdownContent.style.display = 'none';

			dropdownButton.addEventListener('click', () => {
				if (dropdownContent.style.display === 'none') {
					dropdownContent.style.display = 'block';
				} else {
					dropdownContent.style.display = 'none';
				}
			});

			window.addEventListener('click', (event) => {
				if (event.target !== dropdownContent && event.target !== dropdownButton) {
					dropdownContent.style.display = 'none';
				}
			});
		}
	});

	function handleOptionClick(sortBy) {
		if (dropdownButton) {
			dropdownButton.textContent = sortBy === 'votingPower' ? 'VotingPower' : 'Level';
			dropdownContent.style.display = 'none';
		}
		dispatch('sort', { sortBy });
	}
</script>

<div class="dropdown">
	<button class="dropdown-toggle" id="dropdownButton">VotingPower</button>
	<div class="dropdown-content" id="dropdownContent">
		<button class="sorting-option" on:click={() => handleOptionClick('votingPower')}
			>VotingPower</button
		>
		<button class="sorting-option" on:click={() => handleOptionClick('level')}>Healthy Level</button
		>
	</div>
</div>

<style lang="scss">
	.dropdown-toggle,
	.sorting-option {
		display: flex;
		width: 168px;
		height: 36px;
		padding: 8px 10.24px;
		border-radius: 5px;
		background-color: #161b26;
		color: #afb7c0;
		border: none;
		margin-bottom: 10px;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.dropdown-toggle::after {
		content: url('/layout/Rectangle.png');
		margin-right: 10px;
	}

	.dropdown-content {
		display: none;
		position: fixed;
		background-color: #161b26;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}
</style>
