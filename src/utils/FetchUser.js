export const userAccessToken = () => {
    const accessToken =  localStorage.getItem("accessToken") !== 'undefined' ? JSON.parse(localStorage.getItem("accessToken")) : null;
    return accessToken;
};
export const fetchUser = () => {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    return userInfo;
};