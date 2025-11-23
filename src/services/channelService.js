
//Para hacer ahora
//GET /api/workspace/:workspace_id/channels

import ENVIRONMENT from "../config/environment";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext";

//Obtiene la lista de canales
async function getChannelList(workspace_id) {
    console.log(workspace_id)
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}` || localStorage.getItem("auth_token")
            },
        }
    );

    const response = await response_http.json();
    console.log(response.ok)
    if (!response.ok) {
        throw new Error("Error at get channels");
    }
    return response;
}

//POST /api/workspace/:workspace_id/channels
//Crea un nuevo canal
//Debes pasar por body el name
//body example: {name: 'general'}
async function createChannel(workspace_id, channel_name) {
        const body = { name: channel_name };
        const response_http = await fetch(
            ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}` || localStorage.getItem("auth_token")
                },
                body: JSON.stringify(body),
            }
        );
        const response = await response_http.json();
        console.log(response)
        if (!response.ok) {
            throw new Error("Error al crear el canal");
        }
        return response;
}

async function deleteChannel(channel_id) {
        // 1. Eliminar todos los mensajes asociados a ese canal
        await MessagesChannelRepository.deleteAllByChannelId(channel_id);

        // 2. Eliminar el canal principal (usando el deleteById existente en el repo)
        const result = await ChannelRepository.find(channel_id);

        if (!result) {
            throw new ServerError(404, 'Canal no encontrado o no se pudo eliminar');
        }

        return result;
}

export { getChannelList, createChannel, deleteChannel }