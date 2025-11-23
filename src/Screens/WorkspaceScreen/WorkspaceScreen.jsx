import React from 'react'
import { Home, Bell, Archive, Settings, Plus, MoreHorizontal } from 'lucide-react';
import ChannelSidebar from '../../Components/ChannelSidebar/ChannelSidebar'
import ChannelDetail from '../../Components/ChannelDetail/ChannelDetail'
import './WorkspaceScreen.css'
import InviteMemberForm from '../../Components/InviteMemberForm/InviteMemberForm'
import { useParams } from 'react-router'


const WorkspaceScreen = () => {
    const { workspace_id } = useParams();
    return (
        <div className='workspace-container'>
            <div className='column-1'>
                <div className='column-1-1'>
                <span><Home size={20}  />Inicio</span>
                <span><Bell size={20} /> Actividad</span>
                <span> <Archive size={20} />Archivos</span>
                <span> <MoreHorizontal size={20} />Mas</span>
                <span> <Settings size={24} />Adminis-<span>trador</span></span>
                </div>
                <div className='column-1-2'>
                        <Home size={24} />
                        <Plus size={24} className="create-icon" />
                </div>
            </div>
            <div className='d2'>
                <InviteMemberForm workspace_id={workspace_id} />
                <ChannelSidebar />
            </div>
            <div className='d3'>
                <ChannelDetail />
            </div>
        </div>
    )
}

export default WorkspaceScreen

