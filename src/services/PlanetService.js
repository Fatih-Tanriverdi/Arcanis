/* FetchPlanets */
export async function fetchPlanets() {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch("http://lambalog.com/api/planets", {
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
/* FetchPlanets */

/* FetchPlanetDetails */
export async function fetchPlanetDetails(id) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`http://lambalog.com/api/planets/${id}`, {
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
/* FetchPlanetDetails */