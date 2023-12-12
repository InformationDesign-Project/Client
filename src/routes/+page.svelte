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

<body>
	<div class="header">
		<div class="logo">
			<img width="70%;" src="/layout/Healthy-chain.png" alt="Healthy Chain Logo" />
		</div>
		<div class="top-coins">
			<div class="top-coin today">
				<div class="time-period">Today</div>
				<div class="coin-name"><!-- 오늘의 최고 건강도 코인 이름 -->COSMOS</div>
				<div class="title">Best Healthy Chain Today</div>
			</div>
			<div class="top-coin month">
				<div class="time-period">Month</div>
				<div class="coin-name">
					<!-- 이번 달의 최고 건강도 코인 이름 -->COSMOS
				</div>
				<div class="title">Best Healthy Chain this Month</div>
			</div>
			<div class="top-coin year">
				<div class="time-period">Year</div>
				<div class="coin-name"><!-- 올해의 최고 건강도 코인 이름 -->COSMOS</div>
				<div class="title">Best Healthy Chain this Year</div>
			</div>
		</div>
	</div>

	<div class="dashboard-container">
		<div class="dashboard">
			<div class="dashboard-top-line">
				<div class="dashboard-coin">COSMOS</div>
				<div class="dashboard-metric">
					<div class="metric-value">85</div>
					<!-- 임의의 값 -->
					<div class="metric-label">Healthy Level</div>
				</div>
				<div class="dashboard-metric">
					<div class="metric-value score">92</div>
					<!-- 임의의 값 -->
					<div class="metric-label">Healthy Score</div>
				</div>
				<div class="dashboard-metric">
					<div class="metric-value">76%</div>
					<!-- 임의의 값 -->
					<div class="metric-label">Decentralization</div>
				</div>
			</div>
			<div class="dashboard-main">
				<div class="heatmap">
					<img width="100%;" src="/layout/heatmap.png" alt="heatmap" />
				</div>
				<div class="sidebar">
					<div class="sorted-by">Sorted By</div>
					<div class="dropdown">
						<button class="dropdown-toggle" id="dropdownButton">Healthy Level</button>
						<div class="dropdown-content" id="dropdownContent">
							<div class="sorting-option">Option 1</div>
							<div class="sorting-option">Option 2</div>
							<div class="sorting-option">Option 3</div>
							<!-- 원하는 옵션들을 추가하세요 -->
						</div>
						<div class="validators-info">
							<div class="validators-info-item">
								<div class="validators-info-label">Total Validators</div>
								<div class="validators-info-number">50</div>
							</div>
							<div class="validators-info-item">
								<div class="validators-info-label">Level 1</div>
								<div class="validators-info-number">10</div>
							</div>
							<div class="validators-info-item">
								<div class="validators-info-label">Level 2</div>
								<div class="validators-info-number">15</div>
							</div>
							<div class="validators-info-item">
								<div class="validators-info-label">Level 3</div>
								<div class="validators-info-number">20</div>
							</div>
							<div class="validators-info-item">
								<div class="validators-info-label">Level 4</div>
								<div class="validators-info-number">12</div>
							</div>
							<div class="validators-info-item">
								<div class="validators-info-label">Level 5</div>
								<div class="validators-info-number">8</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="right-section">
			<div class="coin-list-section">
				<!-- 코인 목록 섹션 -->
			</div>
			<div class="rader-chart">
				<img
					width="100%;"
					src="/layout/rader-chart.png"
					alt="rader-chart"
					style="margin-top: 25px;"
				/>
			</div>
		</div>
	</div>
</body>

<style lang="scss">
	.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.logo {
	flex-grow: 0;
	padding-left: 40px;
	padding-top: 15px;
}

.top-coins {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 15px;
	margin-right: 38px;
}

.top-coin {
	background-color: #11141b;
	color: #ffffff;
	padding: 28px;
	border-radius: 10px;
	margin: 0 15px;
	width: 150px;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.time-period, .coin-name, .title {
	font-weight: normal;
	margin-bottom: 5px;
}

.coin-name {
	font-size: 34px;
	font-weight: bold;
}

.title {
	font-size: 11px;
	opacity: 0.6;
}

.dashboard-container {
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: flex-start;
	padding: 20px;
	gap: 20px;
}

.dashboard {
	width: 900px;
	height: 500px;
	padding: 20px;
	border-radius: 10px;
	background-color: #11141b;
	color: #fff;
	margin: 20px;
}

.dashboard-top-line, .dashboard-main {
	display: flex;
	justify-content: space-between;
}

.dashboard-metric {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 30px;

	.metric-value {
		font-size: 50px;
		font-weight: bold;
	}
	.metric-value.score {
		color: #267af9;
	}

	.metric-label {
		font-size: 16px;
		margin-top: 5px;
		opacity: 0.6;
	}
}

.sidebar {
	flex-basis: 200px;
}

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

.heatmap {
	display: flex;
	width: 900px;
	height: 400px;
}

.right-section {
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 540px;
	gap: 20px;
	padding: 20px;
}

.coin-list-section, .rader-chart {
	flex-grow: 1;
	min-height: 230px;
	width: 100%;
	border-radius: 10px;
	background-color: #11141b;
	color: #fff;
}

/* 공통 스타일 */
.validators-info-item, .validators-info-label, .validators-info-number {
	font-size: 12px;
	margin-top: 5px;
	margin-bottom: 5px;
	color: #7987a8;
}

.validators-info-number {
	font-size: 24px;
	font-weight: bold;
	color: #ffffff;
}
</style>
