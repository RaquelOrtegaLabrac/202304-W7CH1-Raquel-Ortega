export interface Repo<T extends { id: string }> {
  query: () => Promise<T[]>;
}
