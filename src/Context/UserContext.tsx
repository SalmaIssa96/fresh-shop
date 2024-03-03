import { Dispatch, ReactNode, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

type ContextType = {
  userToken: string | null;
  setUserToken: Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext(null as any as ContextType);

type Props = {
  children: ReactNode;
};
const UserContextProvider = (props: Props) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserContextProvider;
