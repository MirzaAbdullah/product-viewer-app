/**
 * this is a kind of type-guard that allows to restrict
 * the properties that is passed among the components
 * to be READ-ONLY
 */
export type ReadOnlyProps<T> = {
  readonly [P in keyof T]: T[P];
};
