import { StageData } from "./types";

export const stage3: StageData = {
  id: 3,
  title: "쇼핑몰 비상탈출",
  location: "다중이용시설 (쇼핑몰)",
  description:
    "친구와 쇼핑몰 3층에서 영화를 보러 가던 중, 갑자기 비상방송이 나옵니다. '고객 여러분, 화재가 발생했습니다. 침착하게 대피해주세요.' 낯선 건물에서 안전하게 탈출하세요!",
  icon: "🏬",
  bgColor: "from-purple-400 to-pink-500",
  passingScore: 70,
  steps: [
    {
      type: "choice",
      id: "s3-step1",
      title: "비상방송 대응",
      description:
        "쇼핑몰 3층 푸드코트에서 비상방송이 들려옵니다. 주변 사람들이 웅성대기 시작합니다. 가장 먼저 해야 할 행동은?",
      situation:
        "비상방송: '화재가 발생했습니다. 가까운 비상구를 이용하여 대피해주세요.' 주변에 연기는 아직 보이지 않습니다.",
      illustration: "mall-announcement",
      choices: [
        {
          id: "a",
          text: "비상구 표시(초록색 표지판)를 찾아 위치를 확인한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "정확합니다! 다중이용시설에서는 평소 비상구 위치를 확인하는 습관이 중요합니다. 초록색 비상구 표시를 따라 이동하세요.",
        },
        {
          id: "b",
          text: "에스컬레이터를 타고 1층으로 바로 내려간다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -10,
          feedback:
            "위험합니다! 화재 시 에스컬레이터는 정지될 수 있고, 개방된 구조로 연기가 빠르게 확산됩니다. 비상계단을 이용해야 합니다.",
        },
        {
          id: "c",
          text: "쇼핑을 계속하면서 상황을 지켜본다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -20,
          feedback:
            "매우 위험합니다! 비상방송은 장난이 아닙니다. 즉시 대피를 시작해야 합니다. 연기가 보이지 않아도 신속하게 행동하세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s3-step2",
      title: "비상구 이동",
      description:
        "비상구를 향해 이동하던 중, 한쪽 통로에서 검은 연기가 밀려옵니다. 시야가 점점 좁아지고 있습니다.",
      situation:
        "쇼핑몰 내부 통로. 천장에서 스프링클러가 작동하기 시작했고, 왼쪽 통로에서 짙은 연기가 올라옵니다.",
      illustration: "mall-smoke",
      choices: [
        {
          id: "a",
          text: "연기가 오는 반대 방향으로 가면서 다른 비상구를 찾는다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "올바른 판단입니다! 연기가 있는 방향은 화재가 가까운 곳입니다. 반대 방향 비상구를 찾아 대피하세요.",
        },
        {
          id: "b",
          text: "연기를 뚫고 가장 가까운 비상구로 달려간다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -15,
          feedback:
            "위험합니다! 연기 속으로 들어가면 3~4회 호흡만으로도 의식을 잃을 수 있습니다. 항상 연기 반대 방향으로 대피하세요.",
        },
        {
          id: "c",
          text: "근처 매장 안으로 들어가 문을 닫고 숨는다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -5,
          feedback:
            "대피 경로가 완전히 막힌 것이 아니라면 계속 이동해야 합니다. 매장에 갇히면 구조가 어려워질 수 있습니다.",
        },
      ],
    },
    {
      type: "mission",
      id: "s3-step3",
      title: "연기 속 이동법",
      description: "연기 속에서 안전하게 이동하는 방법을 올바른 순서대로 배열하세요.",
      instruction: "연기 속 이동 행동을 순서대로 정렬하세요",
      missionType: "order",
      items: [
        "옷이나 손수건으로 코와 입을 막는다",
        "바닥에 가깝게 낮은 자세를 취한다",
        "벽면을 손으로 짚으며 방향을 유지한다",
        "비상구 유도등(초록불)을 따라 이동한다",
      ],
      correctOrder: [
        "옷이나 손수건으로 코와 입을 막는다",
        "바닥에 가깝게 낮은 자세를 취한다",
        "벽면을 손으로 짚으며 방향을 유지한다",
        "비상구 유도등(초록불)을 따라 이동한다",
      ],
      timeLimit: 25,
      scoreReward: 25,
      survivalDelta: -10,
      failFeedback:
        "올바른 순서: 호흡 보호 → 낮은 자세 → 벽면 따라 이동 → 유도등 따르기. 연기는 위로 올라가므로 낮은 자세가 핵심입니다!",
      successFeedback:
        "완벽합니다! 연기 속에서는 호흡 보호가 최우선이고, 낮은 자세로 벽면을 짚으며 이동하는 것이 생존의 핵심입니다.",
    },
    {
      type: "choice",
      id: "s3-step4",
      title: "비상문 앞에서",
      description:
        "비상구를 찾았지만, 비상문이 안쪽으로 밀어도 열리지 않습니다. 문 위에 '비상시 누르세요' 버튼이 보입니다.",
      situation:
        "비상구 문 앞에 도착. 문 옆에 빨간색 비상개방 버튼이 있고, 문은 밀어서 여는 푸시형입니다.",
      illustration: "emergency-door",
      choices: [
        {
          id: "a",
          text: "비상개방 버튼을 누른 후 문을 밀어 연다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "정확합니다! 다중이용시설의 비상문에는 잠금해제 버튼이 있는 경우가 많습니다. 버튼을 누르면 잠금이 해제됩니다.",
        },
        {
          id: "b",
          text: "문을 발로 차서 부순다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -10,
          feedback:
            "비상문은 매우 튼튼합니다. 발로 차서 열기 어렵고, 부상의 위험도 있습니다. 비상개방 장치를 찾아 사용하세요.",
        },
        {
          id: "c",
          text: "다른 출구를 찾으러 되돌아간다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -15,
          feedback:
            "되돌아가면 연기에 더 노출될 수 있습니다. 비상문 근처의 개방 장치를 먼저 확인하세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s3-step5",
      title: "대피 중 부상자 발견",
      description:
        "비상계단을 내려가던 중, 연기를 마셔 기침하며 움직이지 못하는 사람을 발견했습니다.",
      situation:
        "2층과 1층 사이 계단에 중년 여성이 주저앉아 심하게 기침하고 있습니다. 출구가 바로 아래 보입니다.",
      illustration: "injured-person",
      choices: [
        {
          id: "a",
          text: "부상자를 부축하여 함께 출구로 이동한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: -5,
          feedback:
            "올바른 행동입니다! 안전하게 도울 수 있는 상황이라면 부상자를 함께 대피시키는 것이 바람직합니다.",
        },
        {
          id: "b",
          text: "먼저 밖으로 나간 후 소방관에게 위치를 알린다",
          isCorrect: false,
          scoreDelta: 15,
          survivalDelta: 0,
          feedback:
            "자신의 안전 확보도 중요하지만, 출구가 가까운 상황에서 도울 수 있다면 함께 대피하는 것이 더 좋습니다. 상황에 따라 판단하세요.",
        },
        {
          id: "c",
          text: "큰 소리로 '도와주세요!'를 외치며 다른 사람을 부른다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -10,
          feedback:
            "도움을 요청하는 것도 방법이지만, 대피 중인 상황에서 멈춰서 소리치는 것은 시간을 낭비합니다. 직접 도우며 이동하세요.",
        },
      ],
    },
    {
      type: "mission",
      id: "s3-step6",
      title: "다중이용시설 안전 수칙",
      description:
        "다중이용시설 방문 시 사전에 확인해야 할 안전 수칙을 순서대로 배열하세요.",
      instruction: "시설 입장 시 확인할 사항을 순서대로 정렬하세요",
      missionType: "order",
      items: [
        "비상구 위치를 확인한다",
        "비상구까지의 경로를 파악한다",
        "소화기 위치를 확인한다",
        "비상 연락처(119)를 기억한다",
      ],
      correctOrder: [
        "비상구 위치를 확인한다",
        "비상구까지의 경로를 파악한다",
        "소화기 위치를 확인한다",
        "비상 연락처(119)를 기억한다",
      ],
      timeLimit: 20,
      scoreReward: 15,
      survivalDelta: -5,
      failFeedback:
        "다중이용시설 안전 수칙: 비상구 확인 → 경로 파악 → 소화기 확인 → 비상 연락처 기억. 건물 입장 시 꼭 확인하세요!",
      successFeedback:
        "완벽합니다! 다중이용시설 방문 시 이 순서로 안전 수칙을 확인하면 비상시 빠르게 대응할 수 있습니다.",
    },
  ],
};
