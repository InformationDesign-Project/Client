<!-- +layout.svelte -->

<script lang="ts">
	import { onMount } from "svelte";

	let pathname='';
	const btns = [
		{
			title: 'Home',
			url: '/layout/explorer.png',
			activeUrl:'/layout/explorerActive.png',
			route: '/'
		},
		
		{
			title: 'Proposals Flow',
			url: '/layout/proposals.png',
			activeUrl:'/layout/proposalsActive.png',
			route: '/Proposals/flow'
		},
		{
			title: 'Proposals Overview',
			url: '/layout/proposalOverview.png',
			activeUrl:'/layout/proposalsOverviewActive.png',
			route: '/Proposals/overview'
		},
	];

	function navigateTo(route: string) {
		location.href = route;
	}
	onMount(()=>{
		 pathname = window.location.pathname;
    console.log("Current URL:", pathname);
	})
</script>

<main>
	<div class="wrapper">
		<div class="leftSection">
			<!-- 로고 이미지 클릭 시 메인 페이지로 이동 -->
			<div class="topSection iconBox" on:click={() => navigateTo('/')}>
				<div class="iconWrapper">
					<img width="50%;" src="/layout/Logotype.png" />
				</div>
			</div>
			<div class="bottomSection menuSection">
				{#each btns as btn}
					<div class="menuBtn" on:click={() => navigateTo(btn.route)}>
						<div class="menuInner">
							<div style="display:flex; align-items:center;">
								{#if pathname ==btn.route}
								<img width="18px;" src={btn.activeUrl} />
								<div style="margin-left:10px; font-size:14px; margin-top:2px;color:#267AF9">
									{btn.title}
								</div>
								{:else}
								<img width="18px;" src={btn.url} />
								<div style="margin-left:10px; font-size:14px; margin-top:2px;">
									{btn.title}
								</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="rightSection">
			<div class="bottomSection">
				<slot />
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	.wrapper {
		width: 100vw;
		height: 100vh;
		background-color: #090910;
		display: flex;
		flex-direction: row;
		flex: 1;
	}
	.leftSection {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
		background-color: #11141b;
	}
	.rightSection {
		display: flex;
		flex: 6;
		height: 100%;
		flex-direction: column;
	}
	.topSection {
		display: flex;
		flex: 1;
		width: 100%;
	}
	.bottomSection {
		display: flex;
		flex-direction: column;
		flex: 14;
		width: 100%;
		overflow: scroll;
		ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.iconBox {
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #191b27;
		.iconWrapper {
			width: 80%;
		}
		&:hover {
			cursor: pointer;
		}
	}
	.menuSection {
		padding: 10px 0 10px 0;
		align-items: center;
		.menuBtn {
			width: 100%;
			height: 60px;
			display: flex;
			justify-content: center;
			border-bottom: 1px solid #191b27;
			.menuInner {
				width: 80%;
				height: 60px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #7987a8;
			}
			&:hover {
				cursor: pointer;
			}
		}
	}
</style>
