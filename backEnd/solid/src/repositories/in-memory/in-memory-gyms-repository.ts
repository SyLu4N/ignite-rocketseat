import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository';

export class InmemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) return null;

    return gym;
  }

  async searchMany(search: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(search))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distancia = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },

        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      const MAX_DISTANCE = 10; //10km
      return distancia < MAX_DISTANCE;
    });
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
