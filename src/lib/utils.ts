import { auth } from '@clerk/nextjs/server';

const { userId, sessionId, sessionClaims } = await auth(); // include sessionClaims

export const role = (sessionClaims?.metadata as { role?: string })?.role;

const currentWorkWeek = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);

  if (dayOfWeek === 0) {
    startOfWeek.setDate(today.getDate() - 6); // Sunday -> last Monday
  } else {
    startOfWeek.setDate(today.getDate() - (dayOfWeek - 1)); // Other days -> this week's Monday
  }

  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};
