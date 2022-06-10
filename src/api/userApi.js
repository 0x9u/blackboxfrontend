import { React } from 'react';

class userApi extends React.Component {
    constructor() {
        this.state = {
            token : "",
            username : "",
            email : "",
            userId : 0
        }
    }
    async componentDidMount() {
        //get token from local storage
        //if token is not null
        //set token to state
        //set username to state
        //set email to state
        //set logged in to true
        //else
        //set logged in to false
    }
    async componentDidUpdate() {
        //if logged in is true
        //set token to local storage
        //set username to state
        //set email to state
        //set logged in to true
        //else
        //set logged in to false
    }
    async componentWillUnmount() {
        //remove token from local storage
    }
}

export default userApi;