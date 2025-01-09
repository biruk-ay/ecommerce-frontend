import { Reducer } from "redux";
import SMState from "../state/smState";
import { SMActionType } from "../actions/smActions";
import SMStatus from "../state/smStatus";
import SMAction from "../actions/smAction";



const smReducer = (state: SMState, action: SMAction, reducerMap: Map<string, Reducer>) => {

    console.log("Action type:", action.type);
    console.log("Reducer map keys:", Array.from(reducerMap.keys()));
    
    switch(action.type){
        case SMActionType.SET_LOADING:
           return {...state, status: SMStatus.loading};

        case SMActionType.SET_DONE:
            return {...(action.payload as any).newState, status: SMStatus.done};

        case SMActionType.SET_FAILED:
            return {...state, error: (action.payload as any).exception,  status: SMStatus.failed};
        default:
                // Check for custom reducers in the reducerMap
            if (reducerMap.has(action.type)) {
                return reducerMap.get(action.type)!(state, action as any);
            }
            // Default: return the current state
            return state;
    }


    // for(const type of reducerMap.keys()){
    //     if(type===action.type){
    //         return reducerMap.get(type)!(state, action);
    //     }
    // }

    // throw new Error(`Reducer not implemented for action type: ${action.type}`);

}


export default smReducer;



