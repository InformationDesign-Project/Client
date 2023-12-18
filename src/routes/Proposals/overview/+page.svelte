<script lang="ts">
	import { onMount } from 'svelte';
	import BarChart from '../../../components/Overview/BarChart.svelte';
	import PieChart from '../../../components/Overview/PieChart.svelte';
	import ProposalBox from '../../../components/Overview/ProposalBox.svelte';

	let chainName = 'cosmos';
	let proposalsData = [];

	onMount(async () => {
		const proposalsResponse = await fetch(`/Proposals_level/proposals_cosmos.json`);
		const proposalsJson = await proposalsResponse.json();
		proposalsData = proposalsJson.data;
		console.log(proposalsData, 'proposalsData');
	});
</script>

<div class="main-container">
	<div class="top-section">
		<img src="/layout/proposals-overview-logo.png" alt="블록체인 이미지" />
		<div class="text-description">
			블록체인들의 투표 기록을 막대 차트로 시각화 하였습니다.<br />
			초록색의 비율이 많을 수록 건강한 블록체인임을 나타내고 있습니다.
		</div>
		<div class="info-box">Decentralization</div>
	</div>

	<div class="charts-section">
		<BarChart {proposalsData} />
		<PieChart {proposalsData} />
	</div>

	<div class="proposals-section">
		{#each Array(15) as _, index}
			<ProposalBox {index} />
		{/each}
	</div>
</div>

<style lang="scss">
	.main-container {
		margin: 20px;
		margin-left: 50px;
		margin-right: 50px;
	}

	.top-section {
		display: flex;
		align-items: center;
		gap: 2%;
		.text-description {
			font-size: 14px;
			color: var(--04, #7987a8);
		}
		.info-box {
			padding: 20px;
			border-radius: 10px;
			background: var(--02, #161b26);
			color: #fff;
			opacity: 0.6;
		}
	}

	.charts-section {
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
		height: 300px;
	}

	.proposals-section {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 10px;
		margin-top: 50px;
	}
</style>
