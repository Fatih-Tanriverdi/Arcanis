/* FetchRocketsGet */
export async function fetchRocketsGet(url) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
/* FetchRocketsGet */

/* FetchRocketPost */

export async function fetchRocketsPost(valuesRockets, url) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(valuesRockets)
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/* FetchRocketPost */

/* DeleteRocket */

export async function deleteRocket(id) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`http://lambalog.com/api/space-vehicles/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/* DeleteRocket */

/* putRocket */

export async function putRocket(id, spaceShipData) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`http://lambalog.com/api/space-vehicles/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(spaceShipData),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/* putRocket */