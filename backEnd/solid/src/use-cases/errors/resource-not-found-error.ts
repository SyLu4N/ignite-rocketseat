export class resourceNotFoundError extends Error {
  constructor() {
    super('Recurso não encontrado');
  }
}
