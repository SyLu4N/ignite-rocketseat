export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Você já atinjiu seu limite de check-ins hoje');
  }
}
