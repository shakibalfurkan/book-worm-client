import { IUser } from "@/context/user.provider";
import { IBook } from "./book.interface";

export interface IReview {
  _id: string;
  user: IUser;
  book: IBook;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
