export interface Repo<T extends { id: string | number }> {
  query: () => Promise<T[]>;
}
