<script>
	export let proposal;

	const calculateYesPercentage = () => {
		const yesVotes = Number(proposal.detail.voteMeta.yes);
		const noVotes = Number(proposal.detail.voteMeta.no);
		const totalVotes = yesVotes + noVotes;
		return totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;
	};

	const calculateNoPercentage = () => {
		const yesVotes = Number(proposal.detail.voteMeta.yes);
		const noVotes = Number(proposal.detail.voteMeta.no);
		const totalVotes = yesVotes + noVotes;
		return totalVotes > 0 ? (noVotes / totalVotes) * 100 : 0;
	};

	const getStatus = () => {
		switch (proposal.detail.proposal_status) {
			case 'PROPOSAL_STATUS_PASSED':
				return '/layout/Passed.png'; // 여기에 'Passed' 상태에 해당하는 이미지 경로
			case 'PROPOSAL_STATUS_REJECTED':
				return '/layout/Rejected.png'; // 여기에 'Rejected' 상태에 해당하는 이미지 경로
			default:
				return '/layout/votingPeriod.png'; // 여기에 'Voting Period' 상태에 해당하는 이미지 경로
		}
	};

	const statusLabel = getStatus();
	const statusClass = statusLabel.toLowerCase();

	const formatVotingEndTime = () => {
		const options = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		};
		return new Date(proposal.detail.voting_end_time)
			.toLocaleString('ko-KR', options)
			.replace('오전', '')
			.replace('오후', '')
			.trim();
	};
</script>

<div class="proposal-box">
	<div class="proposal-info">
		<div class="proposal-id-type">
			<div class="proposal-id">#{proposal.detail.id}</div>
			<div class="proposal-type">{proposal.detail.proposal_type}</div>
		</div>
	</div>
	<div class="proposal-title">{proposal.detail.title}</div>
	<div class="progress-bar">
		<div class="progress yes" style="width: {calculateYesPercentage()}%"></div>
		<div class="progress no" style="width: {calculateNoPercentage()}%"></div>
	</div>
	<div class="footer">
		<img src={getStatus()} alt="Proposal Status" />
		<div class="voting-end-time">Voting End on {formatVotingEndTime()}</div>
	</div>
</div>

<style lang="scss">
	.proposal-box {
		display: flex;
		flex-direction: column;
		background: #191b27;
		border-radius: 10px;
		color: white;
		margin-bottom: 20px;
		overflow: hidden;
		font-family: 'Arial', sans-serif;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		position: relative;
	}

	.proposal-info {
		padding: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.proposal-title {
		margin-left: 15px;
		margin-bottom: 15px;
		margin-top: 15px;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
	}

	.proposal-id-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: 16px;
		left: 16px;
		right: 16px;
	}

	.proposal-id {
		color: #fff;
	}

	.proposal-type {
		background-color: rgba(38, 122, 249, 0.15);
		color: #267af9;
		border-radius: 15px;
		padding: 4px 8px;
		font-size: 12px;
	}

	.proposal-status {
		display: flex;
		align-items: center;
		&.rejected .status-icon {
			background-color: #e05757;
		}
		&.passed .status-icon {
			background-color: #4cb870;
		}
		&.voting .status-icon {
			background-color: #ffbd5a;
		}
		.status-icon {
			display: inline-block;
			width: 12px;
			height: 12px;
			border-radius: 50%;
			margin-right: 8px;
		}
	}

	.progress-bar {
		margin-left: 15px;
		margin-right: 15px;
		height: 4px;
		border-radius: 5px;
		background-color: rgba(255, 255, 255, 0.2);
		position: relative;
	}

	.progress {
		position: absolute;
		border-radius: 5px;
		top: 0;
		height: 100%;
	}

	.yes {
		background-color: #4caf50;
		left: 0;
	}

	.no {
		background-color: #ec5757;
		right: 0;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		background: #161b26;
		.voting-end-time {
			font-size: 0.9rem;
			color: #7987a8;
		}
	}
</style>
