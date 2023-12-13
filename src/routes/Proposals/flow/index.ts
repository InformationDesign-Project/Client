export interface SankeyNode {
    name: string;
    x0?: number;
    x1?: number;
    y0?: number;
    y1?: number;
  }

  export interface SankeyLink {
    source: number | SankeyNode;
    target: number | SankeyNode;
    value: number;
  }