import { StageData } from "./types";

export const stage1: StageData = {
  id: 1,
  title: "집에서 불이 나면?",
  location: "가정 (아파트)",
  description:
    "늦은 밤, 아파트에서 잠을 자고 있던 중 화재경보기가 울립니다. 연기 냄새가 나기 시작합니다. 올바른 판단으로 안전하게 대피하세요!",
  icon: "🏠",
  bgColor: "from-orange-400 to-red-500",
  passingScore: 70,
  steps: [
    {
      type: "choice",
      id: "s1-step1",
      title: "화재 인지",
      description:
        "새벽 2시, 화재경보기가 울리고 복도에서 연기 냄새가 납니다. 가장 먼저 해야 할 행동은?",
      situation:
        "잠에서 깬 당신. 화재경보기가 계속 울리고, 문틈 사이로 연기가 보이기 시작합니다.",
      illustration: "bedroom-alarm",
      choices: [
        {
          id: "a",
          text: "즉시 현관문을 열고 밖으로 뛰어나간다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -15,
          feedback:
            "위험합니다! 문을 열기 전에 반드시 문 손잡이의 온도를 확인해야 합니다. 복도에 불이 번져 있을 수 있습니다.",
        },
        {
          id: "b",
          text: "문 손잡이를 만져 온도를 확인한 후 상황을 판단한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "정확합니다! 문 손잡이가 뜨겁다면 복도에 불이 있다는 의미입니다. 이 경우 다른 탈출 경로를 찾아야 합니다.",
        },
        {
          id: "c",
          text: "다시 이불을 덮고 소방차가 올 때까지 기다린다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -30,
          feedback:
            "매우 위험합니다! 화재 시 연기는 빠르게 퍼지며, 대부분의 화재 사망 원인은 연기 흡입입니다. 즉시 대피 행동을 시작해야 합니다.",
        },
      ],
    },
    {
      type: "choice",
      id: "s1-step2",
      title: "119 신고",
      description:
        "문 손잡이가 뜨겁지 않아 복도로 나왔습니다. 연기가 점점 짙어지고 있습니다. 다음 행동은?",
      situation:
        "복도에 연기가 차오르고 있지만 아직 시야 확보가 가능합니다. 핸드폰을 들고 있습니다.",
      illustration: "hallway-smoke",
      choices: [
        {
          id: "a",
          text: "먼저 119에 전화한 후 대피를 시작한다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -5,
          feedback:
            "신고도 중요하지만, 연기가 차오르는 상황에서는 대피를 먼저 시작하면서 동시에 119에 신고하는 것이 더 안전합니다.",
        },
        {
          id: "b",
          text: "대피하면서 119에 전화해 주소와 상황을 알린다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "올바른 판단입니다! 대피와 동시에 119 신고를 하면 시간을 절약할 수 있습니다. 주소, 층수, 화재 위치를 알려주세요.",
        },
        {
          id: "c",
          text: "불이 어디서 났는지 확인하러 간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -20,
          feedback:
            "절대 하면 안 됩니다! 화재 현장을 확인하려다 연기에 갇히거나 폭발에 노출될 수 있습니다. 즉시 대피가 최우선입니다.",
        },
      ],
    },
    {
      type: "mission",
      id: "s1-step3",
      title: "대피 준비",
      description: "안전하게 대피하기 위한 행동을 올바른 순서대로 배열하세요.",
      instruction: "아래 행동들을 올바른 순서로 정렬하세요",
      missionType: "order",
      items: [
        "젖은 수건으로 코와 입을 막는다",
        "자세를 최대한 낮춘다",
        "비상계단을 향해 이동한다",
        "문을 닫으며 대피한다",
      ],
      correctOrder: [
        "젖은 수건으로 코와 입을 막는다",
        "자세를 최대한 낮춘다",
        "비상계단을 향해 이동한다",
        "문을 닫으며 대피한다",
      ],
      timeLimit: 30,
      scoreReward: 25,
      survivalDelta: -10,
      failFeedback:
        "순서가 틀렸습니다. 먼저 호흡 보호(젖은 수건) → 자세 낮추기 → 이동 → 문 닫기 순서가 올바릅니다.",
      successFeedback:
        "완벽합니다! 호흡 보호 → 자세 낮추기 → 이동 → 문 닫기는 화재 대피의 핵심 순서입니다.",
    },
    {
      type: "choice",
      id: "s1-step4",
      title: "대피 경로 선택",
      description:
        "비상계단으로 향하는 중, 계단에도 연기가 차 있습니다. 어떻게 하시겠습니까?",
      situation:
        "비상계단 문을 열었더니 아래층에서 올라오는 연기가 보입니다. 현재 15층에 있습니다.",
      illustration: "stairway-smoke",
      choices: [
        {
          id: "a",
          text: "연기를 뚫고 빠르게 계단을 내려간다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -20,
          feedback:
            "위험합니다! 연기가 가득한 계단은 질식 위험이 매우 높습니다. 2~3층만 내려가도 의식을 잃을 수 있습니다.",
        },
        {
          id: "b",
          text: "엘리베이터를 타고 1층으로 내려간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -25,
          feedback:
            "절대 금지! 화재 시 엘리베이터는 정전으로 멈출 수 있고, 엘리베이터 통로가 굴뚝 역할을 해 연기가 급속히 유입됩니다.",
        },
        {
          id: "c",
          text: "집으로 돌아가 문을 닫고 젖은 수건으로 틈새를 막은 후 구조를 요청한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "올바른 판단입니다! 대피 경로가 막힌 경우, 실내에서 문틈을 막고 창문을 통해 구조를 요청하는 것이 안전합니다.",
        },
      ],
    },
    {
      type: "choice",
      id: "s1-step5",
      title: "구조 요청",
      description:
        "집으로 돌아와 문틈을 막았습니다. 이제 구조 요청을 해야 합니다. 가장 효과적인 방법은?",
      situation:
        "베란다로 나가 구조를 기다리고 있습니다. 아래에서 소방차 사이렌이 들립니다.",
      illustration: "balcony-rescue",
      choices: [
        {
          id: "a",
          text: "창문을 열어 큰 소리로 도움을 요청하고, 밝은 색 천을 흔든다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 5,
          feedback:
            "정확합니다! 밝은 색 천(시트, 수건 등)을 흔들면 소방대원이 위치를 빠르게 파악할 수 있습니다.",
        },
        {
          id: "b",
          text: "베란다에서 아래로 뛰어내린다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -30,
          feedback:
            "매우 위험합니다! 15층에서 뛰어내리면 생존이 불가능합니다. 소방대의 구조를 기다리세요.",
        },
        {
          id: "c",
          text: "집안의 물건을 아래로 던져 관심을 끈다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -10,
          feedback:
            "위험할 수 있습니다. 아래에 있는 사람이 다칠 수 있고, 효과적이지 않습니다. 밝은 천을 흔들거나 119에 정확한 위치를 알리세요.",
        },
      ],
    },
    {
      type: "mission",
      id: "s1-step6",
      title: "소화기 사용법",
      description:
        "보너스 미션! 소화기 사용 4단계를 올바른 순서대로 배열하세요.",
      instruction: "소화기 사용법을 순서대로 정렬하세요",
      missionType: "order",
      items: [
        "안전핀을 뽑는다",
        "호스를 불쪽으로 향하게 잡는다",
        "손잡이를 힘껏 움켜쥔다",
        "빗자루로 쓸 듯이 분사한다",
      ],
      correctOrder: [
        "안전핀을 뽑는다",
        "호스를 불쪽으로 향하게 잡는다",
        "손잡이를 힘껏 움켜쥔다",
        "빗자루로 쓸 듯이 분사한다",
      ],
      timeLimit: 20,
      scoreReward: 15,
      survivalDelta: -5,
      failFeedback:
        "소화기 사용법: 안전핀 뽑기 → 호스 조준 → 손잡이 움켜쥐기 → 빗자루 쓸 듯 분사. 이 순서를 꼭 기억하세요!",
      successFeedback:
        "완벽합니다! '안전핀 → 호스 → 손잡이 → 분사' 4단계를 정확히 알고 있네요!",
    },
  ],
};
