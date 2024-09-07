import React, { createContext, useState, ReactNode } from "react";
import { User } from "src/types/Types";

interface ListContextType {
    data: User;
    setData: React.Dispatch<React.SetStateAction<User>>;
}

export const ListContext = createContext<ListContextType | undefined>(undefined);

interface ListProviderProps {
    children: ReactNode;
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {

    const [data, setData] = useState({
        address: {
          city: '',
          street: '',
          suite: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: ''
          }
        },
        company: {
          bs: '',
          catchPhrase: '',
          name: ''
        },
        email: '',
        id: 0,
        name: '',
        phone: '',
        username: '',
        website: ''
    });

    return (
        <ListContext.Provider value={{data, setData}}>
            {children}
        </ListContext.Provider>
    );
};