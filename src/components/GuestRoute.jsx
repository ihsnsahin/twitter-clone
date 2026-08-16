import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

function GuestRoute({ children, ...rest }) {

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
            render={() =>
                isAuthenticated
                    ? <Redirect to="/" />
                    : children
            }
        />
    );
}
export default GuestRoute;