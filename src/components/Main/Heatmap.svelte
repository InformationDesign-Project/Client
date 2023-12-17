<script>
  import * as d3 from 'd3';

  export let data = [];

  function drawHeatmap() {
    const container = d3.select('#heatmap')
      .html('') 
      .attr('width', 600)  // 너비 조정
      .attr('height', 400); // 높이 조정

    const colorScale = d3.scaleSequential()
      .domain([1, 5])
      .interpolator(d3.interpolateBlues);

    container.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => (i % 10) * 50) // 변경된 컬럼 간격
      .attr('y', (d, i) => Math.floor(i / 10) * 40) // 변경된 행 간격
      .attr('width', 45) // 블록 너비 조정
      .attr('height', 35) // 블록 높이 조정
      .attr('fill', d => colorScale(d.level))
      .on('mouseover', (event, d) => {
        // 툴팁 구현
      });
  }

  $: if (data && data.length > 0) {
    drawHeatmap();
  }
</script>

<svg id="heatmap"></svg>

<style>
  /* 추가 스타일 */
</style>