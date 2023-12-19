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

	onMount(() => {
		loadData(chainName);
	});

	async function loadData(selectedChain) {
		const response = await fetch(`/Proposals_level/proposals_${selectedChain}.json`);
		const json = await response.json();
		proposalsData = json.data;
		console.log(proposalsData, 'proposalsData');
	}

	function handleChainChange(event) {
		const selectedChain = event.target.value;
		chainName = selectedChain;
		loadData(selectedChain);
	}
</script>

<div class="main-container">
	<div class="top-section">
		<img src="/layout/proposals-overview-logo.png" alt="Blockchain image" />
		<div class="text-description">
			Visualizing the voting records of blockchains with a bar chart.<br />
			A higher percentage of green indicates a healthier blockchain.
		</div>
		<div class="info-box">Decentralization</div>
	</div>

	<div class="charts-section">
		<BarChart {proposalsData} />
		<PieChart {proposalsData} />
	</div>

	<div class="dropdown-container">
		<label for="chain-select">Choose a blockchain:</label>
		<select id="chain-select" on:change={handleChainChange}>
			{#each availableChains as chain}
				<option value={chain}>{chain}</option>
			{/each}
		</select>
	</div>

	<div class="proposals-section">
		{#each proposalsData as proposal, index (proposal.detail.id)}
			{#if index < 15}
				<ProposalBox {proposal} />
			{/if}
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
		// Other styles...
	}

	.dropdown-container {
		margin-top: 20px;
		select {
			padding: 10px;
			border-radius: 5px;
			// Other styles...
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
