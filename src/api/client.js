const gateway = "http://localhost:8090/api/";

async function requestApi(endpoint, type, { data, urlParams, ...customConfig } = {}) {
    let resJson
    try {
        const response = await fetch(gateway + endpoint + (urlParams
            ? "?" + new URLSearchParams(urlParams)
            : ""), {
            ...customConfig,
            method: type,
            headers: {
                ...customConfig.headers,
                "Accept": "application/json"
            },
            body: data ? JSON.stringify(data) : undefined
        })
        resJson = await response.json()
        console.log(resJson.error)

        if (!response.ok) {
            throw new Error(response.status.toString());
        }
        return Promise.resolve(resJson)
    } catch (error) {
        console.log(error)
        return Promise.reject({message : error.message});
    }
}

//export { postSignup, getLogin };
const postApi = (endpoint, body, customConfig = {}) => requestApi(
    endpoint, "POST", { ...customConfig, urlParams: undefined, data: body });
const getApi = (endpoint, urlBody, customConfig = {}) => requestApi(
    endpoint, "GET", { ...customConfig, urlParams: urlBody, data: undefined });
const deleteApi = (endpoint, body, customConfig = {}) => requestApi(
    endpoint, "DELETE", { ...customConfig, urlParams: undefined, data: body });
const putApi = (endpoint, body, customConfig = {}) => requestApi(
    endpoint, "PUT", { ...customConfig, urlParams: undefined, data: body });

export { postApi, getApi, deleteApi, putApi };