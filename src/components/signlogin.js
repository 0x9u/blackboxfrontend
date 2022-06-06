import styles from './signlogin.module.css';
import React from 'react';
import { useNavigate } from 'react-router';
import {Modal, InputBox} from './loading.js';
/*
Current bugs:
when switching to register button has a delay - fixed
in that delay the register button cannot be clicked - fixed
Possiblities:
  Transition bug?
  css?
Never mind fixed it lmao
it was a css bug
a quick pointer events fixes it

*/
function SignLogin(props) {
  const [login, setLogin] = React.useState(props.login);
  const [load, setLoad] = React.useState(false);
  const [changePage, setChangePage] = React.useState(false);
  const navigate = useNavigate();
  function Change() {
    if (login) { //fixed 2 second lag delay by leaving out arrow function
        setLogin(false); //it just works yo
        navigate("../register", {"replace": true});
    } else {
        setLogin(true);
        navigate("../login", {"replace": true});
    }
  }
  async function WaitAnim() {
    await setTimeout(() => navigate("../chat", {"replace" : false}), 1000); //replace: replaces the history (didnt find anything about it in documentation bruh)
  }
  function foo(event) {
    console.log("activated");
    setLoad(false);
    setChangePage(true);
    WaitAnim();
  }
  function SignUpSubmit(event) {
      event.preventDefault();
    //post request back to backend server
    //obtain token
    //change route to chatapp
    setLoad(true); //possible promise
    //create promise for post request
    // then make it run a function from here when finished
    // or another function on fail
    //navigate("../chat", {"replace" : true});
  }
  function LoginSubmit(event) {
    event.preventDefault();
    
    setLoad(true);
    //navigate("../chat", {"replace" : true});
  }
  function Invalid(event) {
    //event.setCustom
  }
  return (
    <div className={styles.signlogin}>
      <div className={styles.title}><h1>BlackBox ;)</h1></div>
      <div className={styles.prompt}>
        <form className={login ? `${styles.registerForm} ${styles.hidden}` : styles.registerForm} onSubmit={SignUpSubmit}>
        <InputBox id="email" label="Email" type="text"/>
        <InputBox id="username" label="Username" type="text"/>
        <InputBox id="password" label="Password" type="password"/>
        <InputBox id={"retype-password"} label="Retype Password" type="password"/>
        <div className={styles.signloginButtonBox}>
          <input type="submit" className={styles.button} value="Register"/>
        </div>
        <div className={styles.switch}>
          <p>Already have an account?</p>
          <input type="button" className={styles.button} value="Sign In" onClick={Change}/>
          </div>
        </form>
        <form className={login ? styles.signinForm : `${styles.signinForm} ${styles.hidden}`} onSubmit={LoginSubmit}>
        <InputBox id="username" label="Username" type="text"/>
        <InputBox id="password" label="Password" type="password"/>  
        <div className={styles.signloginButtonBox}>
          <input type="submit" className={styles.button} value="Sign In"/>
        </div>
        <div className={styles.switch}>
          <p>Don't have an account?</p>
          <input type="button" className={styles.button} value="Register" onClick={Change}/>
          </div>
        </form>
      </div>
      <div className={ changePage ? styles.changePage : `${styles.changePage} ${styles.hidden}`}></div>
      <Modal button function={foo} show={load} buttonVal="continue"><p style={{marginTop: "35px", fontSize : "22px"}}>Loading</p></Modal>
    </div>
  );
}

export default SignLogin;
