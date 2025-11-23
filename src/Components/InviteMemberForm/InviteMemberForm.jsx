
import React, { useState } from 'react';
import useForm from '../../hooks/useForm.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { inviteMember } from '../../services/workspaceService.js';
import { Send, UserPlus, CheckCircle, AlertTriangle, X } from 'lucide-react'; 
import './InviteMemberForm.css'; 

// Estado inicial del formulario
const initialFormState = {
    email_invited: '',
    role_invited: 'user' // Por defecto, se invita como 'user'
};

const InviteMemberForm = ({ workspace_id }) => { 
    // Hooks para manejar el formulario y la petición
    const { form_state, onInputChange, handleSubmit, resetForm } = useForm(initialFormState, handleInviteSubmit);
    const { response, error, loading, sendRequest, resetResponse } = useFetch();

    // Estado local para mostrar el formulario o el botón de abrir
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Función que se ejecuta al enviar el formulario
    async function handleInviteSubmit(form_state) {
        if (!form_state.email_invited) return;

        try {
            if (!workspace_id) {
                // Simular un error si el ID es nulo
                throw new Error("ID del Workspace no disponible.");
            }
            
            await sendRequest(() => inviteMember(
                workspace_id,
                form_state.email_invited, 
                form_state.role_invited
            ));
            
            resetForm();
            
        } catch (e) {
            console.error('Error en la invitación:', e);
        }
    }

    // Maneja la apertura y cierre del formulario
    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
        resetResponse(); // Limpiar mensajes de éxito/error al abrir/cerrar
    };

    return (

        <div className="invite-form-container">
            
            {/* Botón para abrir el formulario */}
            {!isFormOpen && (

                <button
                    onClick={toggleForm}
                    className="open-form-button"
                    disabled={loading}
                >
                    <UserPlus size={16} />
                    <span>Invitar Miembro</span>
                </button>
            )}

            {/* Formulario de Invitación (Visible al hacer clic) */}
            {isFormOpen && (

                <div className="invite-form-modal">
                    
                    {/* Cabecera y Botón de Cerrar */}
                    <div className="modal-header">
                        <h3 className="modal-title">Invitar a un nuevo miembro</h3>
                        <button onClick={toggleForm} className="close-button">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Mensajes de Estado */}
                    {loading && (

                        <div className="status-message status-loading">
                            <Send size={18} className="animate-pulse" />
                            <span>Enviando invitación...</span>
                        </div>
                    )}
                    {error && (

                        <div className="status-message status-error">
                            <AlertTriangle size={18} />
                            <span>Error: {error.message}</span>
                        </div>
                    )}
                    {response && response.message && !error && (

                        <div className="status-message status-success">
                            <CheckCircle size={18} />
                            <span>¡{response.message}! Se ha enviado el correo.</span>
                        </div>
                    )}

                    {/* Formulario */}

                    <form onSubmit={handleSubmit} className="invite-form">
                        {/* Campo de Correo Electrónico */}
                        <input
                            type="email"
                            name="email_invited"
                            placeholder="Correo electrónico del invitado"
                            value={form_state.email_invited}
                            onChange={onInputChange}
                            className="invite-input" 
                            required
                            disabled={loading}
                        />

                        {/* Campo de Rol (Selector simple) */}
                        <select
                            name="role_invited"
                            value={form_state.role_invited}
                            onChange={onInputChange}
                            className="invite-select" 
                            disabled={loading}
                        >
                            <option value="user">Miembro Estándar</option>
                            <option value="admin">Administrador (Admin)</option>
                        </select>

                        {/* Botón de Envío */}
                        <button 
                            type="submit" 
                            className="submit-invite-button" 
                            disabled={loading || !form_state.email_invited}
                        >
                            {loading ? 'Enviando...' : 'Enviar Invitación'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default InviteMemberForm;