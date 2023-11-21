import { z } from 'zod';

export const searchGymQuery = z.object({
  search: z.string(),
  page: z.coerce.number().min(1).default(1),
});
