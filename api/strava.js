const auth_link = "https://www.strava.com/oauth/token"

export async function Authorize(code) {
    // autorizamos ussuario con el auth token
    try {
        const response = await fetch(auth_link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
                client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code',
            }),
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error al autorizar:', error);
    }
}

export async function getUser(res){
    // obtenemos datos del usuario
    const user_link = `https://www.strava.com/api/v3/athlete`
    const data = await fetch(user_link, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${res}`
        },
    });
    const result = await data.json();
    return result;
}

export async function getActivities(res){
    // obtenemos actividades del usuario y usamos el token que nos da la funcion Authorize() 
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?per_page=30`
    const data = await fetch(activities_link, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Authorization": `Bearer ${res}`
        },
    });
    const result = await data.json();
    return result;
}

export async function refreshToken(refreshToken) {
    // refrescamos token cuando expira
    try {
        const response = await fetch(auth_link, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: '141564',
                client_secret: '8eebb770b7eb72c8becd84f0edaeb4ceb2249b29',
                refresh_token: refreshToken,
                grant_type: "refresh_token",
            }),
        });

        if (!response.ok) {
            throw new Error(`Error al refrescar el token: ${response.status}`);
        }

        const data = await response.json();
        return data; // nuevo access_token, refresh_token, expires_at
    } catch (error) {
        console.error("Error durante la actualización del token:", error);
        throw error;
    }
}
