import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { getWorkspaces, createWorkspace, deleteWorkspace, } from '../../services/workspaceService'
import { Link, useNavigate } from 'react-router' // Aseguramos 'react-router-dom'
import { User, ArrowRight, Plus, XCircle } from 'lucide-react'
import './HomeScreen.css' // Importamos los nuevos estilos
import CreateWorkspaceForm from '../../Components/CreateWorkspaceForm/CreateWorkspaceForm'
import InviteMemberForm from '../../Components/InviteMemberForm/InviteMemberForm'
import { useParams } from 'react-router'

const HomeScreen = () => {


  // Usamos useFetch para TODAS las peticiones (GET, POST, DELETE)
  const { sendRequest, response, loading, error } = useFetch()
  const navigate = useNavigate()


  // Función de carga. Recarga la lista de workspaces
  const loadWorkspaces = () => {
    sendRequest(getWorkspaces)
  }

  useEffect(
    () => {
      loadWorkspaces()
    },
    []
  )


  const handleCreateWorkspace = async (form_state) => {
    try {
      await sendRequest(
        () => createWorkspace(form_state.name, form_state.url_img)
      )
      // Recargar la lista después de la creación exitosa
      loadWorkspaces()
    } catch (e) {
      console.error('Error al crear:', e)
    }
  }


  const handleDeleteWorkspace = async (id_workspace, workspace_name) => {
    if (!window.confirm(`¿Estás seguro de que quieres ELIMINAR el workspace "${workspace_name}"? Esta acción es irreversible y requiere permisos de administrador.`)) {
      return // Si el usuario cancela, salimos
    }
    try {
      await sendRequest(
        () => deleteWorkspace(id_workspace)
      )
      // Recargar la lista después de la eliminación exitosa
      loadWorkspaces()
    } catch (e) {
      console.error('Error al eliminar:', e)
    }
  }


  const handleGoBack = () => {
    navigate(-1);
  };

  // --- Renderizado de Estado ---
  if (loading && !response) { // Solo si loading es inicial
    return (
      <div className="home-container loading-state">
        <span className="loading-text">Cargando espacios de trabajo...</span>
      </div>
    );
  }

  // Nota: El error de 'create' o 'delete' se mostrará en un modal o notificación si usas otro useFetch,
  // pero aquí usaremos el mismo hook para simplificar.

  return (
    <div className="home-page">
      {/* ... (topbar existente) ... */}

      <div className="main-content">

        <h1 className="welcome-title">¡Hola de nuevo!</h1>
        <p className="welcome-subtitle">
          Elige un espacio de trabajo para continuar trabajando con tu equipo.
        </p>

        {/* Mostrar errores generales */}
        {error && <p className="error-message">Error en la operación: {error}</p>}

        {/* Lista de Workspaces */}
        <div className="workspace-list">
          {response && response.data && response.data.workspaces ? (
            response.data.workspaces.map((member) => (
              // Usamos "member" porque el API devuelve un objeto MemberWorkspace
              <div key={member.workspace_id} className="workspace-card-container">
                {console.log(member)}
                <Link
                  to={'/workspace/' + member.workspace_id}
                  className="workspace-card"
                >
                  <div className="card-left">
                    <div className="card-avatar">
                      {member.workspace_name ? member.workspace_name[0].toUpperCase() : 'W'}
                    </div>
                    <div className="card-details">
                      <h2 className="workspace-title">{member.workspace_name || 'Nombre Desconocido'}</h2>
                      <div className="workspace-meta">
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={24} className="card-arrow" />
                </Link>

                {member.member_role === 'admin' && (
                  <button
                    onClick={() => handleDeleteWorkspace(member.workspace_id, member.workspace_name)}
                    className="delete-button"
                    disabled={loading}
                  >
                    <XCircle size={20} color='red' />
                  </button>
                )}
              </div>
            ))
          ) : (
            !loading && !error && <p className="no-workspaces">No tienes espacios de trabajo. Crea uno nuevo.</p>
          )}
        </div>

        {/* Separador "O BIEN" */}
        <div className="divider">O BIEN</div>

        {/* Componente Crear Nuevo Workspace */}
        <div className="create-new-section">
          <CreateWorkspaceForm onSubmit={handleCreateWorkspace} loading={loading} />
        </div>

        {/* ... (footer links existentes) ... */}
      </div>

      <button onClick={handleGoBack} className="back-button-debug">
        ← Volver
      </button>
    </div>
  )
}

export default HomeScreen