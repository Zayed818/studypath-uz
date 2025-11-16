/**
 * Utility functions for parsing and handling degree information
 */

export interface DegreeInfo {
  level: 'bachelor' | 'master' | 'phd' | 'diploma';
  displayName: string;
  typicalPrerequisite: string;
}

/**
 * Parse program name to extract degree level information
 * @param programName - The full program name (e.g., "BSc Mechanical Engineering")
 * @returns DegreeInfo object with level and display name
 */
export function parseDegreeFromProgram(programName: string): DegreeInfo {
  const nameLower = programName.toLowerCase();
  
  // Check for Bachelor's degree indicators
  if (
    nameLower.includes('bsc') || 
    nameLower.includes('ba') || 
    nameLower.includes('bs') ||
    nameLower.includes('b.sc') ||
    nameLower.includes('b.a') ||
    nameLower.includes('bachelor')
  ) {
    return {
      level: 'bachelor',
      displayName: 'Bachelor of Science',
      typicalPrerequisite: 'high-school'
    };
  }
  
  // Check for Master's degree indicators
  if (
    nameLower.includes('msc') || 
    nameLower.includes('ma') || 
    nameLower.includes('ms') ||
    nameLower.includes('mba') ||
    nameLower.includes('m.sc') ||
    nameLower.includes('m.a') ||
    nameLower.includes('master')
  ) {
    return {
      level: 'master',
      displayName: 'Master of Science',
      typicalPrerequisite: 'bachelor'
    };
  }
  
  // Check for Doctorate degree indicators
  if (
    nameLower.includes('phd') || 
    nameLower.includes('ph.d') || 
    nameLower.includes('dphil') ||
    nameLower.includes('doctorate')
  ) {
    return {
      level: 'phd',
      displayName: 'Doctor of Philosophy',
      typicalPrerequisite: 'master'
    };
  }
  
  // Default to Bachelor's if unable to determine
  return {
    level: 'bachelor',
    displayName: 'Bachelor of Science',
    typicalPrerequisite: 'high-school'
  };
}

/**
 * Get a helpful message about typical prerequisites for a degree level
 * @param degreeLevel - The degree level being applied to
 * @param currentEducation - The applicant's current education level
 * @returns A helpful message or null if no message needed
 */
export function getEligibilityMessage(
  degreeLevel: string,
  currentEducation: string
): string | null {
  if (!currentEducation) return null;
  
  // Bachelor's program - any education level is acceptable
  if (degreeLevel === 'bachelor') {
    return null;
  }
  
  // Master's program
  if (degreeLevel === 'master') {
    if (currentEducation === 'high-school') {
      return 'Note: Master\'s programs typically require a Bachelor\'s degree';
    }
    return null;
  }
  
  // PhD program
  if (degreeLevel === 'phd') {
    if (currentEducation === 'high-school' || currentEducation === 'bachelor') {
      return 'Note: PhD programs typically require a Master\'s degree';
    }
    return null;
  }
  
  return null;
}
