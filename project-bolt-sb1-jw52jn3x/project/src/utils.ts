export function getYouTubeVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function calculateCourseScore(
  courseId: number,
  allocations: CourseAllocations,
  responses: UserResponses
): number {
  const courseAllocation = allocations[courseId];
  
  // Weighted scoring system
  const weights = {
    A: 2.0,  // Most important skills - double weight
    B: 1.5,  // Important supporting skills
    C: 1.0,  // Relevant additional skills
    D: 0.5   // Nice-to-have skills
  };

  const groupScores = {
    A: calculateGroupScore(courseAllocation.A, responses) * weights.A,
    B: calculateGroupScore(courseAllocation.B, responses) * weights.B,
    C: calculateGroupScore(courseAllocation.C, responses) * weights.C,
    D: calculateGroupScore(courseAllocation.D, responses) * weights.D
  };

  // Calculate total weighted score
  const totalWeight = weights.A + weights.B + weights.C + weights.D;
  const weightedScore = (groupScores.A + groupScores.B + groupScores.C + groupScores.D) / totalWeight;

  // Apply a threshold factor for required skills
  const requiredSkillsThreshold = calculateRequiredSkillsThreshold(courseAllocation.A, responses);
  
  return weightedScore * requiredSkillsThreshold;
}

function calculateGroupScore(group: string[], responses: UserResponses): number {
  const totalResponses = group.reduce((sum, questionId) => {
    return sum + (responses[questionId] || 0);
  }, 0);
  
  return totalResponses / (group.length * 4); // Normalize to 0-1 range (max rating is 4)
}

function calculateRequiredSkillsThreshold(requiredSkills: string[], responses: UserResponses): number {
  // Check if any critical skills are too low (below 2)
  const hasLowCriticalSkills = requiredSkills.some(skill => (responses[skill] || 0) < 2);
  
  // Reduce score significantly if critical skills are lacking
  return hasLowCriticalSkills ? 0.5 : 1.0;
}

export function getTopRecommendations(
  responses: UserResponses,
  allocations: CourseAllocations,
  count: number = 5
): number[] {
  const courseScores = Object.keys(allocations).map(courseId => ({
    courseId: parseInt(courseId),
    score: calculateCourseScore(parseInt(courseId), allocations, responses),
  }));

  return courseScores
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.courseId);
}