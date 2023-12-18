<script lang="ts">
</script>

<div class="header">
	<div class="logo">
		<img width="70%;" src="/layout/Healthy-chain.png" alt="Healthy Chain Logo" />
	</div>
	<div class="top-coins">
		<div class="top-coin today">
			<div class="time-period">Today</div>
			<div class="coin-name"><!-- 오늘의 최고 건강도 코인 이름 -->COSMOS</div>
			<div class="title">Best Healthy Chain Today</div>
		</div>
		<div class="top-coin month">
			<div class="time-period">Month</div>
			<div class="coin-name">
				<!-- 이번 달의 최고 건강도 코인 이름 -->KAVA
			</div>
			<div class="title">Best Healthy Chain this Month</div>
		</div>
		<div class="top-coin year">
			<div class="time-period">Year</div>
			<div class="coin-name"><!-- 올해의 최고 건강도 코인 이름 -->BAND</div>
			<div class="title">Best Healthy Chain this Year</div>
		</div>
	</div>
</div>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 98.5%;
	}

	.logo {
		// 로고 스타일링
		flex-grow: 0;
		padding-left: 40px;
		padding-top: 15px;
	}

	.top-coins {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 15px;
		//margin-right: 170px;
	}

	.top-coin {
		background-color: #11141b;
		color: #ffffff;
		padding: 28px;
		border-radius: 10px;
		margin: 0 15px;
		width: 20%;
		height: 50px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.time-period {
		font-size: 16px;
		font-weight: normal;
		margin-bottom: 5px;
	}

	.coin-name {
		font-size: 34px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.title {
		font-size: 11px;
		font-weight: normal;
		opacity: 0.6;
	}
</style>
