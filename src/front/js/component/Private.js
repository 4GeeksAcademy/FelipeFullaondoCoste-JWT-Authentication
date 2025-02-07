import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Private = () => {
    const { store } = useContext(Context);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchPrivateData = async () => {
            const token = localStorage.getItem("token");
            const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await resp.json();
            if (resp.ok) {
                setMessage(data.message);
            } else {
                setMessage("No autorizado");
            }
        };

        fetchPrivateData();
    }, []);


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-center">Ruta Privada</h4>
                            <hr />
                            <div className="text-center">
                                <p>
                                    Ir al {" "}
                                    <Link to="/">Home</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

