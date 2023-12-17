<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import MainDashboard from '../components/Main/MainDashboard.svelte';
	import MainHeader from '../components/Main/MainHeader.svelte';
	let chainName;
	let chainData;
	let validatorData;

	onMount(async()=>{
		chainName='cosmos'
		const chainResponse = await fetch('/allchain_with_level_updated.json');
		const chainDatas = await chainResponse.json();
		chainData =chainDatas.data;
		console.log(chainData,'chainData')

		const validatorsResponse = await fetch(
			`/valitdators_level/output_validators_${chainName}.json`
		);
		const validatorsJson = await validatorsResponse.json();
		validatorData = validatorsJson.data
		console.log(validatorData,'validatorsdata')


	})
</script>



<body>
	<MainHeader />
	<MainDashboard chainData={chainData} validatorData={validatorData} chainName={chainName}/>
</body>
