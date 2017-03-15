export class Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: string;
  first: boolean;
  numberOfElements: number;
}
