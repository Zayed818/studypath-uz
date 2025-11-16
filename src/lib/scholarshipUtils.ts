// Utility functions for scholarship management

/**
 * Calculate days until deadline
 */
export function calculateDaysUntilDeadline(deadlineDate: string): number {
  const now = new Date();
  const deadline = new Date(deadlineDate);
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Check if scholarship info is fresh (updated within threshold days)
 */
export function isScholarshipInfoFresh(lastUpdated: string, threshold = 90): boolean {
  const now = new Date();
  const updated = new Date(lastUpdated);
  const diffTime = now.getTime() - updated.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= threshold;
}

/**
 * Get deadline urgency level based on days left
 */
export function getDeadlineUrgency(daysLeft: number): 'critical' | 'warning' | 'normal' {
  if (daysLeft <= 3) return 'critical';
  if (daysLeft <= 7) return 'warning';
  return 'normal';
}

/**
 * Track scholarship analytics event
 */
export function trackScholarshipEvent(
  eventType: 'view' | 'apply_click',
  scholarshipId: string,
  userId?: string
): void {
  try {
    const events = JSON.parse(localStorage.getItem('scholarship_events') || '[]');
    events.push({
      event: eventType,
      scholarshipId,
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('scholarship_events', JSON.stringify(events));
  } catch (error) {
    console.error('Failed to track scholarship event:', error);
  }
}

/**
 * Format deadline date for display
 */
export function formatDeadlineDate(date: string, locale: string): string {
  const deadline = new Date(date);
  return deadline.toLocaleDateString(locale === 'uz' ? 'uz-UZ' : locale === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
