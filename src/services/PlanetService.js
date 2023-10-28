/* FetchPlanetsGet */
export async function fetchPlanetsGet(url) {
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

/* FetchPlanetsPost */

export async function fetchPlanetsPost(valuesPlanets, url) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(valuesPlanets)
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

/* FetchPlanetsPost */

/* putPlanet */

export async function putPlanet(planets) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`http://lambalog.com/api/planets`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(planets),
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

/* PutPlanet */

/* DeletePlanet */

export async function deletePlanet(id) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`http://lambalog.com/api/planets/${id}`, {
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

/* DeletePlanet */

/* LookupsPlanet */

export async function fetchLookupsPlanetsGet(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
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

/* LookupsPlanet */