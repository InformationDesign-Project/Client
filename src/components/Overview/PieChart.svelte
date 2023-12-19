<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let proposalsData = [];

	let pieChart = null;
	let pieChartContainer;

	onMount(() => {
		if (proposalsData && proposalsData.length > 0) {
			createPieChart();
		}
	});

	$: if (proposalsData && pieChartContainer) {
		createPieChart();
	}

	function aggregateProposalTypes(data) {
		const typeCounts = data.reduce((acc, proposal) => {
			const type = proposal.detail.proposal_type;
			acc[type] = (acc[type] || 0) + 1;
			return acc;
		}, {});

		return Object.entries(typeCounts).map(([type, count]) => ({
			type,
			count
		}));
	}

	function createPieChart() {
		if (pieChart) {
			pieChart.destroy();
		}

		const ctx = pieChartContainer.getContext('2d');
		const proposalTypes = aggregateProposalTypes(proposalsData);
		const labels = proposalTypes.map((pt) => pt.type);
		const counts = proposalTypes.map((pt) => pt.count);

		pieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [
					{
						data: counts,
						backgroundColor: ['#3498db', '#e74c3c', '#f1c40f', '#2ecc71', '#9b59b6', '#34495e'],
						hoverOffset: 4,
						borderColor: 'rgba(0, 0, 0, 0)'
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				aspectRatio: 1,
				plugins: {
					legend: {
						position: 'right',
						labels: {
							usePointStyle: true,
							padding: 20
						}
					},
					tooltip: {
						enabled: true,
						callbacks: {
							label: function (context) {
								const label = context.label || '';
								const value = context.parsed;
								return `${label}: ${value}%`;
							}
						}
					}
				}
			}
		});
	}
</script>

<div class="chart-box">
	<canvas bind:this={pieChartContainer}></canvas>
</div>

<style lang="scss">
	.chart-box {
		width: 100%;
		max-width: 400px; /* 최대 너비를 400px로 설정 */
		height: 300px; /* 높이를 300px로 설정 */
		border-radius: 10px;
		background: var(--03, #191b27);
		padding: 20px;
		box-sizing: border-box;
		margin: auto; /* 중앙 정렬 */
	}
</style>
