export interface SankeyNode {
	name: string;
}

export interface SankeyLink {
	source: number;
	target: number;
	value: number;
}

let data: { nodes: SankeyNode[]; links: SankeyLink[] } = { nodes: [], links: [] };
