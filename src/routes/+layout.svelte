<!-- +layout.svelte -->

<script>
    import Header from "../components/Header/Header.svelte";
    const btns= [
      {
        title:'EXPLORER',
        url:'/layout/explorer.png',
        fnc:''
      },
      {
        title:'OVERVIEW',
        url:'/layout/overview.png',
        fnc:''
      },
      {
        title:'PROPOSALS',
        url:'/layout/proposals.png',
        fnc:''
      },
      {
        title:'HEALTHY STATUS',
        url:'/layout/healthyStatus.png',
        fnc:''
      },



    ]
  </script>


<main>
  <div class="wrapper">
    <div class="leftSection">
      <div class='topSection iconBox'>
        <div class="iconWrapper">
          <img width="50%;" src="/layout/Logotype.png"/>
        </div>
      </div>
      <div class='bottomSection menuSection'>
        {#each btns as btn}
        <div class='menuBtn'>
          <div class='menuInner'>
            <div style="display:flex; align-items:center;">
              <img width="18px;" src={btn.url}/>
              <div style='margin-left:10px; fons-size:14px; margin-top:2px;'>{btn.title}</div>
            </div>
          </div>
        </div>
          {/each}
       
        
      </div>
    </div>
    <div class="rightSection">
      <div class='topSection'>
      </div>
      <div class='bottomSection'>
        <slot />
      </div>
    </div>
  </div>
</main>


<style lang="scss">
  .wrapper{
    width:100vw;
    height:100vh;
    background-color: #090910;
    display:flex;
    flex-direction: row;
    flex:1;
  }
  .leftSection{
    display: flex;
    flex-direction: column;
    flex:1;
    height:100%;
    background-color: #11141B;



  }
  .rightSection{
    display: flex;
    flex:6;
    height:100%;
    flex-direction: column;

  }
  .topSection{
    display: flex;
    flex:1;
    width:100%;
  }
  .bottomSection{
    display: flex;
    flex-direction: column;
    flex:14;
    width:100%;
  }
  .iconBox{
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #191B27;
      .iconWrapper{
      width:80%;
    }
  }
  .menuSection{
    padding: 10px 0 10px 0;
    align-items: center;
    .menuBtn{
      width:100%;
      height:60px;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #191B27;
      .menuInner{
        width:80%;
        height:60px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        color:#7987A8;
      }
    }
  }
  
</style>