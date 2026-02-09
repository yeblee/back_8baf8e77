export class ListEntity<T> {
  readonly data: T[];
  readonly totalCount: number;

  constructor(args: ListEntity<T>) {
    this.data = args.data;
    this.totalCount = args.totalCount;
  }
}
