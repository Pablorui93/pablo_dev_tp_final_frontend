import React, { useState } from 'react';
import useForm from '../../hooks/useForm.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { createChannel } from '../../services/channelService.js'; // Asumimos esta ruta
import { Plus, X, Hash } from 'lucide-react';
import './CreateChannelForm.css';

// Estado inicial del formulario
const initialFormState = {
    name: ''
};

const CreateChannelForm = ({ workspace_id, onChannelCreated }) => {
    // Usamos useFetch para manejar el estado de la petición
    const { response, error, loading, sendRequest, resetResponse } = useFetch();
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Función que se llama al enviar el formulario
    async function handleChannelSubmit(form_state) {
        if (!form_state.name) return;

        try {
            await sendRequest(() => createChannel(
                workspace_id,
                form_state.name.toLowerCase().replace(/\s/g, '-') // Normalizar el nombre del canal (ej: 'mi canal' -> 'mi-canal')
            ));
            
            // Si tiene éxito: 
            resetForm();
            setIsFormOpen(false);
            if (onChannelCreated) {
                // Notificar al componente padre que se recargue la lista de canales
                onChannelCreated(); 
            }

        } catch (e) {
            console.error('Error al crear canal:', e);
            // El error ya está en el estado 'error' de useFetch
        }
    }

    const { form_state, onInputChange, handleSubmit, resetForm } = useForm(initialFormState, handleChannelSubmit);
    
    // Muestra el botón de abrir o el formulario
    if (!isFormOpen) {
        return (
            <button 
                onClick={() => { setIsFormOpen(true); resetResponse(); }} 
                className="channel-create-button"
                disabled={loading}
            >
                <Plus className='add' size={16} />
                <span className='add'>Agregar canales</span>
            </button>
        );
    }

    return (
        <div className="channel-form-modal">
            <div className="modal-header">
                <h3 className="modal-title">Crear un canal</h3>
                <button onClick={() => { setIsFormOpen(false); resetResponse(); }} className="close-button">
                    <X size={20} />
                </button>
            </div>

            {/* Mensajes de estado */}
            {loading && <p className="status-loading">Creando canal...</p>}
            {error && <p className="status-error">Error: {error.message}</p>}
            {response && response.message && <p className="status-success">¡Canal creado! {response.message}</p>}
            <form onSubmit={handleSubmit} className="channel-form">
                <div className="input-group">
                    <Hash size={16} className="hash-icon" />
                    <input
                        type="text"
                        name="name"
                        placeholder="ej. planeacion-proyecto"
                        value={form_state.name}
                        onChange={onInputChange}
                        className="channel-input"
                        required
                        disabled={loading}
                    />
                </div>
                
                <button type="submit" className="submit-button" disabled={loading || !form_state.name}>
                    {loading ? 'Creando...' : 'Crear Canal'}
                </button>
            </form>
        </div>
    );
};

export default CreateChannelForm;