import { StageData } from "./types";

export const stage4: StageData = {
  id: 4,
  title: "고층 건물 탈출",
  location: "고층 건물/엘리베이터",
  description:
    "학원이 있는 20층 건물에서 화재가 발생했습니다. 엘리베이터와 계단, 옥상 중 올바른 판단으로 안전하게 탈출하세요!",
  icon: "🏢",
  bgColor: "from-amber-400 to-orange-500",
  passingScore: 70,
  steps: [
    {
      type: "choice",
      id: "s4-step1",
      title: "고층 화재 인지",
      description:
        "15층 학원에서 수업 중, 복도에서 '띵동' 화재경보음이 울립니다. 창문 밖으로 아래층에서 연기가 피어오르는 것이 보입니다.",
      situation:
        "15층 학원 교실. 화재경보가 울리고, 아래 8~10층 부근에서 검은 연기가 올라옵니다. 엘리베이터 홀이 바로 앞에 있습니다.",
      illustration: "highrise-alarm",
      choices: [
        {
          id: "a",
          text: "엘리베이터를 타고 1층으로 빠르게 내려간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -30,
          feedback:
            "절대 금지! 화재 시 엘리베이터는 화재층에서 멈추거나, 정전으로 갇힐 수 있습니다. 엘리베이터 통로가 굴뚝 역할을 해 연기가 급속 유입됩니다.",
        },
        {
          id: "b",
          text: "비상계단으로 이동하되, 계단의 연기 상태를 먼저 확인한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "정확합니다! 비상계단으로 가되, 문을 열기 전 문 손잡이 온도를 확인하고, 연기가 차 있는지 살펴야 합니다.",
        },
        {
          id: "c",
          text: "옥상으로 올라가서 헬기 구조를 기다린다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -10,
          feedback:
            "옥상 대피는 최후의 수단입니다. 옥상문이 잠겨있을 수 있고, 연기가 옥상까지 올라올 수 있습니다. 아래로의 대피가 우선입니다.",
        },
      ],
    },
    {
      type: "choice",
      id: "s4-step2",
      title: "계단 연기 상황",
      description:
        "비상계단 문을 조심히 열었더니, 아래에서 연기가 올라오고 있습니다. 위쪽은 아직 맑습니다.",
      situation:
        "비상계단 내부. 아래 12층 부근부터 회색 연기가 보입니다. 위로는 시야가 확보됩니다. 현재 15층입니다.",
      illustration: "stairwell-decision",
      choices: [
        {
          id: "a",
          text: "숨을 참고 연기를 뚫어서 빠르게 1층까지 내려간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -25,
          feedback:
            "매우 위험합니다! 연기 속에서 숨을 참아도 피부와 눈을 통해 유독가스가 흡수됩니다. 15층에서 1층까지 내려가는 동안 의식을 잃을 수 있습니다.",
        },
        {
          id: "b",
          text: "학원으로 돌아가 문틈을 막고 창문을 통해 구조 요청한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "올바른 판단! 아래로 대피가 어려우면 실내로 돌아가 문틈을 젖은 수건으로 막고, 119에 정확한 위치를 알려 구조를 요청하세요.",
        },
        {
          id: "c",
          text: "옥상으로 올라간다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -10,
          feedback:
            "옥상문이 잠겨 있을 수 있으며, 연기가 올라올 수 있습니다. 실내 대피(문틈 막기 + 구조 요청)가 더 안전한 방법입니다.",
        },
      ],
    },
    {
      type: "mission",
      id: "s4-step3",
      title: "실내 대피 절차",
      description: "고층 건물에서 대피 경로가 막혔을 때 실내 대피 절차를 배열하세요.",
      instruction: "실내 대피 행동을 올바른 순서로 정렬하세요",
      missionType: "order",
      items: [
        "방 안으로 돌아가 문을 닫는다",
        "젖은 수건/옷으로 문틈 아래를 막는다",
        "119에 전화해 정확한 위치(건물명, 층, 호실)를 알린다",
        "창문에 밝은 천을 내걸어 위치를 알린다",
      ],
      correctOrder: [
        "방 안으로 돌아가 문을 닫는다",
        "젖은 수건/옷으로 문틈 아래를 막는다",
        "119에 전화해 정확한 위치(건물명, 층, 호실)를 알린다",
        "창문에 밝은 천을 내걸어 위치를 알린다",
      ],
      timeLimit: 25,
      scoreReward: 25,
      survivalDelta: -10,
      failFeedback:
        "실내 대피 순서: 문 닫기 → 문틈 막기 → 119 신고 → 위치 알리기. 이 절차가 고층 화재 시 생존 확률을 크게 높입니다.",
      successFeedback:
        "완벽합니다! 고층 건물에서 대피가 불가능할 때 이 실내 대피 절차는 생명을 지키는 핵심입니다.",
    },
    {
      type: "choice",
      id: "s4-step4",
      title: "구조 대기 중",
      description:
        "문틈을 막고 119에 신고했습니다. 구조를 기다리는 중 연기가 문틈으로 조금씩 들어옵니다.",
      situation:
        "방 안에서 대기 중. 문틈 사이로 연기가 미세하게 새어 들어오고, 바깥에서 소방차 소리가 들립니다.",
      illustration: "waiting-rescue",
      choices: [
        {
          id: "a",
          text: "젖은 수건을 다시 단단히 막고, 창가에서 낮은 자세로 신선한 공기를 확보한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 5,
          feedback:
            "올바른 행동입니다! 창가에서 바깥 공기를 확보하면서 낮은 자세를 유지하면 연기 흡입을 최소화할 수 있습니다.",
        },
        {
          id: "b",
          text: "패닉 상태로 창문 밖으로 매달린다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -20,
          feedback:
            "매우 위험합니다! 15층에서 창문에 매달리면 추락 위험이 큽니다. 침착하게 실내에서 구조를 기다리세요.",
        },
        {
          id: "c",
          text: "복도로 나가 다시 탈출을 시도한다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -15,
          feedback:
            "이미 복도에 연기가 가득 차 있는 상황입니다. 다시 나가면 연기에 질식할 위험이 높습니다. 실내에서 구조를 기다리세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s4-step5",
      title: "소방관 도착",
      description:
        "소방관이 인근 층에 도착했다는 안내가 들립니다. 창문으로 소방 사다리차가 보입니다.",
      situation:
        "소방관이 건물 내에서 구조 활동 중입니다. 창밖에 사다리차가 배치되어 있습니다.",
      illustration: "firefighter-arrival",
      choices: [
        {
          id: "a",
          text: "소방관의 지시를 따라 침착하게 구조를 기다린다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 5,
          feedback:
            "정확합니다! 소방관의 전문적인 지시에 따르는 것이 가장 안전합니다. 침착하게 대기하세요.",
        },
        {
          id: "b",
          text: "소방관이 오기 전에 스스로 사다리를 내려간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -20,
          feedback:
            "사다리 조작은 전문 훈련이 필요합니다. 임의로 이동하면 추락 위험이 있으므로 반드시 소방관의 안내를 받으세요.",
        },
        {
          id: "c",
          text: "창문을 모두 열어 환기시킨다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -10,
          feedback:
            "창문을 크게 열면 외부 공기 유입으로 화재가 더 확산될 수 있습니다. 산소 공급이 되어 불이 더 강해질 수 있으니 주의하세요.",
        },
      ],
    },
    {
      type: "mission",
      id: "s4-step6",
      title: "엘리베이터 vs 계단 퀴즈",
      description:
        "화재 시 엘리베이터가 위험한 이유를 올바른 순서(위험도 순)로 배열하세요.",
      instruction: "엘리베이터 위험 요소를 위험도가 높은 순서대로 정렬하세요",
      missionType: "order",
      items: [
        "정전 시 엘리베이터 내 갇힘",
        "엘리베이터 통로가 굴뚝 역할 → 연기 급속 유입",
        "화재층에서 문이 자동으로 열릴 수 있음",
        "고온으로 케이블 손상 → 추락 위험",
      ],
      correctOrder: [
        "정전 시 엘리베이터 내 갇힘",
        "엘리베이터 통로가 굴뚝 역할 → 연기 급속 유입",
        "화재층에서 문이 자동으로 열릴 수 있음",
        "고온으로 케이블 손상 → 추락 위험",
      ],
      timeLimit: 25,
      scoreReward: 15,
      survivalDelta: -5,
      failFeedback:
        "엘리베이터 위험 요소: 갇힘 → 연기 유입 → 화재층 문 열림 → 케이블 손상. 화재 시 엘리베이터는 절대 타지 마세요!",
      successFeedback:
        "훌륭합니다! 화재 시 엘리베이터의 모든 위험 요소를 정확히 이해하고 있네요.",
    },
  ],
};
