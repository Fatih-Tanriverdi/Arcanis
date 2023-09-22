export const login = async (username, password, emailAddress) => {
    try {
        const response = await fetch("http://lambalog.com/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password, emailAddress: emailAddress })
        });

        if (!response.ok) {
            throw new Error('Kullanıcı adı veya şifre yanlış.');
        }

        const data = await response.json();

        return data.token;

    } catch (error) {
        console.error(error);
        throw error;
    }

};

export const checkToken = () => {

    var localStorageToken = localStorage.getItem('access-token');

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










