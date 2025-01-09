import SMState from "../state/smState";

enum SMActionType{

    SET_LOADING = "SET_LOADING",
    SET_DONE = "SET_DONE",
    SET_FAILED = "SET_FAILED"

}


function changeStatus({
    type,
    newState,
    exception
}: {
    type: SMActionType,
    newState?: SMState,
    exception?: any
}){
    return {
        type: type,
        payload: {
            newState,
            exception
        }
    }
}


export {SMActionType, changeStatus};
