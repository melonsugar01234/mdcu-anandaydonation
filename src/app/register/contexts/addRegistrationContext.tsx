"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NewRegistrationInitialValuesType,
  NewRegistrationType,
  newRegistrationInitialValuesSchema,
} from "../schema";

const defaultRegistration: NewRegistrationInitialValuesType = {
  name: "",
  telephone: "",
  email: "",
  address: "",
  donate: 0,
  donateAmount: undefined,
  singlePinAmount: undefined,
  pinSetAmount: undefined,
  buyShirt: 0,
  order: "",
  transferTime: "",
  transferDate: "",
};

const LOCAL_STORAGE_KEY = "multi-page-form-demo-newDealData";

type AddRegistrationContextType = {
  newRegistrationData: NewRegistrationInitialValuesType;
  updateNewRegistrationDetails: (
    registrationDetails: Partial<NewRegistrationType>
  ) => void;
  dataLoaded: boolean;
  resetLocalStorage: () => void;
};

export const AddRegistrationContext =
  createContext<AddRegistrationContextType | null>(null);

export const AddRegistrationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newRegistrationData, setNewRegistrationData] =
    useState<NewRegistrationInitialValuesType>(defaultRegistration);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      saveDataToLocalStorage(newRegistrationData);
    }
  }, [newRegistrationData, dataLoaded]);

  const updateNewRegistrationDetails = useCallback(
    (registrationDetails: Partial<NewRegistrationType>) => {
      setNewRegistrationData({
        ...newRegistrationData,
        ...registrationDetails,
      });
    },
    [newRegistrationData]
  );

  const saveDataToLocalStorage = (
    currentRegistrationData: NewRegistrationInitialValuesType
  ) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(currentRegistrationData)
    );
  };

  const readFromLocalStorage = () => {
    const loadedDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!loadedDataString) return setNewRegistrationData(defaultRegistration);
    const validated = newRegistrationInitialValuesSchema.safeParse(
      JSON.parse(loadedDataString)
    );

    if (validated.success) {
      setNewRegistrationData(validated.data);
    } else {
      setNewRegistrationData(defaultRegistration);
    }
  };

  const resetLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setNewRegistrationData(defaultRegistration);
  };

  const contextValue = useMemo(
    () => ({
      newRegistrationData,
      dataLoaded,
      updateNewRegistrationDetails,
      resetLocalStorage,
    }),
    [newRegistrationData, dataLoaded, updateNewRegistrationDetails]
  );

  return (
    <AddRegistrationContext.Provider value={contextValue}>
      {children}
    </AddRegistrationContext.Provider>
  );
};

export function useAddRegistrationContext() {
  const context = useContext(AddRegistrationContext);
  if (context === null) {
    throw new Error(
      "useAddRegistrationContext must be used within a AddRegistrationContextProvider"
    );
  }
  return context;
}
