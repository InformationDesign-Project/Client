<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import DropdownMenu from './DropdownMenu.svelte';
	import Heatmap from './Heatmap.svelte';
	import RadarChart from './RadarChart.svelte';

	export let chainData;
	export let validatorData;
	export let chainName;
	export let changeName;

	let filteredChain;
	let topChains = [];
	let validatorsCount = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
	function compareByScore(a, b) {
		// 비교를 위해 프로퍼티 값을 가져와서 비교
		return b.HealthyScore - a.HealthyScore;
	}

	afterUpdate(async () => {
		if (chainData.length > 0) {
			topChains = chainData.sort(compareByScore).slice(0, 10);
			const count = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
			validatorData.forEach((validator) => {
				count[`level${validator.level}`]++;
			});
			validatorsCount = count;
		}
		if (chainData && chainName) {
			filteredChain = chainData.find(
				(chain) => chain.chain.toLowerCase() === chainName.toLowerCase()
			);
		}
	});

	function countValidators() {
		const count = { level1: 0, level2: 0, level3: 0, level4: 0, level5: 0 };
		validatorData.forEach((validator) => {
			count['level' + validator.level]++;
		});
		validatorsCount = count;
	}

	function handleSortEvent(event) {
		sortValidators(event.detail.sortBy);
	}

	function sortValidators(sortBy) {
		if (sortBy === 'votingPower') {
			validatorData = [...validatorData].sort((a, b) => b.votingPower - a.votingPower);
		} else if (sortBy === 'level') {
			validatorData = [...validatorData].sort((a, b) => b.level - a.level);
		}
		countValidators();
	}
	function handleChainChange(event) {
		changeName(event.target.value);
	}
</script>

<div class="dashboard-container">
	<div class="dashboard">
		<!-- Dashboard Top Line -->
		<div class="dashboard-top-line">
			{#if filteredChain}
				<!-- Dashboard Metrics -->
				<div class="dashboard-coin">
					<div class="chain-name-status">
						<select id="chain-select" on:change={handleChainChange} value={chainName}>
							{#each chainData.sort(compareByScore) as chain}
								<option value={chain.chain}>{chain.chain}</option>
							{/each}
						</select>
						<div class="chain-status">▲ 10%</div>
					</div>
					<div class="chain-compare">Compared to $21,490 last year</div>
				</div>
				<div class="dashboard-metric">
					<div class="metric-value">Level {Math.round(filteredChain.level)}</div>
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

		<!-- Dashboard Main Content -->
		<div class="dashboard-main">
			<div class="heatmap">
				<Heatmap data={validatorData} />
			</div>
			<div class="sidebar">
				<div class="sorted-by">Sorted By</div>
				<DropdownMenu on:sort={handleSortEvent} />
				<!-- Validator Info -->
				<div class="validators-info">
					<div class="validators-info-item">
						{#if filteredChain}
							<div class="validators-info-label">Total Validators</div>
							<div class="validators-info-number">{Math.round(filteredChain.validators.total)}</div>
						{/if}
					</div>
					{#each Object.entries(validatorsCount).reverse() as [level, count]}
						<div class="validators-info-item">
							<div class="validators-info-label">Level {level.slice(-1)}</div>
							<div class="validators-info-number">{count}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Right Section -->
	<div class="right-section">
		<!-- Coin List Section -->
		<div class="coin-list-section" style="display:flex; flex-direction:column;align-items:center;">
			<div style="width:90%;height:20%;align-items:center;display:flex;">
				<img src="/layout/Vector.png" alt="vector" />
				<div class="coin-list-top" style="margin-left:10px;">Top 10 Healthy Chains</div>
			</div>
			<div style="width:90%;height:80%;display:flex;flex-wrap:wrap;align-items:center; text-align">
				{#each topChains as chain, index (chain.chain)}
					<div style="width:50%;display:flex; align-items:center;">
						{#if index == 0}
							<div style="color:#267AF9; width:30px;justify-content:flex-start;display:flex;">
								<div>0{index + 1}</div>
							</div>
						{:else if index > 8}
							<div style="color:#7987A8; width:30px;justify-content:flex-start;display:flex;">
								<div>{index + 1}</div>
							</div>
						{:else}
							<div style="color:#7987A8; width:30px;justify-content:flex-start;display:flex;">
								<div>0{index + 1}</div>
							</div>
						{/if}

						<img
							src={chain.tokenImg}
							style="width:24px;margin:0 12px 0px 0px;padding-bottom:0px; "
						/>
						<div>{chain.chain}</div>
					</div>
				{/each}
			</div>
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
		padding: 10px;
	}

	.dashboard {
		width: 58%;
		height: 530px;
		padding: 20px;
		border-radius: 10px;
		background-color: #11141b;
		color: #fff;
		border-radius: 10px;
		margin: 20px;
		.dashboard-top-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 90%;
			margin-bottom: 20px;
			.dashboard-metric {
				display: grid;
				justify-items: start;
				.metric-value {
					font-family: 'Audiowide';
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

	#chain-select {
		background: none;
		border: none;
		width: 150px;
		border-radius: 5px;
		color: #ffffff;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		font-size: 24px;
		text-transform: uppercase;
	}

	.dashboard-coin {
		background-color: #161b26;
		padding: 22px;
		border-radius: 10px;
		width: auto;
		color: #ffffff;
		display: flex;
		text-align: left;
		flex-direction: column;
		justify-content: flex-start;
	}

	.chain-name-status {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.chain-status {
		font-size: 14px;
		color: #267af9;
		margin-top: 4px;
		margin-left: 10px;
	}

	.chain-compare {
		font-size: 14px;
		color: #7987a8;
		margin-top: 12px;
		text-align: left;
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
		height: 400px;
		overflow: scroll;
		ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
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
		margin-bottom: 13px;
		margin-top: 10px;
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
	.validators-info-item:nth-child(2) .validators-info-number {
    color: #267af9;
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
		width: 100%;
		border-radius: 10px;
		background-color: #11141b;
		color: #fff;

		.coin-list-header {
			display: flex;
			align-items: center;
			width: 90%;

			.coin-list-top {
				color: #ffffff;
				opacity: 0.7;
			}
		}

		.coin-list-divider {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}

		.coin-list {
			width: 50%;

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
