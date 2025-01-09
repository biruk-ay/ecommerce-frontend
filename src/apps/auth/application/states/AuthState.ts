import SMState from "../../../../lib/sm/state/smState";


export default interface AuthState extends SMState{
    
    isLoggedIn: boolean;
    name?: string | null;
    email?: string | null;
    token?: string | null;
    password?: string | null;
    


}