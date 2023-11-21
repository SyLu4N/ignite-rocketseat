import { z } from 'zod';

export const createCheckInBody = z.object({
  latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
  longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
});

export const createCheckInQuery = z.object({
  gymId: z.string().uuid(),
});
