<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	export let showVotes;
	export let proposalsData = [];
	let chart = null;
	let chartContainer;

	onMount(() => {
		if (proposalsData && proposalsData.length > 0) {
			createChart();
		}
	});

	$: if ((proposalsData && proposalsData.length > 0 && chartContainer) || showVotes !== undefined) {
		createChart();
	}

	function calculatePercentages(data) {
		return data.map((d) => {
			const yes = Number(d.detail.voteMeta.yes);
			const no = Number(d.detail.voteMeta.no);
			const yesAmount = Number(d.detail.voteMeta.yes_amount);
			const noAmount = Number(d.detail.voteMeta.no_amount);
			const totalVotes = yes + no;
			const totalAmount = yesAmount + noAmount;
			return {
				yesPercent: (yes / totalVotes) * 100,
				noPercent: (no / totalVotes) * 100,
				yesAmountPercent: (yesAmount / totalAmount) * 100,
				noAmountPercent: (noAmount / totalAmount) * 100
			};
		});
	}

	function createChart() {
		if (chart) {
			chart.destroy();
		}

		const ctx = chartContainer.getContext('2d');
		const limitedData = proposalsData.slice(0, 20);
		const percentages = calculatePercentages(limitedData);
		const labels = limitedData.map((d) => d.detail.title);
		const yesPercentages = percentages.map((d) => d.yesPercent);
		const noPercentages = percentages.map((d) => -d.noPercent);
		const yesAmountPercentages = percentages.map((d) => d.yesAmountPercent);
		const noAmountPercentages = percentages.map((d) => -d.noAmountPercent);

		const yesGradient = ctx.createLinearGradient(0, 0, 0, 200);
		yesGradient.addColorStop(0, '#4CB870');
		yesGradient.addColorStop(1, '#208C44');

		const noGradient = ctx.createLinearGradient(0, 0, 0, 200);
		noGradient.addColorStop(0, '#E05757');
		noGradient.addColorStop(1, '#C33939');

		const voteDataset = [
			{
				label: 'Yes Votes (%)',
				data: yesPercentages,
				backgroundColor: showVotes ? yesGradient : 'rgba(70, 130, 180, 0.7)',
				borderRadius: 9,
				shadowOffsetX: showVotes ? 0 : 3,
				shadowOffsetY: showVotes ? 0 : 3,
				shadowBlur: showVotes ? 0 : 5,
				shadowColor: showVotes ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 2)'
			},
			{
				label: 'No Votes (%)',
				data: noPercentages,
				backgroundColor: showVotes ? noGradient : 'rgba(255, 69, 0, 0.7)',
				borderRadius: 9
			}
		];

		const amountDataset = [
			{
				label: 'Yes Amount (%)',
				data: yesAmountPercentages,
				backgroundColor: showVotes ? 'rgba(70, 130, 180, 0.7)' : yesGradient,
				borderRadius: 9
			},
			{
				label: 'No Amount (%)',
				data: noAmountPercentages,
				backgroundColor: showVotes ? 'rgba(255, 69, 0, 0.7)' : noGradient,
				borderRadius: 9
			}
		];

		const datasets = showVotes ? voteDataset : amountDataset;

		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: datasets
			},
			options: {
				indexAxis: 'x', // 수평 바 차트 유지
				scales: {
					x: {
						stacked: true,
						ticks: {
							display: false
						},
						grid: {
							display: false
						}
					},
					y: {
						beginAtZero: true,
						stacked: true,
						min: -100,
						max: 100,
						ticks: {
							callback: (value) => Math.abs(value) + '%' // 음수 값을 양수로 변환하여 표시
						},
						grid: {
							display: true,
							color: 'rgba(255, 255, 255, 0.1)'
						}
					}
				},
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: true
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								let label = context.dataset.label || '';
								if (label) {
									label += ': ';
								}
								const value = Math.abs(context.raw);
								label += value.toFixed(2) + '%';
								return label;
							}
						}
					}
				}
			}
		});
	}
</script>

<div style="width:65%;">
	<canvas bind:this={chartContainer} id="bar-chart"></canvas>
</div>

<style>
</style>
