export type RecordValuePath<T extends object> = T extends Record<infer P, any>
  ? T extends Array<infer A>
    ? A extends object
      ? "[]" | `[].${RecordValuePath<A> & string}`
      : "[]"
    : P extends keyof any
    ? T[P] extends Record<any, any>
      ?
          | `${P & string}.${RecordValuePath<T[P]> extends `${infer Q}`
              ? Q & string
              : never}`
          | P 
      : P
    : never
  : never;
  
export type RecordValueType<
  T extends object,
  P extends RecordValuePath<T>
> = P extends `${infer Q}.${infer U}`
  ? Q extends keyof T
    ? T[Q] extends object
      ? U extends RecordValuePath<T[Q]>
        ? RecordValueType<T[Q], U>
        : never
      : never
    : Q extends "[]"
    ? T extends Array<infer A>
      ? A extends object
        ? U extends RecordValuePath<A>
          ? RecordValueType<A, U>
          : never
        : never
      : never
    : never
  : P extends keyof T
  ? T[P]
  : P extends "[]"
  ? T extends Array<infer A>
    ? A
    : never
  : never;

type path = RecordValuePath<{ a: { a: [1, 1] } }>;

type test = RecordValueType<[{ a: [{b:1}] }, { a: [{b:1}] }, { a: [{b:1}] }, { a: [{b:1}] }], "[].a.[].b">;
