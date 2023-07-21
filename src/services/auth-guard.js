

export const checkToken = () => {
    var localStorageToken = localStorage.getItem('token');

    if (!localStorageToken) {
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
                if (response.status === 200) {
                    window.location.href = '/admin';
                } else if (response.status === 401) {
                    window.location.href = '/';
                    alert('Geçersiz token. Lütfen giriş yapın.');
                } 
            })
            .catch((error) => {
                console.error(error);
                window.location.href = '/';
            });
    }
};









    //localStorage de token var mı bakılacak yoksa login ekranına atacak
    //token varsa check-token endpointine token ile istek atılacak ve geçerli olup olmadığına bakılacak
    //geçerliyse gitmek istediği sayfaya gidebilir değilse logine atacak
    // data dan status kodu bulman gerkiyor
    //200 ise token geçerlidir ve  return true
    //200 dışında farklı bir durum kodu ise return false




    //localStorage de token var mı bakılacak yoksa login ekranına atacak
    //token varsa check-token endpointine token ile istek atılacak ve geçerli olup olmadığına bakılacak
    //geçerliyse gitmek istediği sayfaya gidebilir değilse logine atacak
    // data dan status kodu bulman gerkiyor
    //200 ise token geçerlidir ve  return true
    //200 dışında farklı bir durum kodu ise return false
    //eğer 200 true dönüyorsa /admin sayfasına atılacak ve o sayfada kalacak
