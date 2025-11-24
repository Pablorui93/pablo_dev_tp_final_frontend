
import React, { useState } from 'react'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import './RegisterScreen.css' 
import { Link } from 'react-router'

const RegisterScreen = () => {

    const REGISTER_FORM_FIELDS = {
        USERNAME: 'username',
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    const initial_form_state = {
        [REGISTER_FORM_FIELDS.USERNAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    }

    const { response, error, loading, sendRequest } = useFetch()

    function onRegister(form_state_sent) {

        sendRequest(
            () => {
                return register(
                    form_state_sent[REGISTER_FORM_FIELDS.USERNAME],
                    form_state_sent[REGISTER_FORM_FIELDS.EMAIL],
                    form_state_sent[REGISTER_FORM_FIELDS.PASSWORD]
                )
            }
        )
    }

    const {
        form_state,
        onInputChange,
        handleSubmit,
    } = useForm(
        initial_form_state,
        onRegister
    )


    return (
        <div className="login-page">

            <header className="login-header">
                <div className='slack'>
                    <img
                        src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
                        alt="Slack Logo"
                        className="slack-logo"
                    />
                    <span className='name-slack'>Slack</span>
                </div>
                <h1>Crea tu cuenta</h1>
                <p className="sub-header">¡Es gratis y fácil!</p>
            </header>


            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='form-field'>
                        {/* El label está oculto por CSS, pero es bueno para accesibilidad */}
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            type="text"
                            placeholder='Nombre de usuario (ej: Pepe)'
                            value={form_state[REGISTER_FORM_FIELDS.USERNAME]}
                            name={REGISTER_FORM_FIELDS.USERNAME}
                            id='username'
                            onChange={onInputChange}
                            className='input-slack'
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            placeholder='Tu correo electrónico'
                            value={form_state[REGISTER_FORM_FIELDS.EMAIL]}
                            name={REGISTER_FORM_FIELDS.EMAIL}
                            onChange={onInputChange}
                            id={'email'}
                            className='input-slack'
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            placeholder='Contraseña (mínimo 6 caracteres)'
                            value={form_state[REGISTER_FORM_FIELDS.PASSWORD]}
                            name={REGISTER_FORM_FIELDS.PASSWORD}
                            onChange={onInputChange}
                            id={'password'}
                            className='input-slack'
                        />
                    </div>

                    {error && <span className="message-error">Error: {error} </span>}
                    {response && <span className="message-success">¡Usuario registrado con éxito! Te enviamos un correo.</span>}

                    <button className="btn-primary" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>

                    <div className="divider">O YA TIENES CUENTA</div>

                    <p className="sub-header" style={{ textAlign: 'center' }}>
                        <Link href="/login">Ir a Iniciar Sesión</Link>
                    </p>

                </form>
            </div>

            <footer className="login-footer">
                <a href="#">Privacidad y términos</a>
                <a href="#">Contactarnos</a>
                <a href="#">Cambiar región ⌄</a>
            </footer>
        </div>
    )
}

export default RegisterScreen