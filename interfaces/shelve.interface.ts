export interface IUserShelve {
  user: string;
  book: string;
  shelf: string;
  progressPages: number;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
