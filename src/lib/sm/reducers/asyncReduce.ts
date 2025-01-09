import { Store } from "redux";
import { changeStatus, SMActionType } from "../actions/smActions";

async function asyncReduce({
    onEvent,
    store
}:{
    onEvent: any,
    store: Store
}){
    try{
        store.dispatch(changeStatus({type: SMActionType.SET_LOADING}));
        const newState = await onEvent();        
        store.dispatch(changeStatus({type: SMActionType.SET_DONE, newState: newState}));
    }   catch(ex){        
        store.dispatch(changeStatus({type: SMActionType.SET_FAILED, exception: ex}))
    }
}

export default asyncReduce;