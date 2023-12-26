<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
	import type { SankeyNode, SankeyLink } from './index.ts';

	//타켓코인
	let chainName = 'cosmos';
	let svg;
	//타겟 체인 데이타
	let chainData = [];
	//타겟 코인 발리데이터
	let validatorData = [];
	let availableChains = [
		'akash',
		'archway',
		'asset-mantle',
		'axelar',
		'band',
		'bitcanna',
		'bitsong',
		'canto',
		'chihuahua',
		'comdex',
		'coreum',
		'cosmos',
		'crescent',
		'crypto-org',
		'cudos',
		'demos',
		'dydx',
		'evmos',
		'fetchai',
		'gravity-bridge',
		'injective',
		'iris',
		'ixo',
		'juno',
		'kava',
		'ki-chain',
		'kyve',
		'likecoin',
		'lum',
		'mars-protocol',
		'medibloc',
		'nyx',
		'omniflix',
		'onomy-protocol',
		'osmosis',
		'passage',
		'persistence',
		'provenance',
		'quasar',
		'quicksilver',
		'regen',
		'rizon',
		'secret',
		'sei',
		'sentinel',
		'shentu',
		'sommelier',
		'stafi',
		'stargaze',
		'starname',
		'stride',
		'teritori',
		'terra',
		'umee',
		'xpla'
	];
	let width = 2500;
	let height = 1200;
	let json = {
		level1: {
			total: 0,
			yes: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			no: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			abstain: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			veto: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			notVote: 0
		},
		level2: {
			total: 0,
			yes: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			no: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			abstain: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			veto: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			notVote: 0
		},
		level3: {
			total: 0,
			yes: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			no: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			abstain: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			veto: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			notVote: 0
		},
		level4: {
			total: 0,
			yes: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			no: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			abstain: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			veto: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			notVote: 0
		},
		level5: {
			total: 0,
			yes: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			no: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			abstain: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			veto: {
				total: 0,
				passed: 0,
				rejected: 0
			},
			notVote: 0
		}
	};
	onMount(async () => {
		// 초기 체인 데이터로드 및 SVG 차트 생성
		svg = d3.select('#sankey-chart');
		await loadData(chainName);
	});

	async function loadData(selectedChain) {
		svg.selectAll('*').remove();
		const proposalJson = await fetch(`/Proposals_level/proposals_${selectedChain}.json`);
		const proposalData = await proposalJson.json();

		proposalData.data.forEach((proposals) => {
			proposals.validatorVotes.forEach((el) => {
				if (el.level == 1) {
					json.level1.total++;
					if (el.answer == 'yes') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level1.yes.passed++;
							json.level1.yes.total++;
						} else {
							json.level1.yes.rejected++;
							json.level1.yes.total++;
						}
					} else if (el.answer == 'no') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level1.no.passed++;
							json.level1.no.total++;
						} else {
							json.level1.no.rejected++;
							json.level1.no.total++;
						}
					} else if (el.answer == 'no with veto') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level1.veto.passed++;
							json.level1.veto.total++;
						} else {
							json.level1.veto.rejected++;
							json.level1.veto.total++;
						}
					} else if (el.answer == 'abstain') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level1.abstain.passed++;
							json.level1.abstain.total++;
						} else {
							json.level1.abstain.rejected++;
							json.level1.abstain.total++;
						}
					} else {
						json.level1.notVote++;
					}
				} else if (el.level == 2) {
					json.level2.total++;
					if (el.answer == 'yes') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level2.yes.passed++;
							json.level2.yes.total++;
						} else {
							json.level2.yes.rejected++;
							json.level2.yes.total++;
						}
					} else if (el.answer == 'no') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level2.no.passed++;
							json.level2.no.total++;
						} else {
							json.level2.no.rejected++;
							json.level2.no.total++;
						}
					} else if (el.answer == 'no with veto') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level2.veto.passed++;
							json.level2.veto.total++;
						} else {
							json.level2.veto.rejected++;
							json.level2.veto.total++;
						}
					} else if (el.answer == 'abstain') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level2.abstain.passed++;
							json.level2.abstain.total++;
						} else {
							json.level2.abstain.rejected++;
							json.level2.abstain.total++;
						}
					} else {
						json.level2.notVote++;
					}
				} else if (el.level == 3) {
					json.level3.total++;
					if (el.answer == 'yes') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level3.yes.passed++;
							json.level3.yes.total++;
						} else {
							json.level3.yes.rejected++;
							json.level3.yes.total++;
						}
					} else if (el.answer == 'no') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level3.no.passed++;
							json.level3.no.total++;
						} else {
							json.level3.no.rejected++;
							json.level3.no.total++;
						}
					} else if (el.answer == 'no with veto') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level3.veto.passed++;
							json.level3.veto.total++;
						} else {
							json.level3.veto.rejected++;
							json.level3.veto.total++;
						}
					} else if (el.answer == 'abstain') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level3.abstain.passed++;
							json.level3.abstain.total++;
						} else {
							json.level3.abstain.rejected++;
							json.level3.abstain.total++;
						}
					} else {
						json.level3.notVote++;
					}
				} else if (el.level == 4) {
					json.level4.total++;
					if (el.answer == 'yes') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level4.yes.passed++;
							json.level4.yes.total++;
						} else {
							json.level4.yes.rejected++;
							json.level4.yes.total++;
						}
					} else if (el.answer == 'no') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level4.no.passed++;
							json.level4.no.total++;
						} else {
							json.level4.no.rejected++;
							json.level4.no.total++;
						}
					} else if (el.answer == 'no with veto') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level4.veto.passed++;
							json.level4.veto.total++;
						} else {
							json.level4.veto.rejected++;
							json.level4.veto.total++;
						}
					} else if (el.answer == 'abstain') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level4.abstain.passed++;
							json.level4.abstain.total++;
						} else {
							json.level4.abstain.rejected++;
							json.level4.abstain.total++;
						}
					} else {
						json.level4.notVote++;
					}
				} else if (el.level == 5) {
					json.level5.total++;
					if (el.answer == 'yes') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level5.yes.passed++;
							json.level5.yes.total++;
						} else {
							json.level5.yes.rejected++;
							json.level5.yes.total++;
						}
					} else if (el.answer == 'no') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level5.no.passed++;
							json.level5.no.total++;
						} else {
							json.level5.no.rejected++;
							json.level5.no.total++;
						}
					} else if (el.answer == 'no with veto') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level5.veto.passed++;
							json.level5.veto.total++;
						} else {
							json.level5.veto.rejected++;
							json.level5.veto.total++;
						}
					} else if (el.answer == 'abstain') {
						if (proposals.detail.proposal_status == 'PROPOSAL_STATUS_PASSED') {
							json.level5.abstain.passed++;
							json.level5.abstain.total++;
						} else {
							json.level5.abstain.rejected++;
							json.level5.abstain.total++;
						}
					} else {
						json.level5.notVote++;
					}
				}
			});
		});
		console.log(json, '결과는~~?');

		const data = {
			nodes: [
				{ name: 'Level 5' }, // 0
				{ name: 'Level 4' }, // 1
				{ name: 'Level 3' }, // 2
				{ name: 'Level 2' }, // 3
				{ name: 'Level 1' }, // 4
				{ name: 'Yes' }, // 5
				{ name: 'No' }, // 6
				{ name: 'Veto' }, // 7
				{ name: 'Abstained' }, // 8
				{ name: 'Passed' }, //9
				{ name: 'Rejected' } //10
			],
			links: [
				{ source: 0, target: 5, value: json.level5.yes.total },
				{ source: 0, target: 6, value: json.level5.no.total },
				{ source: 0, target: 7, value: json.level5.veto.total },
				{ source: 0, target: 8, value: json.level5.abstain.total },
				{ source: 1, target: 5, value: json.level4.yes.total },
				{ source: 1, target: 6, value: json.level4.no.total },
				{ source: 1, target: 7, value: json.level4.veto.total },
				{ source: 1, target: 8, value: json.level4.abstain.total },
				{ source: 2, target: 5, value: json.level3.yes.total },
				{ source: 2, target: 6, value: json.level3.no.total },
				{ source: 2, target: 7, value: json.level3.veto.total },
				{ source: 2, target: 8, value: json.level3.abstain.total },
				{ source: 3, target: 5, value: json.level2.yes.total },
				{ source: 3, target: 6, value: json.level2.no.total },
				{ source: 3, target: 7, value: json.level2.veto.total },
				{ source: 3, target: 8, value: json.level2.abstain.total },
				{ source: 4, target: 5, value: json.level1.yes.total },
				{ source: 4, target: 6, value: json.level1.no.total },
				{ source: 4, target: 7, value: json.level1.veto.total },
				{ source: 4, target: 8, value: json.level1.abstain.total },
				{ source: 5, target: 9, value: json.level5.yes.passed },
				{ source: 5, target: 9, value: json.level4.yes.passed },
				{ source: 5, target: 9, value: json.level3.yes.passed },
				{ source: 5, target: 9, value: json.level2.yes.passed },
				{ source: 5, target: 9, value: json.level1.yes.passed },
				{ source: 5, target: 10, value: json.level5.yes.rejected },
				{ source: 5, target: 10, value: json.level4.yes.rejected },
				{ source: 5, target: 10, value: json.level3.yes.rejected },
				{ source: 5, target: 10, value: json.level2.yes.rejected },
				{ source: 5, target: 10, value: json.level1.yes.rejected },
				{ source: 6, target: 9, value: json.level5.no.passed },
				{ source: 6, target: 9, value: json.level4.no.passed },
				{ source: 6, target: 9, value: json.level3.no.passed },
				{ source: 6, target: 9, value: json.level2.no.passed },
				{ source: 6, target: 9, value: json.level1.no.passed },
				{ source: 6, target: 10, value: json.level5.no.rejected },
				{ source: 6, target: 10, value: json.level4.no.rejected },
				{ source: 6, target: 10, value: json.level3.no.rejected },
				{ source: 6, target: 10, value: json.level2.no.rejected },
				{ source: 6, target: 10, value: json.level1.no.rejected },
				{ source: 7, target: 9, value: json.level5.veto.passed },
				{ source: 7, target: 9, value: json.level4.veto.passed },
				{ source: 7, target: 9, value: json.level3.veto.passed },
				{ source: 7, target: 9, value: json.level2.veto.passed },
				{ source: 7, target: 9, value: json.level1.veto.passed },
				{ source: 7, target: 10, value: json.level5.veto.rejected },
				{ source: 7, target: 10, value: json.level4.veto.rejected },
				{ source: 7, target: 10, value: json.level3.veto.rejected },
				{ source: 7, target: 10, value: json.level2.veto.rejected },
				{ source: 7, target: 10, value: json.level1.veto.rejected },
				{ source: 8, target: 9, value: json.level5.abstain.passed },
				{ source: 8, target: 9, value: json.level4.abstain.passed },
				{ source: 8, target: 9, value: json.level3.abstain.passed },
				{ source: 8, target: 9, value: json.level2.abstain.passed },
				{ source: 8, target: 9, value: json.level1.abstain.passed },
				{ source: 8, target: 10, value: json.level5.abstain.rejected },
				{ source: 8, target: 10, value: json.level4.abstain.rejected },
				{ source: 8, target: 10, value: json.level3.abstain.rejected },
				{ source: 8, target: 10, value: json.level2.abstain.rejected },
				{ source: 8, target: 10, value: json.level1.abstain.rejected }
			]
		};

		createSankeyChart(data);
	}

	function createSankeyChart(data: { nodes: SankeyNode[]; links: SankeyLink[] }) {
		const MIN_VALUE = 500;

		data.links.forEach((link) => {
			if ([0, 1, 2, 3, 4].includes(link.source)) {
				link.value = Math.max(link.value, MIN_VALUE);
			}
		});

		data.nodes.forEach((node) => {
			let height = node.y1 - node.y0;
			if (height < MIN_VALUE) {
				let diff = MIN_VALUE - height;
				node.y1 = node.y1 + diff / 2;
				node.y0 = node.y0 - diff / 2;
			}
		});

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
			.attr('x', (d) => d.x0 ?? 0)
			.attr('y', (d) => d.y0 ?? 0)
			.attr('height', (d) => (d.y1 ?? 0) - (d.y0 ?? 0))
			.attr('width', (d) => (d.x1 ?? 0) - (d.x0 ?? 0) - 5)
			.attr('fill', (d) => {
				// 'Level'로 시작하는 노드에 특별한 색상 적용
				if (d.name.startsWith('Level')) {
					return '#191B27';
				} else if (d.name === 'No' || d.name === 'Rejected') {
					return '#E05757'; // 'No'와 'Rejected'에 대한 색상
				} else if (d.name === 'Veto' || d.name === 'Abstained') {
					return '#191B27'; // 'Veto'와 'Abstained'에 대한 색상
				}
				return 'var(--point, #267AF9)'; // 그 외 노드들에 대한 기본 색상
			})
			.attr('rx', 10)
			.attr('ry', 10)
			.on('mouseover', function (event, d) {
				if (d.name.startsWith('Level')) {
					d3.select(this).attr('fill', '#267AF9');

					// 해당 노드와 연결된 링크들의 투명도 변경
					svg.selectAll('path').attr('opacity', (link) => {
						// link.source와 link.target은 노드 객체 또는 노드 인덱스일 수 있음
						const sourceIndex = typeof link.source === 'object' ? link.source.index : link.source;
						const targetIndex = typeof link.target === 'object' ? link.target.index : link.target;

						if (sourceIndex === d.index || targetIndex === d.index) {
							return 1; // 연결된 링크는 투명도를 1로 설정
						}
						return 0.1; // 그 외 링크는 투명도를 낮춤
					});
				}

				svg.selectAll('path').attr('opacity', (link) => {
					if (typeof link.source === 'object' && link.source.index === d.index) {
						return 1;
					} else if (typeof link.target === 'object' && link.target.index === d.index) {
						return 1;
					} else {
						return 0.1;
					}
				});
			})
			.on('mouseout', function (d) {
				// 원래 색상으로 되돌리기
				d3.select(this).attr('fill', (d) => {
					if (d.name.startsWith('Level')) {
						return '#191B27';
					} else if (d.name === 'No' || d.name === 'Rejected') {
						return '#E05757';
					} else if (d.name === 'Veto' || d.name === 'Abstained') {
						return '#191B27';
					}
					return 'var(--point, #267AF9)';
				});
				svg.selectAll('path').attr('opacity', 0.2);
			});

		svg
			.append('g')
			.attr('fill', 'none')
			.selectAll('path')
			.data(links)
			.join('path')
			.attr('d', sankeyLinkHorizontal())
			.attr('stroke', (d) =>
				(typeof d.source === 'object' && d.source.name === 'No') ||
				(typeof d.target === 'object' && d.target.name === 'No')
					? '#763033'
					: (typeof d.source === 'object' && d.source.name === 'Yes') ||
						  (typeof d.target === 'object' && d.target.name === 'Yes')
						? '#174284'
						: '#7987A8'
			)
			.attr('opacity', 0.2)
			.attr('stroke-width', (d) => Math.max(1, d.width));

		svg.append('g').selectAll('text').data(nodes);

		svg
			.append('g')
			.selectAll('text.levelLabel')
			.data(nodes.filter((d) => d.name.startsWith('Level')))
			.join('text')
			.attr('class', 'levelLabel')
			.attr('x', (d) => (d.x0 ?? 0) + ((d.x1 ?? 0) - (d.x0 ?? 0)) / 2)
			.attr('y', (d) => (d.y0 ?? 0) + 30)
			.attr('text-anchor', 'middle')
			.text('Level')
			.attr('fill', 'white')
			.style('font-size', '25px');

		svg
			.append('g')
			.selectAll('text.levelNumber')
			.data(nodes.filter((d) => d.name.startsWith('Level')))
			.join('text')
			.attr('class', 'levelNumber')
			.attr('x', (d) => (d.x0 ?? 0) + ((d.x1 ?? 0) - (d.x0 ?? 0)) / 2)
			.attr('y', (d) => (d.y0 ?? 0) + 50)
			.attr('text-anchor', 'middle')
			.text((d) => d.name.split(' ')[1].padStart(2, '0'))
			.attr('fill', 'white')
			.style('font-size', '25px');

		// 다른 모든 노드들에 대한 텍스트
		svg
			.append('g')
			.selectAll('text.otherNodeText')
			.data(nodes.filter((d) => !d.name.startsWith('Level')))
			.join('text')
			.attr('class', 'otherNodeText')
			.attr('x', (d) => (d.x0 ?? 0) + 20)
			.attr('y', (d) => (d.y0 ?? 0) + 30)
			.attr('text-anchor', 'center')
			.text((d) => d.name)
			.attr('fill', 'white')
			.style('font-size', '16px');

		svg
			.append('g')
			.selectAll('text.total')
			.data(nodes.filter((d) => d.name.startsWith('Level')))
			.join('text')
			.attr('class', 'total')
			.attr('x', (d) => (d.x0 ?? 0) + ((d.x1 ?? 0) - (d.x0 ?? 0)) / 2)
			.attr('y', (d) => (d.y1 ?? 0) - 10) // 하단 위치 설정
			.attr('text-anchor', 'middle')
			.text((d) => {
				// Extract the level number from the node name
				const levelNum = d.name.split(' ')[1];
				// Access the total votes for this level from the json variable
				return json[`level${levelNum}`].total;
			})
			.attr('fill', 'white')
			.style('font-size', '25px');
	}
	function handleChainChange(event) {
		chainName = event.target.value;
		loadData(chainName);
	}
</script>

<header>
	<div class="inner-header">
		<div>Proposals</div>
		<div>Progress</div>
		<div>Result</div>
	</div>
</header>
<div class="dropdown-container">
	<select id="chain-select" on:change={handleChainChange}>
		{#each availableChains as chain}
			<option value={chain}>{chain}</option>
		{/each}
	</select>
</div>
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

	.dropdown-container {
		margin-top: 40px;

		select {
			width: 13%;
			height: 36px;
			padding: 10px;
			border-radius: 5px;
			background-color: #161b26;
			color: #afb7c0;
			border: none;
			margin-left: 35px;
			-webkit-appearance: none; /* 크롬, 사파리에서 기본 화살표 제거 */
			-moz-appearance: none; /* 파이어폭스에서 기본 화살표 제거 */
			appearance: none;
		}
		option {
			height: 30px;
		}
	}

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90vh;
	}

	#sankey-chart {
		max-width: 87%;
		height: 100%;
	}
</style>
