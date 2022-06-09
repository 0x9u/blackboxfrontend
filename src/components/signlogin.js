import styles from './signlogin.module.css';
import React from 'react';
import { useNavigate } from 'react-router';
import {Modal, InputBox} from './modals.js';
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
  const [TandC, setTandC] = React.useState(false);
  
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();
  function Change() {
    resetFields();
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
    setTandC(true); //possible promise
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

  function resetFields() {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  }

  return (
    <div className={styles.signlogin}>
      <div className={styles.title}><h1>BlackBox ;)</h1></div>
      <div className={styles.prompt}>
        <form className={login ? `${styles.registerForm} ${styles.hidden}` : styles.registerForm} onSubmit={SignUpSubmit}>
        <InputBox id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
        <InputBox id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" onInvalid={(e) => e.target.setCustomValidity("Please Type Your username!")} required/>
        <InputBox id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>
        <InputBox id={"retype-password"} label="Retype Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required/>
        <div className={styles.signloginButtonBox}>
          <input type="submit" className={styles.button} value="Register"/>
        </div>
        <div className={styles.switch}>
          <p>Already have an account?</p>
          <input type="button" className={styles.button} value="Sign In" onClick={Change}/>
          </div>
        </form>
        <form className={login ? styles.signinForm : `${styles.signinForm} ${styles.hidden}`} onSubmit={LoginSubmit}>
        <InputBox id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" required/>
        <InputBox id="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>  
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
      <Modal show={TandC} buttons={[{value: "No I dont agree", function: () => setTandC(false)}, {value:"Yes I agree", function: () => {setTandC(false) ;setLoad(true)}} ]} width="450" height="450"><h1>Terms and Conditions</h1><p style={{fontSize : "15px", margin: "10px"}}>
        1.The owner and creator of this website is not responsible for any damages caused by the use of this website.<br/>
        <br/>
        2.The chat is unfiltered and may contain profanity.<br/>
        <br/>
        3.You may not use this website for any illegal purposes.<br/>
        <br/>
        </p></Modal>
      <Modal show={load} buttons={[{value:"continue", function: foo}]}><p style={{marginTop: "35px", fontSize : "22px"}}>Loading</p></Modal>
    </div>
  );
}

export default SignLogin;
