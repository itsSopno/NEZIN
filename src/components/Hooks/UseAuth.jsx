import { useContext } from "react";
import AuthProvider from "../../Auth/AuthProvider";
import { AuthContext } from "../../Auth/AuthContext";
const UseAuth = () => {
    return useContext(AuthContext);
}
export default UseAuth;