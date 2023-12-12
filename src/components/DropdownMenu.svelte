<script lang="ts">
	import { onMount } from 'svelte';

	let dropdownButton: HTMLButtonElement | null = null;
	let dropdownContent: HTMLDivElement | null = null;

	onMount(() => {
		dropdownButton = document.getElementById('dropdownButton') as HTMLButtonElement | null;
		dropdownContent = document.getElementById('dropdownContent') as HTMLDivElement | null;

		if (dropdownButton && dropdownContent) {
			// 초기에 드롭다운 옵션 목록을 가려줍니다.
			dropdownContent.style.display = 'none';

			// 드롭다운 버튼 클릭 시 옵션 목록 토글
			dropdownButton.addEventListener('click', () => {
				if (dropdownContent) {
					// 현재 상태를 확인하여 토글합니다.
					if (dropdownContent.style.display === 'none') {
						dropdownContent.style.display = 'block';
					} else {
						dropdownContent.style.display = 'none';
					}
				}
			});

			// 옵션을 클릭하면 선택한 옵션을 드롭다운 버튼 텍스트로 설정하고 목록 숨기기
			const options = document.querySelectorAll('.sorting-option');
			options.forEach((option) => {
				option.addEventListener('click', () => {
					if (dropdownButton) {
						dropdownButton.textContent = option.textContent || 'Select Sorting Option';
						// 옵션 선택 후 목록을 다시 가립니다.
						dropdownContent.style.display = 'none';
					}
				});
			});

			// 드롭다운 옵션 목록 외의 영역을 클릭하면 목록 숨기기
			window.addEventListener('click', (event) => {
				if (dropdownContent && dropdownButton) {
					if (event.target !== dropdownContent && event.target !== dropdownButton) {
						dropdownContent.style.display = 'none';
					}
				}
			});
		}
	});
</script>

<div class="dropdown">
	<button class="dropdown-toggle" id="dropdownButton">Healthy Level</button>
	<div class="dropdown-content" id="dropdownContent">
		<div class="sorting-option">Option 1</div>
		<div class="sorting-option">Option 2</div>
		<div class="sorting-option">Option 3</div>
		<!-- 원하는 옵션들을 추가하세요 -->
	</div>
</div>

<style lang="scss">
.dropdown-toggle {
		display: flex;
		width: 168px;
		height: 36px;
		padding: 8px 10.24px 8.12px 13px;
		border-radius: 5px;
		background-color: #161b26;
		color: #afb7c0;
		border: none;
		margin-bottom: 10px;
	}
	.dropdown-toggle::after {
		content: url('/layout/Rectangle.png');
		margin-left: 50px;
	}
</style>