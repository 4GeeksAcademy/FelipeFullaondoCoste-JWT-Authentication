import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);

    const handleLogout = () => {
        actions.logout();
    };

    return (
        <div className="text-center mt-5">
            {store.user ? (
                <button onClick={handleLogout} className="btn btn-danger">
                    LogOut
                </button>
            ) : (
				<>
					<Link to="/login">
						<h1>Ir a Login</h1>
					</Link>
					<Link to="/register">
						<h1>Registrarse</h1>
					</Link>
				</>
            )}

            <h1>Hello Rigo!!</h1>
            <p>
                <img src={rigoImageUrl} alt="rigo-baby" />
            </p>
            <div className="alert alert-info">
                {store.message || "Loading message from the backend (make sure your python backend is running)..."}
            </div>
            <p>
                This boilerplate comes with lots of documentation:{" "}
                <a href="https://start.4geeksacademy.com/starters/react-flask">
                    Read documentation
                </a>
            </p>
        </div>
    );
};
