
import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

function ProtectedRoute({ children, ...rest }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/me", {
            withCredentials: true
        })
            .then(() => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);
    return (
        <Route
            {...rest}
            render={() => {
                if (isAuthenticated === null) {
                    return <div>Loading...</div>;
                }
                return isAuthenticated
                    ? children
                    : <Redirect to="/login" />;
            }}
        />)
}
export default ProtectedRoute;