const gateway = "http://localhost:8090/api/";

async function requestApi(endpoint, type, { data, urlParams, ...customConfig } = {}) {
    try {
        const response = await fetch(`${gateway}${endpoint}${urlParams !== {} ? "?" + new URLSearchParams(urlParams) : ""}`, 
            {
            ...customConfig,
            method: type,
            headers: {
                ...customConfig.headers,
                "Accept": "application/json"
            },
            body: data ? JSON.stringify(data) : undefined
        })
        const resJson = await response.json()
        console.log(resJson.error)

        if (!response.ok) {
            console.log("activating")
            //throw new Error(response.status.toString());
            throw {message : resJson.error, status : response.status}
        }
        return Promise.resolve(resJson)
    } catch (error) {
        console.log("bad", error)
        return Promise.reject({...error});
    }
}

//export { postSignup, getLogin };
const postApi = (endpoint, body, customConfig = {}) => requestApi(
    endpoint, "POST", { ...customConfig, data: body });
const getApi = (endpoint, urlBody, customConfig = {}) => requestApi(
    endpoint, "GET", { ...customConfig, urlParams: urlBody });
const deleteApi = (endpoint, body, customConfig = {}) => requestApi(
    endpoint, "DELETE", { ...customConfig, data: body });
const putApi = (endpoint, body, customConfig = {}) => requestApi(
    endpoint, "PUT", { ...customConfig, data: body });

export { postApi, getApi, deleteApi, putApi };