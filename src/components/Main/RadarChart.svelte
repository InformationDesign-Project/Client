<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let data;
  
    let chart = null;
    let chartCanvas; // Svelte binding for the canvas element
  
    onMount(() => {
      if (data && chartCanvas) {
        // 데이터셋의 수치를 라벨 아래에 표시하기 위해 map 함수를 사용합니다.
        const formattedData = [
          data.average_participation,
          data.average_windowMissCount,
          data.average_commissionScore,
          data.average_totalScore,
          data.Decentralization,
          data.HealthyScore
        ].map(Math.round); // 소수점 제거
  
        chart = new Chart(chartCanvas.getContext('2d'), {
          type: 'radar',
          data: {
            labels: [
              '참가율 점수',
              '미스블록 점수',
              '커미션 점수',
              '전체 점수',
              '탈중화율 점수',
              '건강도 점수'
            ],
            datasets: [{
              label: 'Chain Metrics',
              data: formattedData,
              fill: true,
              backgroundColor: 'rgba(38, 122, 249, 0.2)', // Soft blue with transparency
              borderColor: '#267AF9', // Solid blue
              pointBorderColor: '#7987A8',
              pointBackgroundColor: '#267AF9',
              pointHoverBackgroundColor: '#ffffff',
              pointHoverBorderColor: '#267AF9',
            }]
          },
          options: {
            scales: {
              r: {
                angleLines: {
                  color: 'rgba(255, 255, 255, 0.5)' // Lighter lines for the angles
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.2)' // Softer grid lines
                },
                pointLabels: {
                  color: '#7987A8', // 라벨 색상 설정
                  font: {
                    size: 10, // 라벨 글꼴 크기 설정
                  }
                },
                ticks: {
                  backdropColor: 'transparent', // 틱 배경 색상 투명하게 설정
                  callback: function(value, index) {
                    // 라벨 아래에 실제 데이터 값을 표시합니다.
                    if (index === formattedData.length) return '';
                    return ``;
                  },
                  color: '#fff', // 틱(수치)의 글꼴 색상 설정
                }
              }
            },
            plugins: {
              legend: {
                display: false // 레이더 차트의 라벨을 숨깁니다.
              },
              tooltip: {
                // Customize tooltip (this is optional and can be removed if you like the default style)
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                  size: 16,
                  weight: 'bold'
                },
                bodyFont: {
                  size: 14
                },
                displayColors: false
              }
            }
          }
        });
      }
    });
  </script>
  
  <div class="chart-container">
    <canvas bind:this={chartCanvas} class="radar-chart"></canvas>
  </div>
  
  <style lang="scss">
    .chart-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #11141B;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2); // Optional shadow for a "lifted card" look
      width: fit-content; // Ensures the div only takes up as much space as needed
    }
  
    .radar-chart {
      max-width: 230px;
      max-height: 230px;
    }
  </style>