export const login = async ( username, password, emailAddress, url ) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username, password, emailAddress })
        });

        const data = await response.json();
        return data.token;

    } catch (error) {
        console.error(error);
        throw error;
    }

};

export const checkToken = () => {
    const localStorageToken = localStorage.getItem('access-token');

    if (localStorageToken === null || localStorageToken === '') {
        window.location.href = '/';
        return false;
    } else {
        fetch("http://lambalog.com/api/token/check", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    window.location.href = '/';
                }
            })
            .catch((error) => {
                console.error(error);
                window.location.href = '/';
            });
    }
};










