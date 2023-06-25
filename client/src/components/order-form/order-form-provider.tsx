import React, { createContext, Dispatch, useEffect, useReducer } from "react";
import { SelectOption } from "../facade-good/form-components/select";
import nanoid from "../../nanoid";
import { FileWithPath } from "react-dropzone";

declare module Order {
  interface FacadeType {
    id: number;
    name: string;
  }

  interface Material {
    id: number;
    name: string;
    type: string;
  }

  interface Model {
    id: number;
    name: string;
    materials: string[];
  }

  interface AccessorieModel {
    id: number;
    group: string;
    name: string;
  }

  interface Other {
    value: string;
    label: string;
  }

  interface Data {
    header: Order.Header;
    facades: Order.Facade[];
    accessories: Order.Accessorie[];
    files: FileWithPath[];
  }

  interface Header {
    material?: SelectOption<Material>;
    model?: SelectOption<Other>;
    color?: SelectOption<Other>;
    glossiness?: SelectOption<Other>;
    drill?: SelectOption<Other>;
    patina?: SelectOption<Other>;
    thermalseam?: SelectOption<Other>;
    roll?: SelectOption<Other>;
    note: string;

    date?: string;
    mail?: string;
    phone?: string;
  }

  interface Facade {
    id: string | number;
    num?: number,
    height?: number;
    width?: number;
    amount?: number;
    type?: SelectOption<FacadeType>;
    note?: string;
  }

  interface Accessorie {
    id: number | string;
    num?: number,
    type?: SelectOption;
    model?: SelectOption;
    height?: number;
    amount?: number;
    note?: string;
  }
}

type Action =
  | { type: "RESET"; payload?: void }
  | { type: "SET_FILES"; payload: FileWithPath[] }
  | { type: "REMOVE_FILES" }
  | { type: "UPDATE_HEADER"; payload: Partial<Order.Header> }
  | { type: "ADD_FACADE"; payload: Order.Facade | Order.Facade[] }
  | { type: "UPDATE_FACADE"; payload: Order.Facade }
  | { type: "REMOVE_FACADE"; payload: number }
  | { type: "ADD_ACCESSORIE"; payload: Order.Accessorie | Order.Accessorie[] }
  | { type: "UPDATE_ACCESSORIE"; payload: Order.Accessorie }
  | { type: "REMOVE_ACCESSORIE"; payload: number };

interface ContextProps {
  state: Order.Data;
  dispatch: Dispatch<Action>;
}

const initialState: Order.Data = {
  header: {
    note: "",
  },
  facades: [],
  accessories: [],
  files: [],
};

const OrderFormContext = createContext<ContextProps | undefined>(undefined);

const orderFormReducer = (state: Order.Data, action: Action): Order.Data => {
  switch (action.type) {
    case "RESET":
      return {
        ...initialState,
      };
    case "UPDATE_HEADER":
      return { ...state, header: { ...state.header, ...action.payload } };
    case "ADD_FACADE":
      return {
        ...state,
        facades: [
          ...state.facades,
          ...(Array.isArray(action.payload)
            ? action.payload
            : [action.payload]),
        ],
      };
    case "UPDATE_FACADE":
      const facadeIndex = state.facades.findIndex(
        (f) => f.id === action.payload.id
      );
      if (facadeIndex < 0) {
        return state;
      }
      state.facades[facadeIndex] = {
        ...state.facades[facadeIndex],
        ...action.payload,
      };
      return {
        ...state,
        facades: [...state.facades],
      };
    case "REMOVE_FACADE":
      return {
        ...state,
        facades: state.facades.filter((_, index) => index !== action.payload),
      };
    case "ADD_ACCESSORIE":
      return {
        ...state,
        accessories: [
          ...state.accessories,
          ...(Array.isArray(action.payload)
            ? action.payload
            : [action.payload]),
        ],
      };
    case "UPDATE_ACCESSORIE":
      const accessorieIndex = state.accessories.findIndex(
        (f) => f.id === action.payload.id
      );
      if (accessorieIndex < 0) {
        return state;
      }
      state.accessories[accessorieIndex] = {
        ...state.accessories[accessorieIndex],
        ...action.payload,
      };
      return {
        ...state,
        accessories: [...state.accessories],
      };
    case "REMOVE_ACCESSORIE":
      return {
        ...state,
        accessories: state.accessories.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "SET_FILES":
      return {
        ...state,
        files: [...action.payload],
      };

    case "REMOVE_FILES":
      return {
        ...state,
        files: [],
      };
    default:
      return state;
  }
};

const OrderFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(orderFormReducer, initialState);

  useEffect(() => {
    const minCount = 3;

    const facadeCount = minCount - state.facades.length;
    const accessorieCount = minCount - state.accessories.length;

    const facadeTempArr: Order.Facade[] = [];
    const accessorieTempArr: Order.Accessorie[] = [];

    if (facadeCount > 0) {
      for (let i = 0; i < facadeCount; i++) {
        facadeTempArr.push({
          id: nanoid(),
        });
      }
    }

    if (accessorieCount > 0) {
      for (let i = 0; i < accessorieCount; i++) {
        accessorieTempArr.push({
          id: nanoid(),
        });
      }
    }

    if (accessorieTempArr.length || facadeTempArr.length) {
      dispatch({ type: "ADD_FACADE", payload: facadeTempArr });
      dispatch({ type: "ADD_ACCESSORIE", payload: accessorieTempArr });
    }

    const lastFacade = state.facades[state.facades.length - 1];
    if (lastFacade && lastFacade.height && lastFacade.height > 0) {
      dispatch({ type: "ADD_FACADE", payload: { id: nanoid() } });
    }

    const lastAccessorie = state.accessories[state.accessories.length - 1];
    if (
      lastAccessorie &&
      ((lastAccessorie.height && lastAccessorie.height > 0) ||
        lastAccessorie.type)
    ) {
      dispatch({ type: "ADD_ACCESSORIE", payload: { id: nanoid() } });
    }
  }, [state]);

  return (
    <OrderFormContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderFormContext.Provider>
  );
};

export { OrderFormProvider, OrderFormContext, Order };
