
import ENVIRONMENT from "../config/environment";

const AUTH_TOKEN_KEY = "auth_token";


async function getMessagesByChannelId(workspace_id, channel_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API +
        `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY) ||
                    localStorage.getItem("auth_token")
                    }`,
            },
        }
    );

    const response = await response_http.json();

    if (!response_http.ok) {
        throw new Error(
            "Error al obtener lista de mensajes: " + response.message
        );
    }

    return response;
}


async function createMessageByChannelId(workspace_id, channel_id, content) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API +
        `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY) ||
                    localStorage.getItem("auth_token")
                    }`,
            },
            body: JSON.stringify({ content }),
        }
    );

    const response = await response_http.json();

    if (!response_http.ok) {
        throw new Error("Error al enviar mensaje: " + response.message);
    }

    return response;
}

async function deleteMessageById(workspace_id, channel_id, _id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API +
        `/api/workspace/${workspace_id}/channels/${channel_id}/messages/${_id}`,
        {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY) ||
                    localStorage.getItem("auth_token")
                    }`,
            },
        }
    );

    const response = await response_http.json();

    if (!response_http.ok) {
        throw new Error("Error al eliminar el mensaje: " + response.message);
    }

    return response;
}
// export async function deleteMessageById(workspace_id, channel_id, message_id) {
//     const response_http = await fetch(
//         ENVIRONMENT.URL_API +
//             `/api/workspace/${workspace_id}/channels/${channel_id}/messages/${message_id}`,
//         {
//             method: "DELETE",
//             headers: {
//                 authorization: `Bearer ${
//                     localStorage.getItem(AUTH_TOKEN_KEY) ||
//                     localStorage.getItem("auth_token")
//                 }`,
//             },
//         }
//     );

//     const response = await response_http.json();

//     if (!response_http.ok) {
//         throw new Error("Error al eliminar el mensaje: " + response.message);
//     }

//     return response;
// }



export {
    getMessagesByChannelId,
    createMessageByChannelId,
    deleteMessageById
};
