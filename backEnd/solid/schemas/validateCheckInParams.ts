import { z } from 'zod';

export const validateCheckInParams = z.object({
  checkInId: z.string(),
});
