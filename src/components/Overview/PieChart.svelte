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

		const sortedTypes = Object.entries(typeCounts)
			.map(([type, count]) => ({
				type,
				count
			}))
			.sort((a, b) => b.count - a.count);

		const topTypes = sortedTypes.slice(0, 4);
		const otherCount = sortedTypes.slice(4).reduce((sum, item) => sum + item.count, 0);

		if (otherCount > 0) {
			topTypes.push({ type: 'ETC', count: otherCount });
		}

		return topTypes;
	}

	function createPieChart() {
		if (pieChart) {
			pieChart.destroy();
		}

		const ctx = pieChartContainer.getContext('2d');
		const proposalTypes = aggregateProposalTypes(proposalsData);
		const labels = proposalTypes.map((pt) => pt.type);
		const counts = proposalTypes.map((pt) => pt.count);
		const backgroundColors = proposalTypes.map((pt) => getColorForType(pt.type));

		pieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [
					{
						data: counts,
						backgroundColor: backgroundColors,
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
							padding: 20,
							color: '#fff'
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
	function getColorForType(type) {
		const colorMap = {
			CommunityPoolSpend: '#267AF9',
			ParameterChange: '#E05757',
			SoftwareUpgrade: '#FFBD5A',
			ClientUpdate: '#4CB870',
			Text: '#FF8A36',
			ETC: '#7987A8'
		};
		return colorMap[type] || getRandomColor();
	}

	function getRandomColor() {
		const colors = ['#3498db', '#e74c3c', '#f1c40f', '#2ecc71', '#9b59b6', '#34495e'];
		return colors[Math.floor(Math.random() * colors.length)];
	}
</script>

<div class="chart-box">
	<canvas bind:this={pieChartContainer}></canvas>
</div>

<style lang="scss">
	.chart-box {
		width: 100%;
		max-width: 400px;
		height: 300px;
		border-radius: 10px;
		background: var(--03, #191b27);
		padding: 35px;
		box-sizing: border-box;
		margin-left: 20px;
	}
</style>
