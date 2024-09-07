import React, { createContext, useState, ReactNode } from "react";
import { FlatUserFormData, User } from "src/types/Types";

interface ListContextType {
    editData: FlatUserFormData;
    setEditData: React.Dispatch<React.SetStateAction<FlatUserFormData>>;
    updateEditData: (newData: FlatUserFormData) => void;
    data: User;
    setData: React.Dispatch<React.SetStateAction<User>>;
}

export const ListContext = createContext<ListContextType | undefined>(undefined);

interface ListProviderProps {
    children: ReactNode;
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {

    const [editData, setEditData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        website: '',
        address_city: '',
        address_street: '',
        address_suite: '',
        address_zipcode: '',
        address_geo_lat: '12.98',
        address_geo_lng: '77.58',
        company_bs: '',
        company_catchPhrase: '',
        company_name: '',
    });

    const updateEditData = (newData: FlatUserFormData) => {
      setEditData((prev) => (
          {...editData, ...newData}
      ))
  };

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
        <ListContext.Provider value={{data, setData, editData, setEditData, updateEditData}}>
            {children}
        </ListContext.Provider>
    );
};