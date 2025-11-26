import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

export const useAuth = () => {
    const auth_info = useContext(AuthContext);

    return auth_info;
}