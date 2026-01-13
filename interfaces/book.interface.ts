export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  totalPages: number;
  shelfCount: {
    wantToRead: number;
    currentlyReading: number;
    read: number;
  };
  avgRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}
export interface IBookFilters {
  searchTerm?: string;
  genre?: string[];
  minRating?: string;
  maxRating?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}
