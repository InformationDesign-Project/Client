<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { Layout } from '../components/layout';
	import MainDashboard from '../components/Main/MainDashboard.svelte';
	import MainHeader from '../components/Main/MainHeader.svelte';
	import NetworkTable from '../components/Main/NetworkTable.svelte';
	//타켓코인
	let chainName = 'crescent';
	//타겟 체인 데이타
	let chainData = [];
	//타겟 코인 발리데이터
	let validatorData = [];
	const changeName = async (name) => {
		chainName = name;
		const chainResponse = await fetch('/allchain_with_level_updated.json');
		const chainDatas = await chainResponse.json();
		chainData = chainDatas.data;
		console.log(chainData, 'chainData');

		const validatorsResponse = await fetch(`/valitdators_level/output_validators_${name}.json`);
		const validatorsJson = await validatorsResponse.json();
		validatorData = validatorsJson.data;
		console.log(validatorData, 'validatorsdata');
	};

	onMount(async () => {
		const chainResponse = await fetch('/allchain_with_level_updated.json');
		const chainDatas = await chainResponse.json();
		chainData = chainDatas.data;
		console.log(chainData, 'chainData');

		const validatorsResponse = await fetch(
			`/valitdators_level/output_validators_${chainName}.json`
		);
		const validatorsJson = await validatorsResponse.json();
		validatorData = validatorsJson.data;
		console.log(validatorData, 'validatorsdata');
	});
</script>

<body>
	<Layout>
	<MainHeader />
	<MainDashboard {chainData} {validatorData} {chainName} {changeName} />
	<NetworkTable {chainData} {changeName} />
	</Layout>	
</body>

<style lang="scss">
	body{
		width:93%;
	}
</style>
