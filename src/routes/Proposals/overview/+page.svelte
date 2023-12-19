<script lang="ts">
	import { onMount } from 'svelte';
	import BarChart from '../../../components/Overview/BarChart.svelte';
	import PieChart from '../../../components/Overview/PieChart.svelte';
	import ProposalBox from '../../../components/Overview/ProposalBox.svelte';

	let chainName = 'cosmos'; // 기본 체인 이름
	let proposalsData = []; // 제안 데이터
	let availableChains = [
		'akash',
		'archway',
		'asset-mantle',
		'axelar',
		'band',
		'bitcanna',
		'bitsong',
		'canto',
		'chihuahua',
		'comdex',
		'coreum',
		'cosmos',
		'crescent',
		'crypto-org',
		'cudos',
		'demos',
		'dydx',
		'evmos',
		'fetchai',
		'gravity-bridge',
		'injective',
		'iris',
		'ixo',
		'juno',
		'kava',
		'ki-chain',
		'kyve',
		'likecoin',
		'lum',
		'mars-protocol',
		'medibloc',
		'nyx',
		'omniflix',
		'onomy-protocol',
		'osmosis',
		'passage',
		'persistence',
		'provenance',
		'quasar',
		'quicksilver',
		'regen',
		'rizon',
		'secret',
		'sei',
		'sentinel',
		'shentu',
		'sommelier',
		'stafi',
		'stargaze',
		'starname',
		'stride',
		'teritori',
		'terra',
		'umee',
		'xpla'
	]; // 사용 가능한 체인 목록

	onMount(async () => {
		await loadData(chainName);
	});

	async function loadData(selectedChain) {
		const response = await fetch(`/Proposals_level/proposals_${selectedChain}.json`);
		if (response.ok) {
			const json = await response.json();
			proposalsData = json.data;
		} else {
			console.error('Failed to load data:', response.status);
			proposalsData = [];
		}
	}

	function handleChainChange(event) {
		chainName = event.target.value;
		loadData(chainName);
	}
</script>

<div class="main-container">
	<div class="top-section">
		<img src="/layout/proposals-overview-logo.png" alt="Blockchain image" />
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

	<div class="dropdown-container">
		<select id="chain-select" on:change={handleChainChange}>
			{#each availableChains as chain}
				<option value={chain}>{chain}</option>
			{/each}
		</select>
	</div>

	<div class="proposals-section">
		{#each proposalsData as proposal}
			<ProposalBox {proposal} />
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
	.dropdown-container {
		margin-top: 40px;

		select {
			width: 15%;
			height: 36px;
			padding: 10px;
			border-radius: 5px;
			background-color: #161b26;
			color: #afb7c0;
			border: none;
		}
		option {
			height: 30px;
		}
	}

	.charts-section {
		display: flex;
		justify-content: space-between;
		margin-top: 70px;
		height: 300px;
		> * {
			flex: 1;
		}
	}

	.proposals-section {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 10px;
		margin-top: 50px;
	}
</style>
