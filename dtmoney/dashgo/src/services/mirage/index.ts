import { faker } from '@faker-js/faker';
import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from 'miragejs';

export type User = {
  name: string;
  email: string;
  created_at: number;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(15);
        },
      }),
    }, //crianção em massa

    seeds(server) {
      server.createList('user', 200 /*Criar 200 usuarios*/);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.sort((a: User, b: User) => a.created_at - b.created_at)
          .slice(pageStart, pageEnd);

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });
      this.get('users/:id');
      this.post('/users');

      this.namespace = '';
      this.passthrough(); //passa todas as rotas por eles, caso não caia no api vai continuar
    },
  });

  return server;
}
