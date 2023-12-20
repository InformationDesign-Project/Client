<script>
	import { afterUpdate } from 'svelte';

	export let chainData;
	export let changeName;

	const levelColor={
		5:'#0F1F3F',
		4:'#14366E',
		3:'#1B4D9B',
		2:'#2064CA',
		1:'#267AF9'
	}
	function compareByScore(a, b) {
		// 비교를 위해 프로퍼티 값을 가져와서 비교
		return b.HealthyScore - a.HealthyScore;
	}
	function compareByLevel(a, b) {
		// 비교를 위해 프로퍼티 값을 가져와서 비교
		return b.level - a.level;
	}
	function compareByDecent(a, b) {
		// 비교를 위해 프로퍼티 값을 가져와서 비교
		return b.Decentralization - a.Decentralization;
	}
	function compareByParicipant(a, b) {
		// 비교를 위해 프로퍼티 값을 가져와서 비교
		return b.average_participation - a.average_participation;
	}
	function compareByMiss(a, b) {
		// 비교를 위해 프로퍼티 값을 가져와서 비교
		return b.average_windowMissCount - a.average_windowMissCount;
	}
	function compareByCommission(a, b) {
		// 비교를 위해 프로퍼티 값을 가져와서 비교
		return b.average_commissionScore - a.average_commissionScore;
	}
	function compareByAverage(a, b) {
		// 비교를 위해 프로퍼티 값을 가져와서 비교
		return b.average_totalScore - a.average_totalScore;
	}
	const sortScore = (fnc) => {
		const sortedArray = [...chainData].sort(fnc);
		chainData = sortedArray;
	};
	afterUpdate(() => {});
</script>

<main>
	<div class="dashboard-container">
		<div class="dashboard">
			<div>
				<div class="tableContent label">
					<div class="tooltip-container" style="width:200px;">
						Chain
						<span class="tooltip">Name of Chain</span>
					</div>
					<div
						on:click={() => {
							sortScore(compareByLevel);
						}}
						class="chainInfo tooltip-container"
					>
						Healthy Level
						<span class="tooltip">Health Level of Chain (1 to 5)</span>
					</div>
					<div
						on:click={() => {
							sortScore(compareByScore);
						}}
						class="chainInfo tooltip-container"
					>
						Healthy Score
						<span class="tooltip">Health Score of Chain (Maximum:100)</span>
					</div>
					<div
						on:click={() => {
							sortScore(compareByDecent);
						}}
						class="chainInfo tooltip-container"
					>
						Decentralization Score
						<span class="tooltip">Decentralization Score of Chain (Maximum:100)</span>
					</div>
					<div
						on:click={() => {
							sortScore(compareByAverage);
						}}
						class="chainInfo tooltip-container"
					>
						Average Score
						<span class="tooltip">Average Health Score Of Validators (Maximum:100)</span>
					</div>
					<div
						on:click={() => {
							sortScore(compareByParicipant);
						}}
						class="chainInfo tooltip-container"
					>
						Participation Score
						<span class="tooltip">Average Participation Score Of Validators (Maximum:100)</span>
					</div>
					<div
						on:click={() => {
							sortScore(compareByMiss);
						}}
						class="chainInfo tooltip-container"
					>
						Misscount Score
						<span class="tooltip">Average MissCount Score Of Validators (Maximum:100)</span>
					</div>
					<div
						on:click={() => {
							sortScore(compareByCommission);
						}}
						class="chainInfo tooltip-container"
					>
						Commission Score
						<span class="tooltip">Average Commission Score Of Validators (Maximum:100)</span>
					</div>
				</div>
			</div>
			{#each chainData as data,index}
				<div>
					<div class="tableContent">
						<div
							class="chainName pointer"
							on:click={() => {
								changeName(data.chain);
							}}
						>
						<div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;color:{levelColor[data.level]}">{index+1}</div>
							<div style="width:30%;"><img src={data.tokenImg} style="width:20px;" /></div>
							<div style="width:40%;text-align:start;">{data.chain}</div>
						</div>
						<div class="chainInfo">{data.level}</div>
						<div class="chainInfo" style="color:{levelColor[data.level]};">{data.HealthyScore.toFixed(2)}</div>
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
		height: 60px;
		text-align: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		.chainName {
			width: 200px;
			height: 100%;
			cursor: pointer;
			display: flex;
			align-items: center;
			background-color: #13151a;
			.pointer {
				cursor: pointer;
			}
		}
		.chainInfo {
			width: 160px;
		}
	}
	.label {
		color: #7987a8;
		font-size: 12px;
	}
	.tooltip-container {
		position: relative;
		display: inline-block;
		&:hover {
			cursor: pointer;
		}
	}

	.tooltip {
		visibility: hidden;
		position: absolute;
		background-color: #333;
		color: #fff;
		padding: 5px;
		border-radius: 3px;
		z-index: 1;
		white-space: nowrap;
	}
	.tooltip-container:hover .tooltip {
		visibility: visible;
	}
</style>
