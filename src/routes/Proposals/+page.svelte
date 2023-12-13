<script lang="ts"></script>

<main>
	<div class="image-container">
		<img src="/layout/Proposals-logo.png" alt="Proposal Image" />
	</div>

	<div class="content">
		<div class="box">
			<h2>Proposals Flow</h2>
			<p>블록체인의 투표에 대한 흐름과 현황을 한 눈에 파악할 수 있습니다.</p>
			<img src="/layout/proposals-flow.png" alt="Flow Image" />
		</div>

		<div class="box">
			<h2>Proposals Overview</h2>
			<p>
				블록체인들의 투표 기록을 막대 차트로 시각화 하였습니다. 초록색의 비율이 많을 수록 건강한
				블록체인임을 나타내고 있습니다.
			</p>
			<img src="/layout/proposals-overview.png" alt="Overview Image" />
		</div>
	</div>
</main>

<style lang="scss">
	main {
		margin-left: 80px;
		.image-container {
			text-align: left;
			margin-bottom: 20px;

			img {
				width: 30%;
				max-width: 600px;
			}
		}

		.content {
			display: flex;
			align-items: flex-start;
			gap: 28px;

			.box {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 25%;
				height: 400px;
				background-color: #161b26;
				padding: 20px;
				border-radius: 10px;
				margin-top: 100px;

				h2 {
					color: #ffffff;
					font-size: 30px;
					margin-top: 20px;
				}

				p {
					color: #7987a8;
					font-size: 14px;
					margin-bottom: 70px;
				}

				img {
					align-self: flex-end;
					height: 200px;
					width: 100%;
					margin-bottom: 30px;
				}
			}
		}
	}
</style>
