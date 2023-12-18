<script>
	import { afterUpdate } from 'svelte';

	export let chainData;
	export let changeName;

	afterUpdate(() => {
		console.log(chainData, '내 컴포넌트');
	});
</script>

<main>
	<div class="dashboard-container">
		<div class="dashboard">
			<div>
				<div class="tableContent label">
					<div class="chainName tooltip-container">
						Chain
						<span class="tooltip">Name of Chain</span>
					</div>
					<div class="chainInfo tooltip-container">
						Healthy Level
						<span class="tooltip">Health Level of Chain (1 to 5)</span>
					</div>
					<div class="chainInfo tooltip-container">
						Healthy Score
						<span class="tooltip">Health Score of Chain (Maximum:100)</span>
					</div>
					<div class="chainInfo tooltip-container">
						Decentralization Score
						<span class="tooltip">Decentralization Score of Chain (Maximum:100)</span>
					</div>
					<div class="chainInfo tooltip-container">
						Average Score
						<span class="tooltip">Average Health Score Of Validators (Maximum:100)</span>
					</div>
					<div class="chainInfo tooltip-container">
						Participation Score
						<span class="tooltip">Average Participation Score Of Validators (Maximum:100)</span>
					</div>
					<div class="chainInfo tooltip-container">
						Misscount Score
						<span class="tooltip">Average MissCount Score Of Validators (Maximum:100)</span>
					</div>
					<div class="chainInfo tooltip-container">
						Commission Score
						<span class="tooltip">Average Commission Score Of Validators (Maximum:100)</span>
					</div>
				</div>
			</div>
			{#each chainData as data}
				<div>
					<div class="tableContent">
						<div
							class="chainName pointer"
							on:click={() => {
								changeName(data.chain);
							}}
						>
							{data.chain}
						</div>
						<div class="chainInfo">{data.level}</div>
						<div class="chainInfo">{data.HealthyScore.toFixed(2)}</div>
						<div class="chainInfo">{data.Decentralization.toFixed(2)}</div>
						<div class="chainInfo">{data.average_totalScore.toFixed(2)}</div>
						<div class="chainInfo">{data.average_participation.toFixed(2)}</div>
						<div class="chainInfo">{data.average_windowMissCount.toFixed(2)}</div>
						<div class="chainInfo">{data.average_commissionScore.toFixed(2)}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style lang="scss">
	.dashboard-container {
		padding: 20px;
		display: flex;
		justify-content: center;
		.dashboard {
			width: 96%;
			padding: 20px;
			border-radius: 10px;
			background-color: #11141b;
			color: #fff;
			border-radius: 10px;
		}
	}
	.tableContent {
		display: flex;
		align-items: center;
		height: 40px;
		text-align: center;
		.chainName {
			width: 200px;
			cursor: pointer;
			.pointer {
				cursor: pointer;
			}
		}
		.chainInfo {
			width: 160px;
		}
	}
	.label {
		font-size: 12px;
	}
	.tooltip-container {
		position: relative;
		display: inline-block;
	}

	/* 툴팁의 스타일 */
	.tooltip {
		visibility: hidden; /* 초기에는 보이지 않게 설정 */
		position: absolute;
		background-color: #333;
		color: #fff;
		padding: 5px;
		border-radius: 3px;
		z-index: 1;
		white-space: nowrap;
	}

	/* hover 시 툴팁을 보이도록 설정 */
	.tooltip-container:hover .tooltip {
		visibility: visible;
	}
</style>
