function postSignup(data) {
    return fetch('http://localhost:8090/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            email: data.email,
            username: data.username,
            password: data.password,
        })
    }).then(
        res => {
            if (res.ok) {
                return
            } else {
                throw new Error(
                    `An error occured! Status Code: ${res.status}`
                )
            }
        });
}

function getLogin(data) {
    return fetch('http://localhost:8090/api/user?'
        + new URLSearchParams({
            username: data.username,
            pwd: data.password,
        }), {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        }
    }).then(
        res => {
            if (res.ok) {
                return
            } else {
                throw new Error(
                    res.status === 400 ?
                        "Invalid username or password" :
                        `An error occured! Status Code: ${res.status}`
                )
            }
        }
    );

}

export { postSignup, getLogin };