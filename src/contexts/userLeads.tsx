import { ReactNode, createContext, useContext, useState } from 'react';
import { getLocalStorage, saveLocalStorage } from '../utils/local-storage';

type OpportunitiesProps = {
  rpa: string;
  product_digital: string;
  analytics: string;
  bpm: string;
};

type UserLeadsProps = {
  username: string;
  phone: string;
  email: string;
  opportunities: OpportunitiesProps;
};

type UserLeadsContextProps = {
  userLeads: UserLeadsProps[];
  saveUserLeads(data: any): void;
};

const UserLeadsContext = createContext<UserLeadsContextProps>(
  {} as UserLeadsContextProps
);

export const UserLeadsProvider = ({ children }: { children: ReactNode }) => {
  const [userLeads, setUserLeads] = useState<UserLeadsProps[]>(
    getLocalStorage('@elo-group:userLeads') ?? []
  );

  const saveUserLeads = (data: UserLeadsProps) => {
    const userLeadsData = {
      ...data,
      opportunities: data.opportunities,
    };
    const newUserLeads = [...userLeads, { ...userLeadsData }];
    setUserLeads(newUserLeads);
    saveLocalStorage('@elo-group:userLeads', newUserLeads);
  };

  return (
    <UserLeadsContext.Provider value={{ userLeads, saveUserLeads }}>
      {children}
    </UserLeadsContext.Provider>
  );
};

export const userLeadsContext = () => {
  return useContext(UserLeadsContext);
};
