import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string) => void;
  getToken: () => string;
}

interface TokenProviderProps {
  children: ReactNode;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [token, setTokenState] = useState<string>("");

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    }
  };

  const getToken = () => token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken, getToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
