import { StageData } from "./types";

export const stage5: StageData = {
  id: 5,
  title: "산불 대피 작전",
  location: "산불 인접 지역",
  description:
    "가족과 캠핑을 왔는데, 인근 산에서 산불이 발생했습니다. 바람이 점점 강해지고, 불길이 캠핑장 방향으로 다가오고 있습니다!",
  icon: "🌲",
  bgColor: "from-green-400 to-emerald-600",
  passingScore: 70,
  steps: [
    {
      type: "choice",
      id: "s5-step1",
      title: "산불 발견",
      description:
        "캠핑장에서 바베큐를 준비하던 중, 멀리 산 능선에서 연기와 불꽃이 보입니다. 바람이 캠핑장 방향으로 불고 있습니다.",
      situation:
        "캠핑장에서 약 2km 떨어진 산 능선에서 산불이 보입니다. 바람은 시속 20km로 캠핑장 쪽을 향하고 있습니다.",
      illustration: "wildfire-spotted",
      choices: [
        {
          id: "a",
          text: "일단 상황을 지켜보면서 바베큐를 계속한다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -20,
          feedback:
            "매우 위험합니다! 산불은 바람을 타고 시속 수십 km로 확산될 수 있습니다. 2km 거리는 순식간에 좁혀질 수 있으니 즉시 대피해야 합니다.",
        },
        {
          id: "b",
          text: "즉시 119에 신고하고 캠핑장 관리자에게 알린다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "정확합니다! 산불 발견 즉시 119에 신고하고, 주변 사람들에게 알려 함께 대피를 준비해야 합니다.",
        },
        {
          id: "c",
          text: "물을 가져와 텐트 주변에 뿌려 불을 막을 준비를 한다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -15,
          feedback:
            "산불은 개인이 진화할 수 없는 규모입니다. 물을 뿌리는 것은 시간 낭비이며, 대피가 늦어지면 생명이 위험해집니다.",
        },
      ],
    },
    {
      type: "choice",
      id: "s5-step2",
      title: "대피 방향 결정",
      description:
        "119에 신고했습니다. 이제 대피해야 합니다. 바람은 북쪽에서 남쪽으로 불고, 산불은 북쪽 능선에 있습니다.",
      situation:
        "바람: 북→남 방향. 산불: 북쪽 능선. 캠핑장: 중앙. 남쪽에 강이 있고, 동쪽에 포장 도로가 있습니다.",
      illustration: "escape-direction",
      choices: [
        {
          id: "a",
          text: "바람 방향(남쪽)으로 도망간다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -15,
          feedback:
            "위험합니다! 바람 방향(남쪽)은 불이 확산되는 방향입니다. 바람의 측면(동쪽/서쪽) 방향으로 대피해야 합니다.",
        },
        {
          id: "b",
          text: "바람의 측면 방향(동쪽 도로)으로 차량을 이용해 대피한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "올바른 판단! 산불 대피는 바람의 측면(직각) 방향으로 이동하는 것이 가장 안전합니다. 포장도로로 차량 대피가 최선입니다.",
        },
        {
          id: "c",
          text: "산불 반대 방향(북쪽)으로 올라간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -20,
          feedback:
            "산 위로 올라가면 불과 만날 수 있고, 산불은 위쪽으로 더 빠르게 확산됩니다. 절대 산 위로 대피하지 마세요.",
        },
      ],
    },
    {
      type: "mission",
      id: "s5-step3",
      title: "산불 대피 수칙",
      description: "산불 발생 시 올바른 대피 행동을 순서대로 배열하세요.",
      instruction: "산불 대피 행동을 올바른 순서대로 정렬하세요",
      missionType: "order",
      items: [
        "119에 신고하고 위치를 알린다",
        "바람의 직각 방향으로 대피 경로를 정한다",
        "물에 적신 수건으로 코와 입을 막는다",
        "차량이나 도보로 신속하게 대피한다",
        "낮은 지대나 개활지로 이동한다",
      ],
      correctOrder: [
        "119에 신고하고 위치를 알린다",
        "바람의 직각 방향으로 대피 경로를 정한다",
        "물에 적신 수건으로 코와 입을 막는다",
        "차량이나 도보로 신속하게 대피한다",
        "낮은 지대나 개활지로 이동한다",
      ],
      timeLimit: 30,
      scoreReward: 25,
      survivalDelta: -10,
      failFeedback:
        "산불 대피: 119 신고 → 바람 직각 방향 → 호흡 보호 → 신속 대피 → 낮은 지대로 이동. 산불은 높은 곳으로 빠르게 번집니다!",
      successFeedback:
        "완벽합니다! 산불 대피의 핵심은 '바람의 직각 방향' + '낮은 지대'입니다.",
    },
    {
      type: "choice",
      id: "s5-step4",
      title: "차량 대피 중",
      description:
        "동쪽 도로로 차량 대피 중, 도로 양옆 나무에 불이 붙기 시작했습니다. 연기로 시야가 좁아지고 있습니다.",
      situation:
        "도로 양쪽 수풀에 불꽃이 보이고, 짙은 연기가 도로를 뒤덮기 시작합니다. 앞차가 멈춰 서 있습니다.",
      illustration: "road-fire",
      choices: [
        {
          id: "a",
          text: "차에서 내려 뛰어서 도망간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -20,
          feedback:
            "차 밖은 더 위험합니다! 산불의 복사열과 연기에 직접 노출되며, 차량보다 느리게 이동하게 됩니다.",
        },
        {
          id: "b",
          text: "창문을 모두 닫고, 에어컨을 내부순환으로 설정한 뒤 서행으로 통과한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "올바른 판단! 차량은 단기간 화염을 견딜 수 있습니다. 창문을 닫고 에어컨 내부순환으로 연기 유입을 차단한 뒤 천천히 빠져나가세요.",
        },
        {
          id: "c",
          text: "차를 세우고 불이 지나가길 기다린다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -15,
          feedback:
            "산불이 지나가는 데 수 시간이 걸릴 수 있고, 차량 연료에 인화될 위험이 있습니다. 가능하다면 서행으로 빠져나가세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s5-step5",
      title: "안전지대 도착",
      description:
        "도로를 빠져나와 넓은 개활지에 도착했습니다. 하지만 아직 연기가 자욱합니다.",
      situation:
        "넓은 공터에 차를 세웠습니다. 산불은 아직 인근에서 타고 있고, 하늘이 뿌옇습니다.",
      illustration: "open-field",
      choices: [
        {
          id: "a",
          text: "차 안에 머물며 119에 현재 위치를 다시 알린다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 5,
          feedback:
            "올바른 행동입니다! 개활지에서 차 안에 머물며 구조를 기다리는 것이 안전합니다. 정확한 위치를 다시 알려주세요.",
        },
        {
          id: "b",
          text: "산불 진화를 돕기 위해 다시 산 쪽으로 간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -25,
          feedback:
            "절대 안 됩니다! 산불 진화는 전문 소방인력의 몫입니다. 일반인이 접근하면 화상이나 질식 위험이 매우 큽니다.",
        },
        {
          id: "c",
          text: "집으로 바로 운전해서 돌아간다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -5,
          feedback:
            "연기로 시야가 좋지 않은 상황에서 장거리 운전은 위험합니다. 안전한 곳에서 대기하며 도로 상황을 확인한 후 이동하세요.",
        },
      ],
    },
    {
      type: "mission",
      id: "s5-step6",
      title: "산불 예방 수칙",
      description:
        "산에서의 화재 예방 수칙을 순서대로(중요도 순) 배열하세요.",
      instruction: "산불 예방 수칙을 중요도 순으로 정렬하세요",
      missionType: "order",
      items: [
        "입산 시 라이터/성냥 등 화기 반입 금지",
        "지정된 장소에서만 취사/야영",
        "담배꽁초 절대 투기 금지",
        "캠프파이어 후 완전 소화 확인",
      ],
      correctOrder: [
        "입산 시 라이터/성냥 등 화기 반입 금지",
        "지정된 장소에서만 취사/야영",
        "담배꽁초 절대 투기 금지",
        "캠프파이어 후 완전 소화 확인",
      ],
      timeLimit: 20,
      scoreReward: 15,
      survivalDelta: -5,
      failFeedback:
        "산불 예방: 화기 반입 금지 → 지정 장소 취사 → 담배꽁초 금지 → 캠프파이어 소화. 산불의 대부분은 사람의 부주의로 발생합니다!",
      successFeedback:
        "훌륭합니다! 산불 예방 수칙을 잘 알고 있네요. 산불의 약 90%가 인간 부주의로 발생합니다.",
    },
  ],
};
