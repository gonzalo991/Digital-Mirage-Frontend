import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { LoginContext } from '../Context/LoginContext';

const Login = () => {
    const [login, setLogin] = useContext(LoginContext);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(''); // Cambiar "email" a "username"
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);

    const handleChangeUsername = (ev) => {
        const inputUsername = ev.target.value;
        setUsername(inputUsername);
    };

    const validatePassword = (password) => {
        if (password.length < 8) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/[a-z]/.test(password)) {
            return false;
        }
        if (!/[0-9]/.test(password)) {
            return false;
        }
        return true;
    };

    const handleChangePassword = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        setIsValidPassword(validatePassword(inputPassword));
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (isValidPassword) {
            try {
                const response = await axios.post('https://digital-mirage-backend-old-shape-7317.fly.dev/user/login', { username, password });
                setLogin(username);
                console.log(`Respuesta del servidor: ${response.data}`);
                setIsOpen(false);
                navigate("/");
            } catch (error) {
                console.log(`Error al enviar la solicitud de ingreso: ${error}`);
            }
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                className='button is-success hover:bg-esmerald-100 mr-2 text-sm md:text-base'
            >
                Ingresar
            </button>
            <hr />

            <div className={`modal ${isOpen ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Ingreso de usuario</p>
                        <button onClick={closeModal} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <form action="" onSubmit={handleSubmit} method='POST'>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Username" // Cambiar "UserName" a "Username"
                                        name="username" // Cambiar "email" a "username"
                                        onChange={handleChangeUsername}
                                        value={username}
                                    />
                                    {/* Eliminar validación de email */}
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i> {/* Cambiar icono */}
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={handleChangePassword}
                                    />
                                    {isValidPassword ? null : (
                                        <p style={{ color: 'red' }}>
                                            La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.
                                        </p>
                                    )}
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <footer className="modal-card-foot">
                                <button type="submit" className="button is-success">Log in</button>
                            </footer>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Login;


/**
                                    Documentación del componenete
Importación de módulos y funciones:

    El componente importa los módulos y funciones necesarios de React y otras bibliotecas, como useNavigate de React Router y axios para realizar solicitudes HTTP.

Inicialización de estados:

    Se inicializan los estados del componente utilizando el hook useState.
    isOpen controla la visibilidad de un modal.
    username almacena el valor del campo de email.
    isValidEmail se usa para verificar si el email es válido.
    password almacena el valor del campo de contraseña.
    isValidPassword se usa para verificar si la contraseña cumple con ciertas condiciones.

Función de validación de email:

    validateEmail es una función que toma un email como argumento y verifica si cumple con un formato válido utilizando una expresión regular.

Manejo del cambio en el campo de email:

    handleChangeEmail es una función que se ejecuta cuando el usuario cambia el valor del campo de email.
    Actualiza el estado username con el valor del campo de email.
    Llama a validateEmail para verificar si el email es válido y actualiza el estado isValidEmail en consecuencia.

Función de validación de contraseña:

    validatePassword es una función que toma una contraseña como argumento y verifica si cumple con ciertas condiciones, como longitud mínima y presencia de letras mayúsculas, minúsculas y números.
    Manejo del cambio en el campo de contraseña:

    handleChangePassword es una función que se ejecuta cuando el usuario cambia el valor del campo de contraseña.
    Actualiza el estado password con el valor del campo de contraseña.
    Llama a validatePassword para verificar si la contraseña es válida y actualiza el estado isValidPassword en consecuencia.
    Funciones para abrir y cerrar el modal:

    openModal y closeModal se utilizan para controlar la visibilidad del modal. isOpen se actualiza en consecuencia.

Manejo del envío del formulario de inicio de sesión:

    handleSubmit es una función que se ejecuta cuando se envía el formulario de inicio de sesión.
    Previene el comportamiento predeterminado de envío del formulario.
    Verifica si tanto el email como la contraseña son válidos (isValidEmail y isValidPassword).
    Si son válidos, utiliza axios para realizar una solicitud POST al servidor con los datos de inicio de sesión (email y contraseña).
    Si la solicitud es exitosa, muestra la respuesta en la consola y navega al destino correspondiente.
    Si la solicitud falla, muestra un mensaje de error en la consola.
 */
