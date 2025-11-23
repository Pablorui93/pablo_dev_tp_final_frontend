import React, { useState } from 'react'
import { ArrowRight, Plus } from 'lucide-react'
import useForm from '../../hooks/useForm'



const initialFormState = {
    name: '',
    url_img: ''
}
const CreateWorkspaceForm = ({ onSubmit, loading }) => {
    const { form_state, onInputChange, handleSubmit } = useForm(initialFormState, onSubmit)
    const [isOpen, setIsOpen] = useState(false)

    if (!isOpen) {
        return (
            <button className="create-button" onClick={() => setIsOpen(true)} disabled={loading}>
                <span>
                    <Plus size={24} className="create-icon" />
                    Crear un nuevo espacio de trabajo
                </span>
                <ArrowRight size={20} className="card-arrow" />
            </button>
        )
    }

    return (
        <div className="creation-modal">
            <h3 className="text-xl font-bold mb-4">Nuevo Workspace</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del Workspace"
                    value={form_state.name}
                    onChange={onInputChange}
                    className="p-2 border rounded"
                    required
                    disabled={loading}
                />
                <input
                    type="text"
                    name="url_img"
                    placeholder="URL de Imagen (Opcional)"
                    value={form_state.url_img}
                    onChange={onInputChange}
                    className="p-2 border rounded"
                    disabled={loading}
                />
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-300 text-gray-800 p-2 rounded" disabled={loading}>
                        Cancelar
                    </button>
                    <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700" disabled={loading}>
                        {loading ? 'Creando...' : 'Crear Workspace'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateWorkspaceForm 