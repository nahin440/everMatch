import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvier";


const UseAuth = () => {
    const auth = useContext(AuthContext);
    return auth ;
};

export default UseAuth;