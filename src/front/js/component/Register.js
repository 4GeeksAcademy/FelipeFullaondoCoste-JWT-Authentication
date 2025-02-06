import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llamada a la acción para registrar al usuario
        const data = await actions.getRegister(email, password);

        if (data) {
            // Si el registro es exitoso, redirigimos al usuario a la página de inicio o login
            navigate("/login"); // Puedes ajustar la ruta según lo que desees
        } else {
            setError(store.error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-center">Registro</h4>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group my-2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Ingrese su email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Ingrese su contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block my-2">
                                    Registrarse
                                </button>
                            </form>
                            <hr />
                            <div className="text-center">
                                <p>
                                    ¿Ya tienes cuenta?{" "}
                                    <Link to="/login">Inicia sesión aquí</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
