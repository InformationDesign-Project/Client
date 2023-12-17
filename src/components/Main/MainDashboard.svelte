<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import DropdownMenu from './DropdownMenu.svelte';
	import Heatmap from './Heatmap.svelte';
	import RadarChart from './RadarChart.svelte';

	export let chainData;
	export let validatorData;
	export let chainName;

	let filteredChain;
	let topChains = []; // 상위 10개 체인을 저장할 배열
	let validatorsCount = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };

	afterUpdate(async () => {
		console.log(chainData, '값이야');

		if (chainData.length > 0) {
			topChains = [...chainData] // 배열을 복사합니다.
				.sort((a, b) => b.level - a.level) // level에 따라 내림차순 정렬
				.slice(0, 10); // 상위 10개 항목 추출

			// Count validators per level
			const count = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
			validatorData.forEach((validator) => {
				switch (validator.level) {
					case 1:
						count.level1++;
						break;
					case 2:
						count.level2++;
						break;
					case 3:
						count.level3++;
						break;
					case 4:
						count.level4++;
						break;
					case 5:
						count.level5++;
						break;
				}
			});
			validatorsCount = count;
		}
	});
	$: if (chainData && chainName) {
		filteredChain = chainData.find(
			(chain) => chain.chain.toLowerCase() === chainName.toLowerCase()
		);
	}
</script>

<div class="dashboard-container">
	<div class="dashboard">
		<div class="dashboard-top-line">
			{#if filteredChain}
				<div class="dashboard-coin">{filteredChain.chain}</div>
				<div class="dashboard-metric">
					<div class="metric-value">{Math.round(filteredChain.level)}</div>
					<div class="metric-label">Healthy Level</div>
				</div>
				<div class="dashboard-metric">
					<div class="metric-value score">{Math.round(filteredChain.HealthyScore)}</div>
					<div class="metric-label">Healthy Score</div>
				</div>
				<div class="dashboard-metric">
					<div class="metric-value">{Math.round(filteredChain.Decentralization)}%</div>
					<div class="metric-label">Decentralization</div>
				</div>
			{/if}
		</div>
		<div class="dashboard-main">
			<div class="heatmap">
				<Heatmap data={validatorData} />
			</div>
			<div class="sidebar">
				<div class="sorted-by">Sorted By</div>
				<DropdownMenu />

				<div class="validators-info">
					<div class="validators-info-item">
						{#if filteredChain}
							<div class="validators-info-label">Total Validators</div>
							<div class="validators-info-number">{Math.round(filteredChain.validators.total)}</div>
						{/if}
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 1</div>
						<div class="validators-info-number">{validatorsCount.level1}</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 2</div>
						<div class="validators-info-number">{validatorsCount.level2}</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 3</div>
						<div class="validators-info-number">{validatorsCount.level3}</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 4</div>
						<div class="validators-info-number">{validatorsCount.level4}</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 5</div>
						<div class="validators-info-number">{validatorsCount.level5}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="right-section">
		<div class="coin-list-section">
			<div class="coin-list-header">
				<img src="/layout/Vector.png" alt="vector" />
				<div class="coin-list-top">Top 10 Healthy Chains</div>
			</div>
			<div class="coin-list-divider"></div>
			{#each topChains as chain, index (chain.chain)}
				<div class="coin-list">
					<div>{index + 1} {chain.chain}</div>
				</div>
			{/each}
		</div>

		{#if filteredChain}
			<RadarChart data={filteredChain} />
		{/if}
	</div>
</div>

<style lang="scss">
	.dashboard-container {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: flex-start;
		padding: 20px;
		gap: 20px;
	}

	.dashboard {
		width: 65%;
		height: 500px;
		padding: 20px;
		border-radius: 10px;
		background-color: #11141b;
		color: #fff;
		border-radius: 10px;
		margin: 20px;
		.dashboard-top-line {
			display: flex;
			justify-content: space-between;
			width: 85%;
			margin-bottom: 20px;
			.dashboard-metric {
				display: flex;
				flex-direction: column;
				align-items: center;

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
		}

		.dashboard-main {
			display: flex;
			width: 109%;

			.sidebar {
				flex-basis: 30%;
				margin-left: 3%;
			}
		}
	}

	.dashboard-coin {
		background-color: #161b26;
		padding: 15px 15px;
		border-radius: 10px;
		width: 150px;
		height: 50px;
		font-size: 24px;
		color: #ffffff;
	}

	.dashboard-metric {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

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

	.heatmap {
		display: flex;
		width: 65%;
	}
	.sorted-by {
		font-size: 12px;
		font-style: normal;
		color: #7987a8;
		margin-bottom: 10px;
	}

	.validators-info-item {
		display: flex;
		flex-direction: column;
		align-items: left;
	}

	.validators-info-label {
		font-size: 12px;
		font-weight: normal;
		margin-top: 5px;
		margin-bottom: 5px;
		color: #7987a8;
	}

	.validators-info-number {
		font-size: 24px;
		font-weight: bold;
		color: #ffffff;
	}

	.right-section {
		display: flex;
		flex-direction: column;
		width: 30%;
		height: 100%;
		gap: 20px;
		padding: 20px;
	}

	.coin-list-section {
		flex-grow: 1;
		height: 250px;
		width: 82%;
		border-radius: 10px;
		background-color: #11141b;
		color: #fff;

		.coin-list-header {
			display: flex;
			align-items: center;
			gap: 10px; // 필요에 따라 조정
			margin: 20px;

			.coin-list-top {
				color: #ffffff;
				opacity: 0.7;
			}
		}

		.coin-list-divider {
			border-top: 1px solid rgba(121, 135, 168, 0.15);
			margin: 0 20px;
		}

		.coin-list {
			display: flex;
			justify-content: space-between;
			margin-left: 25px;

			.coin-list-left,
			.coin-list-right {
				display: flex;
				flex-direction: column;
				width: 48%;
				margin: 20px;

				div {
				}
			}
		}
	}

	.rader-chart {
		flex-grow: 1;
		height: 270px;
		width: 70%;
		border-radius: 10px;
		background-color: #11141b;
		color: #fff;
	}
</style>
