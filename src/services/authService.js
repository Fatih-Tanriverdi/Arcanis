/* UserLogin */
export const login = async (username, password, emailAddress) => {
    const response = await fetch("http://lambalog.com/api/auth/login", {
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
/* UserLogin */

/* RegisterUser */
export const registerUser = async (values) => {
    const phoneNumberWithoutMask = values.phoneNumber.replace(/[^0-9]/g, '');

    const response = await fetch("http://lambalog.com/api/users/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...values,
            phoneNumber: phoneNumberWithoutMask
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Kullanıcı kaydı yapılamadı.";
        return errorMessage;
    }
    return null;
};
/* RegisterUser */

/* CheckToken */
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
/* CheckToken */

/* ResetPassword */
export const resetPassword = async (emailAddress) => {
    const response = await fetch(
        `http://lambalog.com/api/users/forgot-password?mailAddress=${emailAddress}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
    if (response.status !== 200) {
        const data = await response.json();
        console.error(data);
        throw new Error(data.error || "Email Adresi Gönderilemedi.");
    }
    return "Şifre sıfırlama e-postası başarıyla gönderildi. Lütfen e-postanızı kontrol edin.";
};
/* ResetPassword */










