import Config from "../config-file.json"

/* UserLogin */
export const login = async ( username, password, emailAddress ) => {
    
    const response = await fetch(`${Config.SERVICE_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password, emailAddress })
    });
    const data = await response.json();

    if (!response.ok) {
        if (data.Messages) {
            return data.Messages.join(", ");
        } else {
            return "Bir hata oluştu.";
        }
    }

    const isAdmin = data.isAdmin;
    return { token: data.token, isAdmin };
};
/* UserLogin */

/* RegisterUser */
export const registerUser = async (values) => {
    
    const phoneNumberWithoutMask = values.phoneNumber.replace(/[^0-9]/g, '');

    const response = await fetch(`${Config.SERVICE_URL}/users/register`, {
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
    const data = await response.json();

    if (!response.ok) {
        if (data.Messages) {
            return data.Messages.join(", ");
        } else {
            return "Bir hata oluştu.";
        }
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

    const response = await fetch(`${Config.SERVICE_URL}/token/check`, {
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
        `${Config.SERVICE_URL}/users/forgot-password?mailAddress=${emailAddress}`,{
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

/* PasswordResetKey */
export const passwordResetKey = async (password, rePassword, recoveryCode) => {
    

    const response = await fetch(`${Config.SERVICE_URL}/users/reset-password`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({password, rePassword, recoveryCode})
    });
    const data = await response.json();

    if (!response.ok) {
        if (data.Messages) {
            return data.Messages.join(", ");
        } else {
            return "Bir hata oluştu.";
        }
    }
    return null;
};
/* PasswordResetKey */