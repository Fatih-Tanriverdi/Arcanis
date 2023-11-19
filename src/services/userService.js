import Config from "../config-file.json"

/* UsersDataGet */
export async function fetchUsersDataGet(url) {
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
/* UsersDataGet */

/* FetchUserstPost */

export async function fetchUsersPost(valuesUsers, url) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(valuesUsers)
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

/* FetchUserstPost */


/* DeleteUsers */

export async function deleteUsers(id) {
    
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${Config.SERVICE_URL}/users/${id}`, {
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

/* DeleteUsers */

/* putUsers */

export async function putUsers(userData) {
    
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${Config.SERVICE_URL}/users`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(userData),
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

/* PutUsers */