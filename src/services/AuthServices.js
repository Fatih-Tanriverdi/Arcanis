

export const login = ( username, password, emailAddress) => {

    return fetch("https://lambalog.com/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password, emailAddress: emailAddress })
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
};






