import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getMessagesByChannelId, createMessageByChannelId, deleteMessageById } from '../../services/messagesService.js'
import CreateNewMessage from '../CreateNewMessage/CreateNewMessage.jsx'
import './ChannelDetail.css'




const ChannelDetail = () => {
    const { channel_id, workspace_id } = useParams()
    console.log(channel_id, workspace_id)
    if (!channel_id) {
        return (
            <div>
                <span>Canal no seleccionado</span>
            </div>
        )
    }

    const { response, error, loading, sendRequest } = useFetch()
    useEffect(
        () => {
            async function loadMessages() {
                await sendRequest(
                    () => getMessagesByChannelId(workspace_id, channel_id))
            }
            loadMessages(channel_id)
        },
        [
            channel_id
        ]
    )

    console.log(response, error, loading)
    const onSubmitNewMessage = (form_state) => {
        sendRequest(
            () => createMessageByChannelId(workspace_id, channel_id, form_state.content)
        )
    }

    const onDeleteMessage = (message_id) => {
        
        sendRequest(
            () => deleteMessageById(workspace_id, channel_id, message_id)
        )
    }
    console.log(response)
    return (
        <div>
            <div className='container-messages'>
                <span>Canal: {channel_id}</span>
                {loading && <div>Cargando mensajes...</div>}
                {error && <div>Error al cargar: {error.message}</div>}
                {response && response.data && (
                    <ul style={{ listStyle: "none", margin: "15px", padding: "10px" }}>
                        {response.data.messages.map((message) => (
                            <li key={message._id} > {message.message_content} <button
                                style={{ marginLeft: "10px", color: "red", cursor: "pointer", fontSize: "10px", fontWeight: "bold" }}
                                onClick={() => onDeleteMessage(message._id)}
                                disabled={loading}
                            >
                                🗑️Eliminar
                            </button></li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='component-message'>
                <CreateNewMessage onSubmit={onSubmitNewMessage} />
            </div>
        </div>
    )
}
export default ChannelDetail
