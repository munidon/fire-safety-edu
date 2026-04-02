import { StageData } from "./types";

export const stage2: StageData = {
  id: 2,
  title: "학교에서의 화재 대피",
  location: "학교 교실/복도",
  description:
    "점심시간 직후, 갑자기 화재경보가 울립니다. 선생님이 교실에 안 계신 상황. 학생으로서 올바른 대피 행동을 실천하세요!",
  icon: "🏫",
  bgColor: "from-blue-400 to-indigo-500",
  passingScore: 70,
  steps: [
    {
      type: "choice",
      id: "s2-step1",
      title: "경보 인지",
      description:
        "점심시간 후 교실에서 친구들과 이야기하던 중 화재경보가 울립니다. 선생님은 자리에 안 계십니다. 어떻게 하시겠습니까?",
      situation:
        "화재경보가 울리고, 복도에서 학생들의 웅성거리는 소리가 들립니다. 창밖으로 운동장에 모이는 학생들이 보입니다.",
      illustration: "classroom-alarm",
      choices: [
        {
          id: "a",
          text: "장난일 것이라고 생각하고 자리에 앉아있는다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -20,
          feedback:
            "매우 위험합니다! 화재경보가 울리면 장난 여부와 관계없이 반드시 대피 행동을 시작해야 합니다. 모든 경보는 실제 상황으로 간주하세요.",
        },
        {
          id: "b",
          text: "침착하게 대피 경로를 확인하고, 주변 친구들에게 대피를 알린다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "훌륭합니다! 침착하게 행동하면서 주변 사람들에게도 대피를 알리는 것이 올바른 행동입니다.",
        },
        {
          id: "c",
          text: "가방과 소지품을 챙긴 후 대피한다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -10,
          feedback:
            "소지품 챙기는 시간이 생명을 위협할 수 있습니다! 화재 시에는 소지품을 버리고 즉시 대피하세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s2-step2",
      title: "대피 경로 파악",
      description:
        "교실을 나서려 하는데 복도 오른쪽에서 연기가 올라오고 있습니다. 교실에는 비상 대피도가 붙어 있습니다.",
      situation:
        "복도 오른쪽 과학실 방향에서 연기가 피어오릅니다. 왼쪽으로 가면 중앙 계단, 뒤쪽에는 후문 비상계단이 있습니다.",
      illustration: "school-hallway",
      choices: [
        {
          id: "a",
          text: "연기가 오는 반대 방향(왼쪽 중앙 계단)으로 대피한다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -5,
          feedback:
            "연기 반대 방향으로 가는 것은 좋은 판단이지만, 중앙 계단은 많은 학생이 몰릴 수 있습니다. 비상계단을 우선 이용하는 것이 더 안전합니다.",
        },
        {
          id: "b",
          text: "비상 대피도를 확인하고 후문 비상계단으로 대피한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "정확합니다! 비상 대피도를 확인하고 비상계단을 이용하는 것이 가장 안전합니다. 평소에 비상구 위치를 파악해두세요.",
        },
        {
          id: "c",
          text: "과학실에서 불이 났는지 확인하러 간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -25,
          feedback:
            "절대 화재 현장을 확인하러 가지 마세요! 폭발이나 유독가스에 노출될 수 있어 매우 위험합니다.",
        },
      ],
    },
    {
      type: "mission",
      id: "s2-step3",
      title: "올바른 대피 자세",
      description: "화재 대피 시 올바른 행동 순서를 맞춰보세요.",
      instruction: "학교 화재 대피 행동을 올바른 순서대로 정렬하세요",
      missionType: "order",
      items: [
        "화재경보 확인 즉시 대피 결정",
        "손수건이나 옷으로 코와 입을 막기",
        "낮은 자세로 비상구 방향 이동",
        "뛰지 않고 질서 있게 계단 하강",
        "지정된 대피 장소(운동장)에 집합",
      ],
      correctOrder: [
        "화재경보 확인 즉시 대피 결정",
        "손수건이나 옷으로 코와 입을 막기",
        "낮은 자세로 비상구 방향 이동",
        "뛰지 않고 질서 있게 계단 하강",
        "지정된 대피 장소(운동장)에 집합",
      ],
      timeLimit: 30,
      scoreReward: 25,
      survivalDelta: -10,
      failFeedback:
        "올바른 순서: 대피 결정 → 호흡 보호 → 낮은 자세 이동 → 질서 있는 하강 → 집합 장소 모임. 단계별로 기억하세요!",
      successFeedback:
        "완벽합니다! 학교 화재 대피 절차를 정확히 알고 있네요. 평소 소방훈련과 같은 순서입니다.",
    },
    {
      type: "choice",
      id: "s2-step4",
      title: "계단 대피 중 상황",
      description:
        "비상계단을 내려가던 중, 아래층 친구가 넘어져 다리를 다쳤습니다. 뒤에서 다른 학생들이 밀려옵니다.",
      situation:
        "3층에서 2층으로 내려가는 계단에서 앞의 학생이 쓰러졌습니다. 연기가 점점 짙어지고 있습니다.",
      illustration: "stairway-fall",
      choices: [
        {
          id: "a",
          text: "쓰러진 친구를 넘어 먼저 대피한다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -5,
          feedback:
            "다친 친구를 도울 수 있는 상황이라면 함께 대피하는 것이 바람직합니다. 하지만 연기가 매우 짙다면 자신의 안전을 먼저 확보한 후 구조 요청을 해야 합니다.",
        },
        {
          id: "b",
          text: "친구를 부축하면서 함께 대피하고, 뒤 학생들에게 천천히 가라고 알린다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "훌륭합니다! 다친 친구를 돕는 동시에 뒤 학생들에게 질서를 유지하도록 알리는 것이 가장 좋은 행동입니다.",
        },
        {
          id: "c",
          text: "계단에 멈춰서 친구의 다리 상태를 자세히 확인한다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -15,
          feedback:
            "화재 대피 중에는 멈추면 안 됩니다! 연기 흡입 위험이 커지고, 뒤의 학생들도 위험해집니다. 먼저 안전한 곳으로 이동 후 응급처치하세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s2-step5",
      title: "대피 완료 후",
      description:
        "운동장 대피 장소에 도착했습니다. 반 친구 중 한 명이 아직 보이지 않습니다. 어떻게 하시겠습니까?",
      situation:
        "운동장에서 인원 확인 중, 같은 반 민수가 보이지 않습니다. 건물에서 연기가 피어오르고 있습니다.",
      illustration: "playground-gather",
      choices: [
        {
          id: "a",
          text: "민수를 찾으러 다시 건물 안으로 들어간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -25,
          feedback:
            "절대 건물에 다시 들어가면 안 됩니다! 연기와 화재로 매우 위험합니다. 소방관에게 알려 전문 구조를 요청하세요.",
        },
        {
          id: "b",
          text: "선생님이나 소방관에게 민수가 없다고 즉시 알린다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 5,
          feedback:
            "정확합니다! 미처 대피하지 못한 사람이 있다면 반드시 소방관이나 선생님에게 알려 전문 구조팀이 수색하도록 해야 합니다.",
        },
        {
          id: "c",
          text: "민수에게 전화해서 어디 있는지 확인한다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -5,
          feedback:
            "전화 시도 자체는 나쁘지 않지만, 건물 내에서 전화를 받기 어려울 수 있고 시간이 지체됩니다. 즉시 소방관에게 알리는 것이 우선입니다.",
        },
      ],
    },
    {
      type: "mission",
      id: "s2-step6",
      title: "119 신고 연습",
      description:
        "119 신고 시 전달해야 할 정보를 올바른 순서대로 배열하세요.",
      instruction: "119 신고 시 전달 순서를 정렬하세요",
      missionType: "order",
      items: [
        "화재 발생을 알린다",
        "정확한 주소와 건물 이름을 말한다",
        "화재 위치(몇 층, 어디)를 알린다",
        "대피하지 못한 사람 유무를 알린다",
      ],
      correctOrder: [
        "화재 발생을 알린다",
        "정확한 주소와 건물 이름을 말한다",
        "화재 위치(몇 층, 어디)를 알린다",
        "대피하지 못한 사람 유무를 알린다",
      ],
      timeLimit: 25,
      scoreReward: 15,
      survivalDelta: -5,
      failFeedback:
        "119 신고 순서: 화재 발생 알림 → 주소 → 화재 위치 → 미대피자 정보. 침착하게 이 순서로 전달하세요!",
      successFeedback:
        "훌륭합니다! 119 신고 시 이 순서대로 침착하게 정보를 전달하면 소방대의 신속한 출동에 큰 도움이 됩니다.",
    },
  ],
};
