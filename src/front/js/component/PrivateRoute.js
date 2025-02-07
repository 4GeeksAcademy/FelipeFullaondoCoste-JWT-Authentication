import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const PrivateRoute = ({ element }) => {
    const { store, actions } = useContext(Context);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!store.token && token) {
            actions.setToken(token);
        }
    }, [store.token, token]);

    return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
