export class MaxDistanceError extends Error {
  constructor() {
    super('Você deve estar mais perto da academia para realizar check-in');
  }
}
