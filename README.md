# Healthy Chain : *블록체인 생태계의 건강 상태를 검진해보기*

- **목적** : 블록체인 생태계를 지속적으로 발전시키며, 참여자들에게 안정성과 투명성을 제공하여 생태계의 건강을 증진시킬 수 있다.
- **목표** :
  - **히트맵을 통한 직관적인 네트워크 건강도 파악 :**  기존 수치만 제공하거나, 개별로 보여주던 건강도 시각화와는 다르게, 모든 건강도를 한번에 모아 한 눈에 악할 수 있다.
  - **Validator의 건강도에 따른 투표율과 흐름 :** Validator들을 건강도에 따라 5단계로 그룹핑하여, 각 단계의 Validator들이 투표한 흐름을 파악하여 네트워크의 건강도를 알 수 있다.
  - **Validator와 네트워크의 방향성 일치하는 정도 파악 :** 막대차트를 통해 투표의 방향성을 파악하여 네트워크와 Vallidator의 방향성이 같은 지 다른 지 파악할 수 있다.

<br/>

## 기능 구현 리스트

<details><summary>Home</summary> 

  * 건강한 네트워크 순으로 정렬된 네트워크 선택 가능
  * 히트맵 V.P 기준 정렬, Healthy Level 기준 정렬 가능
  * 각 네트워크 별 레이더 차트 기능 구현
  * 테이블 메인뷰 - 각 라벨 클릭 시 정렬기준 변경 가능

</details>

<details><summary>Proposals Overview</summary>
  
  * 막대차트 - 해당 네트워크의 V.P, Node 기준
  * 파이차트 - 해당 네트워크의 Type 확인 가능. 마우스 오버 시 해당 타입의 투표율 확인 가능
  * 해당 네트워크의 Proposal 리스트

</details>

<details><summary>Proposals Flow</summary>
   
  * Sankey Diagram - 중간 패널 마우스 오버시 데이터의 흐름을 알 수 있음
  * 네트워크 선택 - Dropdown box를 통해 원하는 네트워크 선택 가능

</details>

</details>


<br />


## 데모 사이트

[https://healthy-chain.com](https://healthy-chain.com)
<div>


<br />

## Tech Stack

- FrontEnd : SCSS, D3js, Chartjs, JavaScript, Svelte

<br /> 


## Tools

- Figma : Design
- GitHub : Code Repository
<br />

## 커밋 컨벤션

- Feat : 새로운 기능 추가
- Fix : 오류 수정
- Style: css 수정

<br />


## 실행 방법
1. 레포지토리를 클론하신 뒤 아래 명령어를 입력하여 dependencies를 설치해 주세요.
```
npm i
```
2. 모든 dependencies의 설치를 확인하신 뒤 다음 명령어를 입력하여 Svelte Application을 실행하세요.

```
npm run dev
```
