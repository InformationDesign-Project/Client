<script>
	import * as d3 from 'd3';

	export let data = [];
	let tooltip;
	function drawHeatmap() {
		const containerWidth = 600;
		const containerHeight = 2000;
		const container = d3
			.select('#heatmap')
			.html('')
			.attr('width', containerWidth)
			.attr('height', containerHeight);

		const colorScale = d3
			.scaleSequential((t) => {
				return d3.interpolateRgb(
					d3.rgb('#1B4D9B').darker(2 * (1 - t)),
					d3.rgb('#2064CA').brighter(2 * t)
				)(t);
			})
			.domain([1, 5]);
		tooltip = d3.select('.tooltip');

		container
			.selectAll('rect')
			.data(data)

			.enter()
			.append('rect')
			.attr('x', (d, i) => (i % 14) * 50) // 가로 방향 20개 블록
			.attr('y', (d, i) => Math.floor(i / 14) * 40) // 블록의 행 계산
			.attr('width', 45) // 블록 너비
			.attr('height', 35) // 블록 높이
			.attr('rx', 1)
			.attr('ry', 1)
			.attr('fill', (d) => colorScale(d.level))
			.on('mouseover', (event, d) => {
				tooltip.style('display', 'block');
				tooltip
					.html(
						`Moniker: ${d.moniker}<br>Level: ${d.level}<br> Vp: ${d.votingPower}<br>Rank: ${d.rank}`
					)
					.style('left', `${event.pageX}px`)
					.style('top', `${event.pageY - 28}px`);

				d3.select(event.currentTarget) // 현재 마우스 오버된 요소에 접근
					.style('stroke', 'white') 
					.style('stroke-width', '1'); 
			})
			.on('mouseout', (event) => {
				tooltip.style('display', 'none');
				d3.select(event.currentTarget) 
					.style('stroke', 'none'); 
			});
	}

	$: if (data && data.length > 0) {
		drawHeatmap();
	}
</script>

<svg id="heatmap"></svg>
<div class="tooltip"></div>


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
