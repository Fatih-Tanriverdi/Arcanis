import Config from "../config-file.json"

/* FetchPlanetsGet */
export async function fetchExpenditionsGet(url) {
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
/* FetchPlanetsGet */

/* FetchExpeditionPost */

export async function fetchExpeditionPost(valuesExpeditions, url) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(valuesExpeditions)
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

/* FetchExpeditionPost */

/* DeleteExpeditions */

export async function deleteExpedition(id) {
    
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${Config.SERVICE_URL}/expenditions/${id}`, {
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

/* DeleteExpeditions */

/* putExpedition */

export async function putExpedition(expenditions) {
    
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${Config.SERVICE_URL}/expenditions`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(expenditions),
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

/* putExpedition */

