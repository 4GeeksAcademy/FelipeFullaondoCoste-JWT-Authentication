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
                <>

                    <Link to="/private" className="btn btn-warning m-2">
                        Ruta privada
                    </Link>
                    <button onClick={handleLogout} className="btn btn-danger m-2">
                        LogOut
                    </button>
                </>
            ) : (
				<>
					<Link to="/login" className="btn btn-primary m-2">
						<h1>Ir a Login</h1>
					</Link>
					<Link to="/register" className="btn btn-primary m-2">
						<h1>Registrarse</h1>
					</Link>
                    <Link to="/private" className="btn btn-warning m-2">
                        Ruta privada
                    </Link>
				</>
            )}
        </div>
    );
};
