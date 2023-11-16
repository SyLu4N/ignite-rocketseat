import { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';

import { CheckInsRepository } from '../check-ins-repository';

export class InmemoryCheckInRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startDay = dayjs(date).startOf('date');
    const endDay = dayjs(date).endOf('date');

    const checkDate = this.items.find((checkIn) => {
      const dateJs = dayjs(checkIn.created_at);
      const isSameDate = dateJs.isAfter(startDay) && dateJs.isBefore(endDay);

      return checkIn.user_id === userId && isSameDate;
    });

    if (!checkDate) return null;

    return checkDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data?.validated_at ? new Date() : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
