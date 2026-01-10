import Cookies from "js-cookie";

export const storeCookie = (key: string, value: string, days = 7) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${key}=${value}; expires=${expires}; path=/`; // path=/ penting!
};

export const getCookie = (key: string) => {
    return Cookies.get(key) || ""
}

export const removeCookie = (key: string) => {
    Cookies.remove(key, { expires: 0 })
}   