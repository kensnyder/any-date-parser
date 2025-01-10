export class MaybeValidDate extends Date {
  invalid: string | null = null;
  isValid() {
    return !Number.isNaN(this.valueOf());
  }
}
