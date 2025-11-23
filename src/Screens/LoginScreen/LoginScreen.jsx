import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router' // Asegúrate de que sea 'react-router-dom' si usas v6
import { login } from '../../services/authService'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../Context/AuthContext'
import './LoguinScreen.css' // <--- IMPORTANTE: Importar el CSS

const LoginScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { onLogin } = useContext(AuthContext)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const from = query.get('from')
    if (from === 'verified_email') {
      // Sugerencia: Usar un estado para mostrar esto en el UI en vez de alert
      alert('Has validado tu mail exitosamente')
    }
  }, [])

  const LOGIN_FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password'
  }

  const initial_form_state = {
    [LOGIN_FORM_FIELDS.EMAIL]: '',
    [LOGIN_FORM_FIELDS.PASSWORD]: ''
  }

  const { response, error, loading, sendRequest, resetResponse } = useFetch()

  function handleLogin(form_state_sent) {
    resetResponse()
    sendRequest(() => {
      return login(
        form_state_sent[LOGIN_FORM_FIELDS.EMAIL],
        form_state_sent[LOGIN_FORM_FIELDS.PASSWORD]
      )
    })
  }

  const {
    form_state,
    onInputChange,
    handleSubmit,
  } = useForm(initial_form_state, handleLogin)

  useEffect(() => {
    if (response && response.ok) {
      // Ajusta esto según cómo venga tu token real (body.token, data.token, etc)
      onLogin(response.body ? response.body.auth_token : response.token)
    }
  }, [response])

  return (
    <div className="login-page">

      {/* HEADER: Logo y Títulos */}
      <header className="login-header">
        <div className='slack'>
          <img
            src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
            alt="Slack Logo"
            className="slack-logo"
          />
          <span className='name-slack'>Slack</span>
        </div>
        <h1>Escribe tu correo electrónico para iniciar sesión</h1>
        <p className="sub-header">O elige otra opción</p>
      </header>

      {/* FORMULARIO */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            {/* Label oculto visualmente pero presente por accesibilidad */}
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="nombre@work-email.com"
              className="input-slack"
              value={form_state[LOGIN_FORM_FIELDS.EMAIL]}
              name={LOGIN_FORM_FIELDS.EMAIL}
              onChange={onInputChange}
              id={'email'}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              className="input-slack"
              value={form_state[LOGIN_FORM_FIELDS.PASSWORD]}
              name={LOGIN_FORM_FIELDS.PASSWORD}
              onChange={onInputChange}
              id={'password'}
            />
          </div>

          {error && <span className="message-error">Warning: {error}</span>}
          {response && <span className="message-success">Successful Login</span>}

          <button className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Continuar'}
          </button>
        </form>

        {/* DIVISOR */}
        <div className="divider">OTRAS OPCIONES</div>

        {/* BOTONES SOCIALES (Visuales) */}
        <div className="social-buttons">
          <button className="btn-social" type="button">
            {/* Google G simple icon SVG */}
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 10.86-2.14 14.82-5.8l-7.73-6c-2.15 1.45-4.92 2.3-7.09 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /><path fill="none" d="M0 0h48v48H0z" /></svg>
            Google
          </button>
          <button className="btn-social" type="button">
            {/* Apple Icon SVG */}
            <svg width="18" height="18" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" /></svg>
            Apple
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="login-footer">
        <a href="#">Privacidad y términos</a>
        <a href="#">Contactarnos</a>
        <a href="#">Cambiar región ⌄</a>
      </footer>

    </div>
  )
}

export default LoginScreen