import Config from "../config-file.json"

/* UsersDataGet */
export async function fetchTicketsGet(url) {
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

/* DeleteRocket */

export async function deleteTicket(id) {

    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${Config.SERVICE_URL}/ticket-sales/${id}`, {
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

/* putExpedition */

export async function putTicket(ticketSalesData) {

    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${Config.SERVICE_URL}/ticket-sales`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(ticketSalesData),
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

/* putExpedition */

export async function postTicketSales(ticketSalesData) {

    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${Config.SERVICE_URL}/ticket-sales/buy-ticket`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(ticketSalesData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.Messages);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/* putExpedition */