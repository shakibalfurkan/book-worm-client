import { IBook } from "./book.interface";

export interface IUserShelve {
  _id: string;
  user: string;
  book: IBook;
  shelve: "WANT_TO_READ" | "CURRENTLY_READING" | "READ";
  progressPages: number;
  finishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
