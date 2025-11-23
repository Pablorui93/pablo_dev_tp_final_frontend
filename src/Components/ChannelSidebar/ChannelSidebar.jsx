
import React, { useEffect } from 'react'
import ChannelList from '../ChannelList/ChannelList' 
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router'
import { getChannelList } from '../../services/channelService'
import { useNavigate } from 'react-router'
import CreateChannelForm from '../CreateChannelForm/CreateChannelForm.jsx'; // Componente para crear canales

const ChannelSidebar = () => {
    const {
        response,
        loading,
        error,
        sendRequest
    } = useFetch()
    const { workspace_id } = useParams()

    function loadChannelList() {
        if (!workspace_id) return;
        
        sendRequest(
            async () => {
                return await getChannelList(workspace_id)
            }
        )
    }

    // Apenas se cargue el componente, ejecutamos la carga inicial
    useEffect(
        () => {
            loadChannelList()
        },
        [workspace_id] 
    )

    console.log(response, error, loading)

    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <aside>
            
            {/* Formulario de Creación (con prop de recarga) */}
            <CreateChannelForm 
                workspace_id={workspace_id} 
                onChannelCreated={loadChannelList} 
                />
                <h3>Canales:</h3>
            
            {
                loading && <span>Cargando...</span>
            }
            {
                
                response && response.data && response.data.channels && (
                    <ChannelList 
                        channel_list={response.data.channels} 
                        // Le pasamos las funciones de acción y recarga al componente hijo
                        workspace_id={workspace_id}
                        onChannelDeleted={loadChannelList} 
                    />
                )
            }
            {
                error && <span style={{ color: 'red' }}>Error al obtener la lista de canales</span>
            }
            <button onClick={handleGoBack}>
                ← Volver
            </button>
        </aside>
    )
}

export default ChannelSidebar