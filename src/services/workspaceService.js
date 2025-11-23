import ENVIRONMENT from "../config/environment";

export async function getWorkspaces () {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if(!response_http.ok){
        throw new Error('Error al obtener lista de workspaces')
    }
    const response = await response_http.json()
    return response
}

export async function createWorkspace (name, url_img = null) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({ name, url_img })
        }
    )
    if(!response_http.ok){
        const response = await response_http.json()
        throw new Error('Error al crear workspace: ' + response.message)
    }
    const response = await response_http.json()
    return response
}

export async function deleteWorkspace (workspace_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if(!response_http.ok){
        const response = await response_http.json()
        throw new Error('Error al eliminar workspace: ' + response.message)
    }
    const response = await response_http.json()
    return response
}

export async function inviteMember (workspace_id, email_invited, role_invited = 'user') {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/invite`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({ email_invited, role_invited })
        }
    )
    if(!response_http.ok){
        const response = await response_http.json()
        throw new Error('Error al enviar la invitación: ' + response.message)
    }
    const response = await response_http.json()
    return response
}