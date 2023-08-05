export type RecordValuePath<T extends Record<any, any>> = T extends Record<
  infer P,
  any
>
  ? P extends keyof any
    ? T[P] extends Array<infer A>
      ? A extends object
        ? P | `${P & string}.[].${RecordValuePath<A> & string}`
        : P | `${P & string}.[]`
      : T[P] extends Record<any, any>
      ?
          | `${P & string}.${RecordValuePath<T[P]> extends `${infer Q}`
              ? Q & string
              : never}`
          | P
      : P
    : never
  : never;

export type RecordValueType<
  T extends {},
  P extends RecordValuePath<T>
> = P extends `${infer Q}.${infer U}`
  ? Q extends keyof T
    ? T[Q] extends object
      ? U extends RecordValuePath<T[Q]>
        ? RecordValueType<T[Q], U>
        : never
      : never
    : never
  : P extends keyof T
  ? T[P]
  : P extends '[]' ?  '1':'2';

type  path = RecordValuePath<[1,2,3]>
type test = RecordValueType<{a:[1,2,3]},'a.[]'>;
