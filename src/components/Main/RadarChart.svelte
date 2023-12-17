<script>
	import { onMount, beforeUpdate } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data;

	let chart = null;
	let chartCanvas; // Svelte binding for the canvas element

	function updateChart() {
		if (chart) {
			chart.destroy();
		}

		if (data && chartCanvas) {
			const formattedData = [
				data.average_participation,
				data.average_windowMissCount,
				data.average_commissionScore,
				data.average_totalScore,
				data.Decentralization,
				data.HealthyScore
			].map(Math.round);

			chart = new Chart(chartCanvas.getContext('2d'), {
				type: 'radar',
				data: {
					labels: [
						'참가율 점수',
						'미스블록 점수',
						'커미션 점수',
						'전체 점수',
						'탈중화율 점수',
						'건강도 점수'
					],
					datasets: [
						{
							label: 'Chain Metrics',
							data: formattedData,
							fill: true,
							backgroundColor: 'rgba(38, 122, 249, 0.2)',
							borderColor: '#267AF9',
							pointBorderColor: '#7987A8',
							pointBackgroundColor: '#267AF9',
							pointHoverBackgroundColor: '#ffffff',
							pointHoverBorderColor: '#267AF9'
						}
					]
				},
				options: {
					scales: {
						r: {
							angleLines: {
								color: 'rgba(255, 255, 255, 0.5)'
							},
							grid: {
								color: 'rgba(255, 255, 255, 0.2)'
							},
							pointLabels: {
								color: '#7987A8',
								font: {
									size: 10
								}
							},
							ticks: {
								backdropColor: 'transparent',
								callback: function (value, index) {
									return '';
								},
								color: '#fff'
							}
						}
					},
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							backgroundColor: 'rgba(0, 0, 0, 0.8)',
							titleFont: {
								size: 16,
								weight: 'bold'
							},
							bodyFont: {
								size: 14
							},
							displayColors: false
						}
					}
				}
			});
		}
	}
	onMount(() => {
		// chartCanvas가 올바르게 바인딩되었는지 확인
		if (chartCanvas) {
			updateChart();
		}
	});

	beforeUpdate(() => {
		updateChart();
	});
</script>

<div class="chart-container">
	<canvas bind:this={chartCanvas} class="radar-chart"></canvas>
</div>

<style lang="scss">
	.chart-container {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #11141b;
		border-radius: 10px;
		padding: 20px;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
		width: fit-content;
	}

	.radar-chart {
		max-width: 230px;
		max-height: 230px;
	}
</style>
