import { isAuthRoute } from "@/constant";
import { getUserFromDB } from "@/services/UserService";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  photo: string;
  password: string;
  role: "USER" | "ADMIN";

  readingGoal: {
    year: number;
    targetBooks: number;
  };

  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
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

  const handleUser = async () => {
    setIsUserLoading(true);
    try {
      const response = await getUserFromDB();

      setUser(response?.data || null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch {
      setUser(null);
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthRoute(window.location.pathname)) {
      handleUser();
    }
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
