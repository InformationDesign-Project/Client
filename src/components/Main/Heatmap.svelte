<script>
	import * as d3 from 'd3';

	export let data = [];
	let tooltip; // 툴팁 요소

	function drawHeatmap() {
		const containerWidth = 750; // 가로 방향 20개 블록 * 50px
		const containerHeight = 400;

		const container = d3
			.select('#heatmap')
			.html('')
			.attr('width', containerWidth)
			.attr('height', containerHeight);

		const colorScale = d3.scaleSequential().domain([1, 5]).interpolator(d3.interpolateBlues);

		tooltip = d3.select('.tooltip');

		container
			.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', (d, i) => (i % 15) * 50) // 가로 방향 20개 블록
			.attr('y', (d, i) => Math.floor(i / 15) * 40) // 블록의 행 계산
			.attr('width', 45) // 블록 너비
			.attr('height', 35) // 블록 높이
			.attr('fill', (d) => colorScale(d.level))
			.on('mouseover', (event, d) => {
				tooltip.style('display', 'block');
				tooltip
					.html(
						`Moniker: ${d.moniker}<br>Level: ${d.level}<br> Vp: ${d.votingPower}<br>Rank: ${d.rank}`
					)
					.style('left', `${event.pageX}px`)
					.style('top', `${event.pageY - 28}px`);
			})
			.on('mouseout', () => {
				tooltip.style('display', 'none');
			});
	}

	$: if (data && data.length > 0) {
		drawHeatmap();
	}
</script>

<svg id="heatmap"></svg>
<div class="tooltip"></div>

<!-- 툴팁 요소 추가 -->

<style>
	.tooltip {
		position: absolute;
		display: none;
		padding: 10px;
		background: #191b27;
		border-radius: 10px;
		pointer-events: none;
		font-size: 12px;
		color: #7987a8;
	}
</style>
