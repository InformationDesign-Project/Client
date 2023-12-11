<script lang="ts">
    </script>
  
  <body>
    <div class="header">
      <div class="logo">
        <img width="70%;" src="/layout/Healthy-chain.png" alt="Healthy Chain Logo"/>
      </div>
      <div class="top-coins">
        <div class="top-coin today">
          <div class="time-period">Today</div>
          <div class="coin-name"><!-- 오늘의 최고 건강도 코인 이름 -->COSMOS</div>
          <div class="title">Best Healthy Chain Today</div>
        </div>
        <div class="top-coin month">
          <div class="time-period">Month</div>
          <div class="coin-name"><!-- 이번 달의 최고 건강도 코인 이름 -->COSMOS</div>
          <div class="title">Best Healthy Chain this Month</div>
        </div>
        <div class="top-coin year">
          <div class="time-period">Year</div>
          <div class="coin-name"><!-- 올해의 최고 건강도 코인 이름 -->COSMOS</div>
          <div class="title">Best Healthy Chain this Year</div>
        </div>
      </div>
    </div>
  
    <div class="dashboard">
        <div class="dashboard-top-line">
            <div class="dashboard-coin">COSMOS</div>
            <div class="dashboard-metric">
              <div class="metric-value">85</div> <!-- 임의의 값 -->
              <div class="metric-label">Healthy Level</div>
            </div>
            <div class="dashboard-metric">
              <div class="metric-value score">92</div> <!-- 임의의 값 -->
              <div class="metric-label">Healthy Score</div>
            </div>
            <div class="dashboard-metric">
              <div class="metric-value">76%</div> <!-- 임의의 값 -->
              <div class="metric-label">Decentralization</div>
            </div>
          </div>
        <div class="dashboard-main">
            <div class="heatmap"></div>
            <div class="sidebar">
                <div class="sorted-by">Sorted By</div>
                <div class="validators-info">
                    <div class="validators-info-item">
                      <div class="validators-info-label">Total Validators</div>
                      <div class="validators-info-number">50</div>
                    </div>
                    <div class="validators-info-item">
                      <div class="validators-info-label">Level 1</div>
                      <div class="validators-info-number">10</div>
                    </div>
                    <div class="validators-info-item">
                      <div class="validators-info-label">Level 2</div>
                      <div class="validators-info-number">15</div>
                    </div>
                    <div class="validators-info-item">
                      <div class="validators-info-label">Level 3</div>
                      <div class="validators-info-number">20</div>
                    </div>
                    <div class="validators-info-item">
                      <div class="validators-info-label">Level 4</div>
                      <div class="validators-info-number">12</div>
                    </div>
                    <div class="validators-info-item">
                      <div class="validators-info-label">Level 5</div>
                      <div class="validators-info-number">8</div>
                    </div>
                  </div>
        </div>
      </div>
  
    <div class="coin-list-section">
      <!-- 코인 목록 섹션 -->
    </div>
  </body>
  
  <style lang="scss">
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
}

.top-coin {
  background-color: #11141B;
  color: #FFFFFF; 
  padding: 28px; 
  border-radius: 10px; 
  margin: 0 15px; 
  width: 150px; 
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
.dashboard-coin{
  background-color: #161B26; 
  padding: 15px 15px; 
  border-radius: 10px; 
  width: 150px; 
  height: 50px; 

  
  font-size: 24px; 
  color: #FFFFFF; 
  
}

.sorted-by{
    font-size: 12px;
    font-style: normal;
    color: #7987A8;
}


  
.dashboard {
  display: flex;
  width: 900px; 
  height: 500px; 
  padding: 40px; 
  flex-direction: column; 
  align-items: flex-start; 
  gap: 30px; 
  flex-shrink: 0; 
  background-color: #11141B; 
  color:#fff;
  border-radius: 10px; 
  margin: 20px; 

  .dashboard-top-line {
    display: flex;
    justify-content: space-between;
    width: 85%; 
    .dashboard-metric {
    display: flex;
    flex-direction: column;
    align-items: center;

    .metric-value {
      font-size: 50px; 
      font-weight: bold; 
    }
    .metric-value.score {
  color: #267AF9; 
}

    .metric-label {
      font-size: 16px; 
      margin-top: 5px; 
      opacity: 0.6;
    }
  }
}

  .dashboard-main {
    display: flex;
    width: 100%; 



    .sidebar {
      flex-basis: 200px;
      margin-left:30px;
    }
  }
}

.validators-info-item {
  display: flex;
  flex-direction: column;
  align-items: left;
}

/* validators-info-label 스타일 */
.validators-info-label {
  font-size: 12px;
  font-weight: normal;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #7987A8;
}

.validators-info-number {
  font-size: 24px;
  font-weight: bold;
  color: #FFFFFF; 
}

.heatmap{
    display: flex;
    width: 900px; 
    height: 400px; 
    background-color: #161B26; 
    border-radius: 10px;

}


  
    .coin-list-section {
      // 코인 목록 섹션 스타일링
    }
  </style>
  