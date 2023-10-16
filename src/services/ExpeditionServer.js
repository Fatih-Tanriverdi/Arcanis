/* FetchExpeditionPost */

export async function fetchExpeditionPost(valuesExpeditions, url) {
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
}

/* FetchExpeditionPost */