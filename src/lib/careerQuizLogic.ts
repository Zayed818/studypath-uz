import { HollandCode, HollandScores, QuizQuestion, Career, careers, hollandTypes } from './careerQuizData';

export const initialScores: HollandScores = {
  R: 0,
  I: 0,
  A: 0,
  S: 0,
  E: 0,
  C: 0,
};

export const calculateHollandScores = (
  answers: Record<number, number>,
  questions: QuizQuestion[]
): HollandScores => {
  const scores: HollandScores = { ...initialScores };

  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question && question.options[optionIndex]) {
      const option = question.options[optionIndex];
      if (option.scores) {
        Object.entries(option.scores).forEach(([code, points]) => {
          if (points) {
            scores[code as HollandCode] += points;
          }
        });
      }
    }
  });

  return scores;
};

export const getTopHollandCodes = (scores: HollandScores, count: number = 3): HollandCode[] => {
  return (Object.entries(scores) as [HollandCode, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([code]) => code);
};

export const getHollandCodeString = (scores: HollandScores): string => {
  return getTopHollandCodes(scores, 3).join('');
};

// Calculate how well a career matches the user's Holland code profile
export const calculateCareerMatch = (
  userScores: HollandScores,
  careerCode: string
): number => {
  const userTopCodes = getTopHollandCodes(userScores, 3);
  const careerCodes = careerCode.split('') as HollandCode[];
  
  let matchScore = 0;
  const maxScore = 100;
  
  // Weight for position in user's profile (primary = 40, secondary = 35, tertiary = 25)
  const userWeights = [40, 35, 25];
  // Weight for position in career code (primary = 50, secondary = 30, tertiary = 20)
  const careerWeights = [50, 30, 20];
  
  userTopCodes.forEach((userCode, userIndex) => {
    const careerIndex = careerCodes.indexOf(userCode);
    if (careerIndex !== -1) {
      // Calculate match based on positions
      const positionScore = (userWeights[userIndex] * careerWeights[careerIndex]) / 100;
      matchScore += positionScore;
    }
  });
  
  // Bonus for exact primary match
  if (userTopCodes[0] === careerCodes[0]) {
    matchScore += 15;
  }
  
  // Bonus for having 2+ matching codes
  const matchingCodes = userTopCodes.filter(code => careerCodes.includes(code)).length;
  if (matchingCodes >= 2) {
    matchScore += matchingCodes * 5;
  }
  
  // Normalize to percentage (cap at 98%)
  const normalizedScore = Math.min(Math.round((matchScore / maxScore) * 100), 98);
  
  // Ensure minimum score of 15% if there's any overlap
  if (matchingCodes > 0 && normalizedScore < 15) {
    return 15 + matchingCodes * 5;
  }
  
  return normalizedScore;
};

export interface CareerMatch extends Career {
  matchPercentage: number;
  matchingCodes: HollandCode[];
  matchReason: string;
  matchReasonUz: string;
  matchReasonRu: string;
}

export const getCareerMatches = (
  userScores: HollandScores,
  allCareers: Career[] = careers
): CareerMatch[] => {
  const userTopCodes = getTopHollandCodes(userScores, 3);
  
  const careerMatches: CareerMatch[] = allCareers.map(career => {
    const matchPercentage = calculateCareerMatch(userScores, career.hollandCode);
    const careerCodes = career.hollandCode.split('') as HollandCode[];
    const matchingCodes = userTopCodes.filter(code => careerCodes.includes(code));
    
    // Generate match reason
    let matchReason = '';
    let matchReasonUz = '';
    let matchReasonRu = '';
    
    if (matchingCodes.length > 0) {
      const matchingNames = matchingCodes.map(code => hollandTypes[code].name);
      const matchingNamesUz = matchingCodes.map(code => hollandTypes[code].nameUz);
      const matchingNamesRu = matchingCodes.map(code => hollandTypes[code].nameRu);
      
      matchReason = `Matches your ${matchingNames.join(' and ')} traits`;
      matchReasonUz = `Sizning ${matchingNamesUz.join(' va ')} xususiyatlaringizga mos`;
      matchReasonRu = `Соответствует вашим ${matchingNamesRu.join(' и ')} чертам`;
      
      if (userTopCodes[0] === careerCodes[0]) {
        matchReason = `Strong match! Aligns with your primary ${matchingNames[0]} personality`;
        matchReasonUz = `Kuchli moslik! Sizning asosiy ${matchingNamesUz[0]} shaxsiyatingizga mos`;
        matchReasonRu = `Сильное совпадение! Соответствует вашей основной ${matchingNamesRu[0]} личности`;
      }
    } else {
      matchReason = 'Different personality type, but could be a growth opportunity';
      matchReasonUz = "Boshqa shaxsiyat turi, lekin o'sish imkoniyati bo'lishi mumkin";
      matchReasonRu = 'Другой тип личности, но может быть возможностью для роста';
    }
    
    return {
      ...career,
      matchPercentage,
      matchingCodes,
      matchReason,
      matchReasonUz,
      matchReasonRu,
    };
  });
  
  // Sort by match percentage descending
  return careerMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

export const getTopCareerMatches = (
  userScores: HollandScores,
  count: number = 5,
  allCareers: Career[] = careers
): CareerMatch[] => {
  return getCareerMatches(userScores, allCareers).slice(0, count);
};

// Get personality profile description
export const getPersonalityProfile = (scores: HollandScores, language: 'en' | 'uz' | 'ru' = 'en') => {
  const topCodes = getTopHollandCodes(scores, 3);
  const totalPoints = Object.values(scores).reduce((sum, val) => sum + val, 0);
  
  const profile = topCodes.map((code, index) => {
    const type = hollandTypes[code];
    const percentage = totalPoints > 0 ? Math.round((scores[code] / totalPoints) * 100) : 0;
    
    return {
      code,
      name: language === 'uz' ? type.nameUz : language === 'ru' ? type.nameRu : type.name,
      description: language === 'uz' ? type.descriptionUz : language === 'ru' ? type.descriptionRu : type.description,
      traits: language === 'uz' ? type.traitsUz : language === 'ru' ? type.traitsRu : type.traits,
      percentage,
      score: scores[code],
      color: type.color,
      isPrimary: index === 0,
    };
  });
  
  return profile;
};

// Get chart data for radar/bar chart
export const getChartData = (scores: HollandScores, language: 'en' | 'uz' | 'ru' = 'en') => {
  return (Object.entries(scores) as [HollandCode, number][]).map(([code, score]) => {
    const type = hollandTypes[code];
    return {
      code,
      name: language === 'uz' ? type.nameUz : language === 'ru' ? type.nameRu : type.name,
      score,
      fill: type.color,
    };
  });
};
