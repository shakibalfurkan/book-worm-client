import { getUserFromDB } from "@/services/AuthService";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IUser {
  name: string;
  email: string;
  photo: string;
  role: "USER" | "ADMIN";

  readingGoal: {
    year: number;
    targetBooks: number;
  };

  following: string[] | IUser[];
  followers: string[] | IUser[];
  favoriteGenres: string[];

  stats: {
    totalBooksRead: number;
    totalPagesRead: number;
    booksReadThisYear: number;
    lastReadingDate: Date | null;
    currentStreak: number;
    longestStreak: number;
  };

  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;

  readingGoalProgress: number;
  followersCount: number;
  followingCount: number;
}

export type TUserProviderValues = {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  isUserLoading: boolean;
  refetchUser: () => void;
};

const UserContext = createContext<TUserProviderValues | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  console.log(user);

  const handleUser = async () => {
    setIsUserLoading(true);
    try {
      const response = await getUserFromDB();
      console.log(response);
      setUser(response?.data || null);
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isUserLoading,
        refetchUser: handleUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined || context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
