export type DstAnswers = {
  accredited: 'yes' | 'notSure' | 'no';
  saleStatus: 'active' | 'lt6' | 'lt12' | 'ownNoSale' | 'none';
  equityBracket: '100-249' | '250-499' | '500-999' | '1mPlus';
  horizon: '<3' | '3-5' | '5-10' | '10+';
  returnNeed: 'le4' | '5-6' | '7-8' | 'ge9';
  passiveImportance: number;
  location?: string;
  propertyType?: 'multifamily' | 'industrial' | 'retail' | 'office' | 'land' | 'other';
  mortgageBracket?: 'free' | 'lt25' | '25to50' | 'gt50';
  prior1031?: 'yes' | 'no';
  qiReady?: 'yes' | 'no';
  riskTolerance?: number;
  advisor?: 'yes' | 'no';
  notes?: string;
};

export function calculateDstScore(answers: DstAnswers): {
  score: number;
  segment: 'high' | 'medium' | 'low' | 'notReady';
} {
  // Initial score
  let score = 0;

  // Accreditation status scoring
  if (answers.accredited === 'yes') {
    score += 20;
  } else if (answers.accredited === 'notSure') {
    score += 10;
  } else {
    score -= 20; // Major negative factor
  }

  // Sale status scoring
  if (answers.saleStatus === 'active') {
    score += 20;
  } else if (answers.saleStatus === 'lt6') {
    score += 15;
  } else if (answers.saleStatus === 'lt12') {
    score += 10;
  } else if (answers.saleStatus === 'ownNoSale') {
    score += 5;
  } else {
    // No investment property
    score -= 10;
  }

  // Equity bracket scoring
  if (answers.equityBracket === '1mPlus') {
    score += 15;
  } else if (answers.equityBracket === '500-999') {
    score += 12;
  } else if (answers.equityBracket === '250-499') {
    score += 8;
  } else {
    score += 5;
  }

  // Investment horizon scoring
  if (answers.horizon === '5-10' || answers.horizon === '10+') {
    score += 15; // DSTs are typically longer-term investments
  } else if (answers.horizon === '3-5') {
    score += 10;
  } else {
    score += 0; // Too short for DSTs
  }

  // Return expectations scoring
  if (answers.returnNeed === 'le4' || answers.returnNeed === '5-6') {
    score += 15; // Realistic expectations
  } else if (answers.returnNeed === '7-8') {
    score += 10; // Somewhat high but still achievable
  } else {
    score += 0; // Expectations may be too high
  }

  // Passive importance scoring
  score += Math.min(answers.passiveImportance * 2, 10); // Max 10 points

  // Optional factors that could boost the score
  if (answers.prior1031 === 'yes') {
    score += 5; // Experience with 1031 exchanges
  }

  if (answers.qiReady === 'yes') {
    score += 5; // Ready with QI
  }

  if (answers.advisor === 'yes') {
    score += 5; // Working with professional advisor
  }

  // Risk tolerance can slightly modify score
  if (answers.riskTolerance !== undefined) {
    if (answers.riskTolerance <= 2) {
      score += 2; // Conservative investors may prefer DSTs
    }
  }

  // Determine segment based on score
  let segment: 'high' | 'medium' | 'low' | 'notReady';
  
  if (score >= 80) {
    segment = 'high';
  } else if (score >= 60) {
    segment = 'medium';
  } else if (score >= 40) {
    segment = 'low';
  } else {
    segment = 'notReady';
  }

  // If not accredited, override to not ready
  if (answers.accredited === 'no') {
    segment = 'notReady';
  }

  return {
    score,
    segment
  };
}