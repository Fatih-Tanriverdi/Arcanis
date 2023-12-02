export async function getData(url) {
    const localStorageToken = localStorage.getItem("access-token");
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorageToken}`,
        },
    });

    var responseData = await response.json();

    if (response.ok) {
        return responseData;
    }

    throw new Error("Veri çekme işlemi başarısız! Hata:" + responseData.messages);
}

export async function postData(url, data) {
    const localStorageToken = localStorage.getItem("access-token");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify(data),
    });

    var responseData = await response.json();

    if (response.ok) {
        return responseData;
    }

    throw new Error("Ekleme işlemi başarısız! Hata:" + responseData.messages);
}

export async function putData(url, data) {
    const localStorageToken = localStorage.getItem("access-token");
    const response = await fetch(`${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify(data),
    });

    var responseData = await response.json();

    if (response.ok) {
        return responseData;
    }

    throw new Error("Güncelleme işlemi başarısız! Hata:" + responseData.messages);
}

export async function deleteDataById(url) {
    const localStorageToken = localStorage.getItem("access-token");

    const response = await fetch(`${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorageToken}`,
        },
    });

    var responseData = await response.json();

    if (response.ok) {
        return responseData;
    }

    throw new Error("Silme işlemi başarısız! Hata:" + responseData.Messages);
}