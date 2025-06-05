export type DstAnswers = {
  accredited: 'yes' | 'notSure' | 'no';
  saleStatus: 'active' | 'lt3mo' | '3-6mo' | '6-12mo' | 'ownNoSale' | 'none';
  equityBracket: '<100' | '100-249' | '250-499' | '500-999' | '≥1000';
  horizon: '<5 years' | '5-10 years' | '10+ years';
  returnNeed: '<= 6%' | '6.1%-8%' | '8.1%-10%' | '> 10%';
  passiveImportance: number; // 1-5 scale
  location?: string;
  propertyType?: 'multifamily' | 'industrial' | 'retail' | 'office' | 'land' | 'other';
  mortgageBracket?: '<25%' | '25-50%' | '50-75%' | '>75%';
  prior1031?: 'yes' | 'no';
  qiReady?: 'yes' | 'no';
  riskTolerance?: number; // 1-5 scale
  riskBehavior?: 'Conservative' | 'Moderate' | 'Adventurous';
  advisor?: 'yes' | 'no';
  notes?: string;
  truthfulAcknowledgement: boolean;
};

// Scoring table based on the updated algorithm
const scoringTable = {
  "Accredited Status": {
    "yes": 20,
    "notSure": 10,
    "no": -20
  },
  "Completed 1031 Before": {
    "yes": 3,
    "no": 0
  },
  "Equity (k USD)": {
    "≥1000": 25,
    "500-999": 20,
    "250-499": 10,
    "100-249": 5,
    "<100": 0
  },
  "Investment Horizon": {
    "10+ years": 10,
    "5-10 years": 10,
    "<5 years": 5
  },
  "Mortgage Balance vs Value": {
    "<25%": 15,
    "25-50%": 10,
    "50-75%": 5,
    ">75%": 0
  },
  "Passive Importance (1-5)": {
    1: 2,
    2: 4,
    3: 6,
    4: 8,
    5: 10
  },
  "Qualified Intermediary Selected": {
    "yes": 3,
    "no": 0
  },
  "Risk Tolerance": {
    "Conservative": -2,
    "Moderate": 0,
    "Adventurous": 2
  },
  "Sale Timeline": {
    "active": 20,
    "lt3mo": 20,
    "3-6mo": 15,
    "6-12mo": 10,
    "ownNoSale": 5,
    "none": 0
  },
  "Target Yield (expected return)": {
    "<= 6%": 10,
    "6.1%-8%": 8,
    "8.1%-10%": 5,
    "> 10%": 2
  }
};

export function calculateDstScore(answers: DstAnswers): {
  score: number;
  segment: 'diamond' | 'hot' | 'warm' | 'cold';
} {
  let totalScore = 0;

  // Map answers to scoring table format
  const responses = {
    "Accredited Status": answers.accredited,
    "Sale Timeline": answers.saleStatus,
    "Equity (k USD)": answers.equityBracket,
    "Passive Importance (1-5)": answers.passiveImportance,
    "Investment Horizon": answers.horizon,
    "Target Yield (expected return)": answers.returnNeed,
    "Risk Tolerance": answers.riskBehavior,
    "Completed 1031 Before": answers.prior1031,
    "Qualified Intermediary Selected": answers.qiReady,
    "Mortgage Balance vs Value": answers.mortgageBracket
  };

  // Calculate score based on responses
  for (const [question, answer] of Object.entries(responses)) {
    const options = scoringTable[question as keyof typeof scoringTable];
    if (options && answer !== undefined) {
      const score = options[answer as keyof typeof options];
      if (typeof score === "number") {
        totalScore += score;
      }
    }
  }

  // Classify lead based on total score
  let segment: 'diamond' | 'hot' | 'warm' | 'cold';
  if (totalScore >= 80) {
    segment = 'diamond';
  } else if (totalScore >= 50) {
    segment = 'hot';
  } else if (totalScore >= 20) {
    segment = 'warm';
  } else {
    segment = 'cold';
  }

  return {
    score: totalScore,
    segment,
  };
}