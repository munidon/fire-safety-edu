import { StageData } from "./types";

export const stage6: StageData = {
  id: 6,
  title: "최종 종합 시나리오",
  location: "종합 상황",
  description:
    "대형 복합건물에서 화재가 발생했습니다. 지금까지 배운 모든 지식을 총동원하여 복합 상황에 대응하세요! 구조 요청부터 응급처치까지 종합 평가입니다.",
  icon: "🔥",
  bgColor: "from-red-500 to-rose-600",
  passingScore: 75,
  steps: [
    {
      type: "choice",
      id: "s6-step1",
      title: "복합 화재 발생",
      description:
        "대형 복합건물 5층 식당가에서 가스 폭발음이 들립니다. 정전이 되면서 비상등만 켜졌습니다. 주변에 많은 사람들이 공황 상태입니다.",
      situation:
        "5층 식당가. 큰 폭발음 후 정전. 비상등만 켜져 있고, 스프링클러가 작동합니다. 사람들이 소리를 지르며 뛰어다닙니다.",
      illustration: "complex-fire",
      choices: [
        {
          id: "a",
          text: "주변 사람들에게 '침착하세요! 비상구를 따라 이동합시다'라고 외치며 리드한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "올바른 리더십입니다! 패닉 상황에서 침착한 목소리로 방향을 제시하면 많은 사람을 구할 수 있습니다.",
        },
        {
          id: "b",
          text: "혼자 빠르게 비상구를 향해 뛴다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -5,
          feedback:
            "자기 보호도 중요하지만, 패닉 상황에서 혼자 뛰면 군중 압사의 원인이 될 수 있습니다. 침착하게 행동하세요.",
        },
        {
          id: "c",
          text: "폭발이 일어난 곳을 확인하러 간다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -25,
          feedback:
            "절대 금지! 가스 폭발 현장은 2차 폭발 위험이 있습니다. 즉시 반대 방향으로 대피하세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s6-step2",
      title: "정전 속 이동",
      description:
        "비상등만 켜진 어두운 복도. 바닥에 비상 유도선(축광 테이프)이 보입니다. 연기가 천장부터 내려오고 있습니다.",
      situation:
        "어두운 복도. 천장에서 연기가 내려오고, 바닥의 축광 유도선이 초록빛으로 빛나고 있습니다.",
      illustration: "dark-corridor",
      choices: [
        {
          id: "a",
          text: "핸드폰 손전등을 켜고 서서 걸어간다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -10,
          feedback:
            "서서 이동하면 천장에서 내려오는 연기를 더 많이 마시게 됩니다. 낮은 자세로 이동해야 합니다.",
        },
        {
          id: "b",
          text: "바닥의 축광 유도선을 따라 낮은 자세로 이동한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 0,
          feedback:
            "정확합니다! 축광 유도선은 정전 시에도 비상구 방향을 안내합니다. 낮은 자세로 따라가세요.",
        },
        {
          id: "c",
          text: "벽에 기대어 서서 천천히 더듬어 이동한다",
          isCorrect: false,
          scoreDelta: 10,
          survivalDelta: -5,
          feedback:
            "벽을 짚는 것은 좋지만, 낮은 자세를 취하지 않으면 연기 흡입 위험이 큽니다. 자세를 낮추고 이동하세요.",
        },
      ],
    },
    {
      type: "mission",
      id: "s6-step3",
      title: "종합 대피 절차",
      description: "복합건물 화재 시 종합 대피 절차를 배열하세요.",
      instruction: "복합건물 화재 대피 절차를 올바른 순서로 정렬하세요",
      missionType: "order",
      items: [
        "화재 인지 즉시 비상벨 또는 119 신고",
        "젖은 천으로 코와 입 보호",
        "비상 유도등/축광 테이프를 따라 낮은 자세로 이동",
        "비상계단으로 대피 (엘리베이터 사용 금지)",
        "건물 밖 안전한 장소에서 인원 확인",
      ],
      correctOrder: [
        "화재 인지 즉시 비상벨 또는 119 신고",
        "젖은 천으로 코와 입 보호",
        "비상 유도등/축광 테이프를 따라 낮은 자세로 이동",
        "비상계단으로 대피 (엘리베이터 사용 금지)",
        "건물 밖 안전한 장소에서 인원 확인",
      ],
      timeLimit: 30,
      scoreReward: 25,
      survivalDelta: -10,
      failFeedback:
        "종합 대피: 신고 → 호흡 보호 → 유도등 따라 이동 → 비상계단 대피 → 인원 확인. 모든 단계를 순서대로 기억하세요!",
      successFeedback:
        "완벽합니다! 복합건물 화재 대피의 전 과정을 정확히 수행했습니다!",
    },
    {
      type: "choice",
      id: "s6-step4",
      title: "부상자 응급처치",
      description:
        "건물 밖으로 대피한 후, 함께 나온 사람 중 팔에 화상을 입은 사람이 있습니다. 구급차가 오기 전 응급처치를 해야 합니다.",
      situation:
        "한 남성이 팔에 2도 화상(물집)을 입었습니다. 근처에 생수와 깨끗한 천이 있습니다. 구급차는 10분 후 도착 예정입니다.",
      illustration: "burn-treatment",
      choices: [
        {
          id: "a",
          text: "화상 부위에 된장/소주를 바른다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -15,
          feedback:
            "절대 하면 안 됩니다! 된장, 소주, 치약, 얼음 등을 바르면 감염 위험이 높아지고 치료가 어려워집니다.",
        },
        {
          id: "b",
          text: "흐르는 깨끗한 물로 20분 이상 식힌 후 깨끗한 천으로 가볍게 덮는다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 5,
          feedback:
            "정확합니다! 화상 응급처치의 핵심은 깨끗한 물로 충분히 식히는 것입니다. 물집은 터뜨리지 마세요.",
        },
        {
          id: "c",
          text: "물집을 터뜨린 후 붕대로 꽉 감싼다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -10,
          feedback:
            "물집을 터뜨리면 감염 위험이 매우 높아집니다. 물집은 자연 보호막 역할을 하므로 절대 터뜨리지 마세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s6-step5",
      title: "연기 흡입 환자",
      description:
        "또 다른 사람이 연기를 많이 마셔 기침을 하며 어지러워합니다. 의식은 있지만 호흡이 거칠어지고 있습니다.",
      situation:
        "여성이 바닥에 앉아 심하게 기침하고 있습니다. 얼굴이 그을려 있고, 호흡이 가빠 보입니다.",
      illustration: "smoke-inhalation",
      choices: [
        {
          id: "a",
          text: "환자를 눕히고 물을 마시게 한다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -10,
          feedback:
            "연기 흡입 환자를 눕히면 기도가 막힐 수 있고, 물을 마시면 기도로 들어갈 위험이 있습니다.",
        },
        {
          id: "b",
          text: "환자를 신선한 공기가 있는 곳으로 옮기고, 상체를 세운 자세로 앉혀 호흡을 돕는다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 5,
          feedback:
            "올바른 응급처치입니다! 연기 흡입 환자는 신선한 공기 + 상체를 세운 자세가 핵심입니다. 의식이 있는 동안 편안한 자세를 유지하도록 도와주세요.",
        },
        {
          id: "c",
          text: "인공호흡을 실시한다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -5,
          feedback:
            "의식이 있고 스스로 호흡하는 환자에게는 인공호흡이 불필요합니다. 의식과 호흡이 멈춘 경우에만 심폐소생술을 실시하세요.",
        },
      ],
    },
    {
      type: "choice",
      id: "s6-step6",
      title: "2차 피해 방지",
      description:
        "건물에서 대피한 사람들이 점점 많아지고 있습니다. 소방차가 도착 중인데, 구경꾼들이 진입로를 막고 있습니다.",
      situation:
        "건물 앞에 많은 사람이 모여 있고, 소방차 사이렌이 들립니다. 일부 사람들이 건물 가까이에서 영상을 촬영하고 있습니다.",
      illustration: "crowd-scene",
      choices: [
        {
          id: "a",
          text: "사람들에게 소방차 진입로를 비키고, 건물에서 충분히 떨어지도록 안내한다",
          isCorrect: true,
          scoreDelta: 20,
          survivalDelta: 5,
          feedback:
            "올바른 행동! 소방차 진입로 확보와 2차 피해 방지는 매우 중요합니다. 건물 붕괴나 폭발 위험이 있으므로 충분히 떨어져야 합니다.",
        },
        {
          id: "b",
          text: "나도 핸드폰으로 상황을 촬영한다",
          isCorrect: false,
          scoreDelta: 0,
          survivalDelta: -10,
          feedback:
            "화재 현장 근처에서 촬영하는 것은 2차 피해(폭발, 건물 붕괴) 위험이 있고, 소방 활동에 방해가 됩니다.",
        },
        {
          id: "c",
          text: "다시 건물에 들어가 남은 사람을 구하러 간다",
          isCorrect: false,
          scoreDelta: 5,
          survivalDelta: -20,
          feedback:
            "절대 건물에 다시 들어가지 마세요! 전문 소방대원만이 안전하게 구조할 수 있습니다. 위치 정보를 소방관에게 전달하세요.",
        },
      ],
    },
    {
      type: "mission",
      id: "s6-step7",
      title: "화상 응급처치 순서",
      description:
        "화상 응급처치의 올바른 순서를 배열하세요.",
      instruction: "화상 응급처치 단계를 순서대로 정렬하세요",
      missionType: "order",
      items: [
        "화상 부위를 흐르는 깨끗한 물로 식힌다 (20분 이상)",
        "시계, 반지 등 조이는 물건을 제거한다",
        "깨끗한 거즈나 천으로 가볍게 덮는다",
        "119 또는 병원으로 이송한다",
      ],
      correctOrder: [
        "화상 부위를 흐르는 깨끗한 물로 식힌다 (20분 이상)",
        "시계, 반지 등 조이는 물건을 제거한다",
        "깨끗한 거즈나 천으로 가볍게 덮는다",
        "119 또는 병원으로 이송한다",
      ],
      timeLimit: 25,
      scoreReward: 20,
      survivalDelta: -5,
      failFeedback:
        "화상 응급처치: 물로 식히기 → 조이는 물건 제거 → 깨끗한 천으로 덮기 → 병원 이송. 절대 된장/소주/치약 등을 바르지 마세요!",
      successFeedback:
        "완벽합니다! 화상 응급처치를 정확히 수행했습니다. 이 지식이 실제 상황에서 큰 도움이 될 것입니다.",
    },
    {
      type: "mission",
      id: "s6-step8",
      title: "최종 종합 퀴즈",
      description:
        "화재 발생 시 전체 대응 순서를 배열하는 최종 퀴즈입니다.",
      instruction: "화재 전체 대응 과정을 순서대로 정렬하세요",
      missionType: "order",
      items: [
        "화재 인지 및 119 신고",
        "초기 소화 가능 여부 판단",
        "안전한 대피 경로로 이동",
        "부상자 구호 및 응급처치",
        "소방관 도착 후 정보 전달",
      ],
      correctOrder: [
        "화재 인지 및 119 신고",
        "초기 소화 가능 여부 판단",
        "안전한 대피 경로로 이동",
        "부상자 구호 및 응급처치",
        "소방관 도착 후 정보 전달",
      ],
      timeLimit: 30,
      scoreReward: 20,
      survivalDelta: -10,
      failFeedback:
        "화재 전체 대응: 인지/신고 → 초기 소화 판단 → 대피 → 응급처치 → 소방관 정보 전달. 이 과정을 꼭 기억하세요!",
      successFeedback:
        "축하합니다! 화재 대응의 전 과정을 완벽하게 이해하고 있습니다! 최종 시나리오를 훌륭하게 클리어했습니다! 🎉",
    },
  ],
};
