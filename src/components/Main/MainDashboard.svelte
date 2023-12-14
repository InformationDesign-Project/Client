<script lang="ts">
	import DropdownMenu from './DropdownMenu.svelte';
</script>

<div class="dashboard-container">
	<div class="dashboard">
		<div class="dashboard-top-line">
			<div class="dashboard-coin">COSMOS</div>
			<div class="dashboard-metric">
				<div class="metric-value">85</div>
				<!-- 임의의 값 -->
				<div class="metric-label">Healthy Level</div>
			</div>
			<div class="dashboard-metric">
				<div class="metric-value score">92</div>
				<!-- 임의의 값 -->
				<div class="metric-label">Healthy Score</div>
			</div>
			<div class="dashboard-metric">
				<div class="metric-value">76%</div>
				<!-- 임의의 값 -->
				<div class="metric-label">Decentralization</div>
			</div>
		</div>
		<div class="dashboard-main">
			<div class="heatmap">
				<img width="100%;" src="/layout/heatmap.png" alt="heatmap" />
			</div>
			<div class="sidebar">
				<div class="sorted-by">Sorted By</div>
				<DropdownMenu />
				<!-- DropdownMenu 컴포넌트 사용 -->
				<div class="validators-info">
					<div class="validators-info-item">
						<div class="validators-info-label">Total Validators</div>
						<div class="validators-info-number">50</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 1</div>
						<div class="validators-info-number">10</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 2</div>
						<div class="validators-info-number">15</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 3</div>
						<div class="validators-info-number">20</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 4</div>
						<div class="validators-info-number">12</div>
					</div>
					<div class="validators-info-item">
						<div class="validators-info-label">Level 5</div>
						<div class="validators-info-number">8</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="right-section">
		<div class="coin-list-section">
			<div class="coin-list-header">
				<img src="/layout/Vector.png" alt="vector" />
				<div class="coin-list-top">Top 10 Healthy Chains</div>
			</div>
			<div class="coin-list-divider"></div>
			<div class="coin-list">
				<img width="90%;" src="/layout/cosmosFrame.png" alt="cosmos-freame" />
				<!-- <div class="coin-list-left">
                    
                    <div>01 COSMOS</div>
        
                </div>
                <div class="coin-list-right">
                </div> -->
			</div>
		</div>

		<div class="rader-chart">
			<img
				width="100%;"
				src="/layout/rader-chart.png"
				alt="rader-chart"
				style="margin-top: 25px;"
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.dashboard-container {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: flex-start;
		padding: 20px;
		gap: 20px;
	}

	.dashboard {
		width: 70%;
		height: 500px;
		padding: 20px;
		border-radius: 10px;
		background-color: #11141b;
		color: #fff;
		border-radius: 10px;
		margin: 20px;
		.dashboard-top-line {
			display: flex;
			justify-content: space-between;
			width: 85%;
			margin-bottom: 20px;
			.dashboard-metric {
				display: flex;
				flex-direction: column;
				align-items: center;

				.metric-value {
					font-size: 50px;
					font-weight: bold;
				}
				.metric-value.score {
					color: #267af9;
				}

				.metric-label {
					font-size: 16px;
					margin-top: 5px;
					opacity: 0.6;
				}
			}
		}

		.dashboard-main {
			display: flex;
			width: 100%;

			.sidebar {
				flex-basis: 30%;
				margin-left: 5%;
			}
		}
	}

	.dashboard-coin {
		background-color: #161b26;
		padding: 15px 15px;
		border-radius: 10px;
		width: 150px;
		height: 50px;
		font-size: 24px;
		color: #ffffff;
	}

	.dashboard-metric {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.metric-value {
		font-size: 50px;
		font-weight: bold;
	}

	.metric-value.score {
		color: #267af9;
	}

	.metric-label {
		font-size: 16px;
		margin-top: 5px;
		opacity: 0.6;
	}

	.heatmap {
		display: flex;
		width: 100%;
		height: 100%;
	}

	.sidebar {
		flex-basis: 30%;
		margin-left: 5%;
	}

	.sorted-by {
		font-size: 12px;
		font-style: normal;
		color: #7987a8;
		margin-bottom: 10px;
	}

	.validators-info-item {
		display: flex;
		flex-direction: column;
		align-items: left;
	}

	.validators-info-label {
		font-size: 12px;
		font-weight: normal;
		margin-top: 5px;
		margin-bottom: 5px;
		color: #7987a8;
	}

	.validators-info-number {
		font-size: 24px;
		font-weight: bold;
		color: #ffffff;
	}

	.right-section {
		display: flex;
		flex-direction: column;
		width: 30%;
		height: 100%;
		gap: 20px;
		padding: 20px;
	}

	.coin-list-section {
		flex-grow: 1;
		height: 250px;
		width: 70%;
		border-radius: 10px;
		background-color: #11141b;
		color: #fff;

		.coin-list-header {
			display: flex;
			align-items: center;
			gap: 10px; // 필요에 따라 조정
			margin: 20px;

			.coin-list-top {
				color: #ffffff;
				opacity: 0.7;
			}
		}

		.coin-list-divider {
			border-top: 1px solid rgba(121, 135, 168, 0.15);
			margin: 0 20px;
		}

		.coin-list {
			display: flex;
			justify-content: space-between;
			margin-left: 25px;

			.coin-list-left,
			.coin-list-right {
				display: flex;
				flex-direction: column;
				width: 48%;
				margin: 20px;

				div {
				}
			}
		}
	}

	.rader-chart {
		flex-grow: 1;
		height: 270px;
		width: 70%;
		border-radius: 10px;
		background-color: #11141b;
		color: #fff;
	}
</style>
