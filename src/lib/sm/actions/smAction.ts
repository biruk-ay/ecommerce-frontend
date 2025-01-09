import { Action } from "redux";

interface SMAction<T = any> extends Action {
    payload: T; // Specify the type of payload
    store?: any; // If the store is part of the action
}

export default SMAction;
