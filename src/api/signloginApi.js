import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

function postSignup(data) {
    return fetch('http://localhost:8090/api/user', {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: data.email,
            username: data.username,
            password: data.password,
        })
    }).then(
        res => {
            if (res.ok) {
                res.json().then( data => {
                cookies.set("token",data["token"], {expires: new Date(data["expires"])})
                cookies.set("id",data["user_id"], {expires: new Date(data["expires"])})
                })
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
                data = res.json().then(data => {
                    console.log(data)
                    cookies.set("token",data["token"], {expires: new Date(data["expires"])});
                    cookies.set("id",data["user_id"], {expires: new Date(data["expires"])});
                });
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