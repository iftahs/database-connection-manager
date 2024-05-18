import axios from "axios";
import { createContext, useReducer, useEffect } from "react";

export enum DatabaseType {
    Snowflake = "Snowflake",
    Trino = "Trino",
    MySQL = "MySQL",
}

enum ActionType {
    START_ASYNC_ACTION = "START_ASYNC_ACTION",
    SET_DATABASES = "SET_DATABASES",
    ADD_DATABASE = "ADD_DATABASE",
    RESET_ERROR = "RESET_ERROR",
}

type Database = {
    id: number | string;
    name: string;
    username: string;
    password: string;
    type: DatabaseType;
    url: string;
};

type DatabasesState = {
    databases: Database[];
    error: string | null;
    isLoading?: boolean;
    resetError: () => void;
    addDatabase: (database: Database) => void;
};

const initialState: DatabasesState = {
    databases: [],
    error: null,
    isLoading: false,
    resetError: () => {},
    addDatabase: () => {},
};

export const DatabasesContext = createContext<DatabasesState>(initialState);

const databasesReducer = (state: DatabasesState, action: any) => {
    switch (action.type) {
        case ActionType.START_ASYNC_ACTION:
            return {
                ...state,
                isLoading: true,
            };
        case ActionType.SET_DATABASES:
            return {
                ...state,
                databases: action.payload,
                isLoading: false,
                error: action.error,
            };
        case ActionType.ADD_DATABASE:
            return {
                ...state,
                databases: [...state.databases, action.payload],
                isLoading: false,
                error: null,
            };
        case ActionType.RESET_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

interface DatabasesProviderProps {
    children: React.ReactNode;
}

export const DatabasesProvider: React.FC<DatabasesProviderProps> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(databasesReducer, initialState);

    useEffect(() => {
        dispatch({ type: ActionType.START_ASYNC_ACTION });
        axios.get("http://localhost:4000/databases").then((response) => {
            dispatch({
                type: ActionType.SET_DATABASES,
                payload: response.data,
            });
        }).catch((error) => {
            dispatch({
                type: ActionType.SET_DATABASES,
                payload: [],
                error: error.message,
            })
        });
    }, []);

    const resetError = () => {
        dispatch({ type: ActionType.RESET_ERROR });
    }

    const addDatabase = (database: Database) => {
        dispatch({ type: ActionType.START_ASYNC_ACTION });
        axios.post("http://localhost:4000/databases", database).then(() => {
            dispatch({ type: ActionType.ADD_DATABASE, payload: database });
        }).catch((error) => {   
            dispatch({
                type: ActionType.SET_DATABASES,
                payload: [],
                error: error.message,
            });
        });
    };

    state.resetError = resetError;
    state.addDatabase = addDatabase;

    return (
        <DatabasesContext.Provider value={state}>
            {children}
        </DatabasesContext.Provider>
    );
};
