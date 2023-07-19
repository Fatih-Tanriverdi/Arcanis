

export const login = (username, password, emailAddress) => {

    return fetch("http://lambalog.com/api/auth/login", {
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

export const checkToken = () => {
    var localStorageToken = localStorage.getItem('token');

    if (localStorageToken) {
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
            .then((response) => response.json())
            .then((data) => {
                if (data && data.token === localStorageToken) {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/admin';
                }
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    }
};






    //localStorage de token var mı bakılacak yoksa login ekranına atacak
    //token varsa check-token endpointine token ile istek atılacak ve geçerli olup olmadığına bakılacak
    //geçerliyse gitmek istediği sayfaya gidebilir değilse logine atacak
    // data dan status kodu bulman gerkiyor
    //200 ise token geçerlidir ve  return true
    //200 dışında farklı bir durum kodu ise return false