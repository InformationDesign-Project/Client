<script>
	import { onMount, beforeUpdate } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data;

	let chart = null;
	let chartCanvas;

	function updateChart() {
		if (chart) {
			chart.destroy();
		}

		if (data && chartCanvas) {
			const ctx = chartCanvas.getContext('2d');
			const { width, height } = ctx.canvas;

			const gradient = ctx.createRadialGradient(
				width * 0.4926,
				height * 0.4659,
				0,
				width * 0.4926,
				height * 0.4659,
				width * 0.5613
			);
			gradient.addColorStop(0, 'rgba(38, 122, 249, 0.00)');
			gradient.addColorStop(1, 'rgba(38, 122, 249, 0.50)');

			const formattedData = [
				data.average_participation,
				data.average_windowMissCount,
				data.average_commissionScore,
				data.average_totalScore,
				data.Decentralization,
				data.HealthyScore
			].map(Math.round);

			chart = new Chart(ctx, {
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
							label: '',
							data: formattedData,
							fill: true,
							backgroundColor: gradient,
							borderColor: 'rgba(255, 255, 255, 0.7)',
							pointBorderColor: '#7987A8',
							pointBackgroundColor: '#FFF',
							pointHoverBackgroundColor: '#ffffff',
							pointHoverBorderColor: '#267AF9',
							pointRadius: 2,
							pointHitRadius: 2,
							pointHoverRadius: 2
						}
					]
				},
				options: {
					scales: {
						r: {
							angleLines: {
								color: '#7987A84D'
							},
							grid: {
								color: '#7987A84D'
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
								size: 0,
								weight: 'bold'
							},
							bodyFont: {
								size: 18
							},
							displayColors: false,
							xAlign: 'center',
							yAlign: 'center',
							callbacks: {
								label: function (context) {
									return context.label + ': ' + context.formattedValue;
								}
							}
						}
					}
				}
			});
		}
	}

	onMount(() => {
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
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
		// width: fit-content;
	}

	.radar-chart {
		max-width: 300px;
		max-height: 300px;
	}
</style>
