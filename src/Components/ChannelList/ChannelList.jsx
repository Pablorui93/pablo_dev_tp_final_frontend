
import React from 'react'
import { Link, useParams } from 'react-router'
import { Trash2 } from 'lucide-react' // Ícono de basura
import { deleteChannel } from '../../services/channelService.js' 


const ChannelList = ({ channel_list, workspace_id, onChannelDeleted }) => {
    

    const handleDelete = async (channel_id, channel_name) => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar el canal #${channel_name}? Esta acción también eliminará todos sus mensajes.`)) {
            return;
        }

        try {
            await deleteChannel(workspace_id, channel_id);
            
            if (onChannelDeleted) {
                onChannelDeleted();
            }

        } catch (error) {
            console.error('Error al eliminar canal:', error);
            alert(`No se pudo eliminar el canal: ${error.message}`);
        }
    }


    const listItemStyle = {
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '5px 0',
        transition: 'background-color 0.2s',
        borderRadius: '4px'
    };

    const linkStyle = {
        color: 'white', 
        textDecoration: 'none', 
        flexGrow: 1, 
        padding: '5px'
    };

    const buttonStyle = {
        background: 'none', 
        border: 'none', 
        color: '#ff6b6b', 
        cursor: 'pointer', 
        padding: '5px',
        opacity: 0, 
        transition: 'opacity 0.2s'
    };


    const handleMouseOver = (e) => {
        const button = e.currentTarget.querySelector('.delete-button');
        if (button) button.style.opacity = 1;
    };

    const handleMouseOut = (e) => {
        const button = e.currentTarget.querySelector('.delete-button');
        if (button) button.style.opacity = 0;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                channel_list.length === 0
                    ? <span>Aun no has creado ningun canal</span>
                    : channel_list.map(
                        (channel) => {
                            return (
                                <div 
                                    key={channel._id} 
                                    style={listItemStyle}
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                >
                                    <Link 
                                        style={linkStyle} 
                                        to={`/workspace/${workspace_id}/${channel._id}`}
                                    >
                                        #{channel.name}
                                    </Link>
                                    
                                    <button 
                                        className="delete-button"
                                        style={buttonStyle}
                                        onClick={() => handleDelete(channel._id, channel.name)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )
                        }
                    )
            }
        </div>
    )
}

export default ChannelList