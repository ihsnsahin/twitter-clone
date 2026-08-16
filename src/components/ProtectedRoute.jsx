
import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../services/tanStack";

function ProtectedRoute({ children, ...rest }) {
    //const [isAuthenticated, setIsAuthenticated] = useState(null);

    /*useEffect(() => {
            axios.get("http://localhost:3000/me", {
                withCredentials: true
            })
                .then(() => {
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                });
        }, []);*/
    const { data: currentUser, isPending, error } = useCurrentUser();
    return (
        <Route
            {...rest}
            render={() => {
                if (isPending) {
                    return <div>Loading...</div>;
                }
                const isAuthenticated = !!currentUser && !error;
                return isAuthenticated
                    ? children
                    : <Redirect to="/login" />;
            }}
        />)
}
export default ProtectedRoute;