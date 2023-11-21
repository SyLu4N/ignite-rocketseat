import { z } from 'zod';

export const checkInHistoryQuery = z.object({
  page: z.coerce.number().min(1).default(1),
  userId: z.string(),
});
