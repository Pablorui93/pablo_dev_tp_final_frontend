// import React, { useState } from 'react';
// import useForm from '../../hooks/useForm.jsx'; // Asumiendo esta ruta
// import useFetch from '../../hooks/useFetch.jsx'; // Asumiendo esta ruta
// import { inviteMember } from '../../services/workspaceService.js'; // Importar la función del servicio
// import { Send, UserPlus, CheckCircle, AlertTriangle } from 'lucide-react';
// import './InviteMemberForm.css';

// // Estado inicial del formulario
// const initialFormState = {
//     email_invited: '',
//     role_invited: 'user' // Por defecto, se invita como 'user'
// };

// const InviteMemberForm = ({ workspace_id }) => {
//     // Hooks para manejar el formulario y la petición
//     const { form_state, onInputChange, handleSubmit, resetForm } = useForm(initialFormState, handleInviteSubmit);
//     const { response, error, loading, sendRequest, resetResponse } = useFetch();

//     // Estado local para mostrar el formulario o el botón de abrir
//     const [isFormOpen, setIsFormOpen] = useState(false);

//     // Función que se ejecuta al enviar el formulario
//     async function handleInviteSubmit(form_state) {
//         // Aseguramos que el email no esté vacío
//         if (!form_state.email_invited) return;

//         try {
//             // Llamamos a la función del servicio para enviar la invitación
//             await sendRequest(() => inviteMember(
//                 workspace_id,
//                 form_state.email_invited,
//                 form_state.role_invited
//             ));

//             // Si tiene éxito, reseteamos el formulario
//             resetForm();
//             // El estado 'response' del useFetch ahora indicará el éxito

//         } catch (e) {
//             // El estado 'error' del useFetch manejará la excepción
//             console.error('Error en la invitación:', e);
//         }
//     }

//     // Maneja la apertura y cierre del formulario
//     const toggleForm = () => {
//         setIsFormOpen(!isFormOpen);
//         resetResponse(); // Limpiar mensajes de éxito/error al abrir/cerrar
//     };

//     return (
//         <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
//             {/* Botón para abrir el formulario */}
//             {!isFormOpen && (
//                 <button
//                     onClick={toggleForm}
//                     className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
//                     disabled={loading}
//                 >
//                     <UserPlus size={20} />
//                     <span>Invitar Miembro</span>
//                 </button>
//             )}

//             {/* Formulario de Invitación (Visible al hacer clic) */}
//             {isFormOpen && (
//                 <div className="space-y-4">
//                     <div className="flex justify-between items-center border-b pb-2 mb-3">
//                         <h3 className="text-lg font-semibold text-gray-700">Invitar a un nuevo miembro</h3>
//                         <button onClick={toggleForm} className="text-gray-500 hover:text-gray-800 transition">
//                             Cerrar
//                         </button>
//                     </div>

//                     {/* Mensajes de Estado */}
//                     {loading && (
//                         <div className="flex items-center space-x-2 text-blue-600">
//                             <Send size={18} className="animate-pulse" />
//                             <span>Enviando invitación...</span>
//                         </div>
//                     )}
//                     {error && (
//                         <div className="flex items-center space-x-2 text-red-600 bg-red-100 p-2 rounded">
//                             <AlertTriangle size={18} />
//                             <span>Error: {error}</span>
//                         </div>
//                     )}
//                     {response && response.message && !error && (
//                         <div className="flex items-center space-x-2 text-green-600 bg-green-100 p-2 rounded">
//                             <CheckCircle size={18} />
//                             <span>¡{response.message}! Se ha enviado el correo.</span>
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-3">
//                         {/* Campo de Correo Electrónico */}
//                         <input
//                             type="email"
//                             name="email_invited"
//                             placeholder="Correo electrónico del invitado"
//                             value={form_state.email_invited}
//                             onChange={onInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                             required
//                             disabled={loading}
//                         />

//                         {/* Campo de Rol (Selector simple) */}
//                         <select
//                             name="role_invited"
//                             value={form_state.role_invited}
//                             onChange={onInputChange}
//                             className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                             disabled={loading}
//                         >
//                             <option value="user">Miembro Estándar</option>
//                             <option value="admin">Administrador (Admin)</option>
//                         </select>

//                         {/* Botón de Envío */}
//                         <button
//                             type="submit"
//                             className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
//                             disabled={loading || !form_state.email_invited}
//                         >
//                             {loading ? 'Enviando...' : 'Enviar Invitación'}
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default InviteMemberForm;


import React, { useState } from 'react';
import useForm from '../../hooks/useForm.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { inviteMember } from '../../services/workspaceService.js';
import { Send, UserPlus, CheckCircle, AlertTriangle, X } from 'lucide-react'; // Aseguramos la importación de X
import './InviteMemberForm.css'; // ⭐ Importamos el nuevo archivo CSS ⭐

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