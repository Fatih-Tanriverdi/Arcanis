export const login = async (username, password, emailAddress, url) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password, emailAddress })
    });
    const data = await response.json();

    if (!response.ok) {
        console.error(data);
        throw new Error(data.error || 'Kullanıcı adı veya şifre yanlış.');
    }
    const isAdmin = data.isAdmin;
    return { token: data.token, isAdmin };
};

export const checkToken = async () => {
    const localStorageToken = localStorage.getItem('access-token');

    if (localStorageToken === null || localStorageToken === '') {
        window.location.href = '/';
        return false;
    }

    const response = await fetch("http://lambalog.com/api/token/check", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorageToken}`
        }
    });

    if (response.status !== 200) {
        window.location.href = '/';
    }
};











