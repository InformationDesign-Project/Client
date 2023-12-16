<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
	import type { SankeyNode, SankeyLink } from './index.ts';

	let width = 900;
	let height = 500;

	onMount(() => {
		const data = {
			nodes: [
				{ name: 'Proposal 1' }, // 0
				{ name: 'Proposal 2' }, // 1
				{ name: 'Proposal 3' }, // 2
				{ name: 'Proposal 4' }, // 3
				{ name: 'Yes' }, // 4
				{ name: 'No' }, // 5
				{ name: 'Veto' }, // 6
				{ name: 'Abstain' }, // 7
				{ name: 'Passed' }, // 8
				{ name: 'Rejected' } // 9
			],
			links: [
				{ source: 0, target: 4, value: 3 },
				{ source: 0, target: 5, value: 1 },
				{ source: 0, target: 6, value: 1 },
				{ source: 0, target: 7, value: 1 },
				{ source: 1, target: 4, value: 2 },
				{ source: 1, target: 5, value: 2 },
				{ source: 2, target: 4, value: 2 },
				{ source: 2, target: 5, value: 2 },
				{ source: 3, target: 4, value: 2 },
				{ source: 3, target: 5, value: 2 },
				{ source: 4, target: 8, value: 9 },
				{ source: 5, target: 9, value: 3 },
				{ source: 6, target: 9, value: 2 },
				{ source: 7, target: 8, value: 3 }
			]
		};

		createSankeyChart(data);
	});

	function createSankeyChart(data: { nodes: SankeyNode[]; links: SankeyLink[] }) {
		const svg = d3.select('#sankey-chart').attr('viewBox', [0, 0, width, height]);

		const { nodes, links } = sankey<SankeyNode, SankeyLink>()
			.nodeWidth(100)
			.nodePadding(20)
			.extent([
				[1, 5],
				[width - 1, height - 5]
			])(data);

		svg
			.append('g')
			.selectAll('rect')
			.data(nodes)
			.join('rect')
			.attr('x', (d) => (d.x0 ?? 0) + 10)
			.attr('y', (d) => (d.y0 ?? 0) + 10)
			.attr('height', (d) => (d.y1 ?? 0) - (d.y0 ?? 0) - 20)
			.attr('width', (d) => (d.x1 ?? 0) - (d.x0 ?? 0) - 20)
			.attr('fill', 'var(--point, #267AF9)')
			.attr('rx', 10)
			.attr('ry', 10)
			.on('mouseover', function (event, d) {
				svg.selectAll('path').attr('stroke-opacity', (link) => {
					if (typeof link.source === 'object' && link.source.index === d.index) {
						return 1;
					} else if (typeof link.target === 'object' && link.target.index === d.index) {
						return 1;
					} else {
						return 0.1;
					}
				});
			})
			.on('mouseout', function () {
				svg.selectAll('path').attr('stroke-opacity', 0.5);
			});

		svg
			.append('g')
			.attr('fill', 'none')
			.selectAll('path')
			.data(links)
			.join('path')
			.attr('d', sankeyLinkHorizontal())
			.attr('stroke', (d) =>
				typeof d.source === 'object' && d.source.name.startsWith('Proposal') ? '#7987A8' : '#7987A8'
			)
			.attr('stroke-opacity', 0.5)
			.attr('stroke-width', (d) => Math.max(1, d.width));
		svg.append('g').selectAll('text').data(nodes);

		svg
			.append('g')
			.selectAll('text')
			.data(nodes)
			.join('text')
			.attr('x', (d) => (d.x0 ?? 0) + 20)
			.attr('y', (d) => (d.y0 ?? 0) + 30)
			.attr('text-anchor', 'center')
			.text((d) => d.name)
			.attr('fill', 'white')
			.style('font-size', '14px');
	}
</script>

<header>
	<div class="inner-header">
		<div>Proposals</div>
		<div>Progress</div>
		<div>result</div>
	</div>
</header>

<main>
	<svg id="sankey-chart"></svg>
</main>

<style lang="scss">
	header {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		width: 100%;
		margin: auto;
	}

	.inner-header {
		display: flex;
		justify-content: space-between;
		margin-left: 150px;
		margin-right: 150px;
	}

	.inner-header div {
		font-size: 18px;
		color: #ffffff;
		opacity: 0.5;
		margin: 25px;
	}

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90vh;
	}

	#sankey-chart {
		max-width: 100%;
		height: 90%;
	}
</style>
