import styles from './signlogin.module.css';
import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Modal, InputBox } from './modals.js';
import { postAuth, getAuth } from '../api/authApi.js';
import { authSet, authClear } from '../app/reducers/auth.js';

/*
Current bugs:
errors change when user types but only after they press the submit button
loading modal doesnt have enough time - fixed (dont put in async function)
*/

function SignLogin(props) {
  const [login, setLogin] = React.useState(props.login);
  const [load, setLoad] = React.useState(false);
  const [changePage, setChangePage] = React.useState(false);
  const [TandC, setTandC] = React.useState(false);

  const [data, setData] = React.useState({}); //replace later

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //global states
  const { expires, userId, token } = useSelector(state => state.auth);

  React.useEffect(
    () => {
      if (![token, userId, expires].every(Boolean)) return
      if ( Date.now() > expires ) {
        dispatch(authClear());
      }
      navigate("../chat", { "replace": false });
    }, [dispatch, navigate, token, userId, expires])
  
  const schemaR = Yup.object().shape({ //this is the validation schema for signup
    username: Yup.string().required("Username is required").matches(/^[a-zA-Z0-9_]*$/, "Username cannot contain any symbols or spaces").min(6, "must be at least 6 characters").max(32, "Maximum is 32 characters"),
    password: Yup.string().required("Password is required").matches(/^[\x20-\xFF]*$/, "Password must be a valid ascii character").min(6, "Password must be at least 6 characters").max(64, "Maximum is 64 characters"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
    email: Yup.string().notRequired().when( //this makes it optional
      {
        is: (value) => value?.length,
        then: (rule) => rule.email("Invalid email format")
      }
    )
  });

  const schemaL = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  });

  const { handleSubmit: handleSubmitR, register: registerR, setError: setErrorR, reset: resetR, formState: { errors: errorsR } } = useForm({
    resolver: yupResolver(schemaR)
  });

  const { handleSubmit: handleSubmitL, register: registerL, setError: setErrorL, reset: resetL, formState: { errors: errorsL } } = useForm({
    resolver: yupResolver(schemaL)
  });

  function Change() {
    resetL();
    resetR();
    if (login) { //fixed 2 second lag delay by leaving out arrow function
      setLogin(false); //it just works yo
      navigate("../register", { "replace": true });
    } else {
      setLogin(true);
      navigate("../login", { "replace": true });
    }
  }
  async function WaitAnim() {
    setChangePage(true);
    await setTimeout(() => navigate("../chat", { "replace": false }), 1500); //replace: replaces the history (didnt find anything about it in documentation bruh)
  }
  async function signupLogin(type, form) {
    if (type === "signup") {
      const res = await dispatch(postAuth(form))
      if (res.error) {
        if (res.error.message === "Username already exists!") {
          setErrorR("username", { type : "custom", message: "Username already exists!" }); //fix later
        } else {
        setErrorR("username", { type: "custom", message: `${res.error.message}` });
        setErrorR("password", { type: "custom", message: `${res.error.message}` });
        setErrorR("confirmPassword", { type: "custom", message:`${res.error.message}` });
        setErrorR("email", { type: "custom", message: `${res.error.message}` });
        }
      } else {
        WaitAnim();
      }
    } else {
      const res = await dispatch(getAuth(form));
      if (res.error) {
        console.log(res.error)
        setErrorL("username", { type: "custom", message: res.error.message });
        setErrorL("password", { type: "custom", message: res.error.message });
      } else {
        WaitAnim();
      }
    }
  }

  function SignUpSubmit(form) {
    setData(form);
    setTandC(true); //possible promise
  }

  function LoginSubmit(form) {
    setLoad(true);
    signupLogin("login", form);
    setLoad(false);
  }

  function TandCSubmit() {
    setTandC(false);
    setLoad(true);
    signupLogin("signup", data);
    setLoad(false);
  }

  return (
    <div className={styles.signlogin}>
      <div className={styles.title}><h1>BlackBox ;)<span className={styles.stageSign}>Alpha</span></h1></div>
      <div className={styles.prompt}>
        <form className={login ? `${styles.registerForm} ${styles.hidden}` : styles.registerForm} onSubmit={handleSubmitR(SignUpSubmit)}>
          <InputBox id="email" label="Email" errorMessage={errorsR?.email?.message} type="text" register={registerR("email")} />
          <InputBox id="username" label="Username" errorMessage={errorsR?.username?.message} type="text" register={registerR("username")} />
          <InputBox id="password" label="Password" errorMessage={errorsR?.password?.message} type="password" register={registerR("password")} />
          <InputBox id="retype-password" label="Retype Password" errorMessage={errorsR?.confirmPassword?.message} type="password" register={registerR("confirmPassword")} />
          <div className={styles.signloginButtonBox}>
            <input type="submit" className={styles.button} value="Register" />
          </div>
          <div className={styles.switch}>
            <p>Already have an account?</p>
            <input type="button" className={styles.button} value="Sign In" onClick={Change} />
          </div>
        </form>
        <form className={login ? styles.signinForm : `${styles.signinForm} ${styles.hidden}`} onSubmit={handleSubmitL(LoginSubmit)}>
          <InputBox id="username" label="Username" errorMessage={errorsL?.username?.message} type="text" register={registerL("username")} />
          <InputBox id="password" label="Password" errorMessage={errorsL?.password?.message} type="password" register={registerL("password")} />
          <div className={styles.signloginButtonBox}>
            <input type="submit" className={styles.button} value="Sign In" />
          </div>
          <div className={styles.switch}>
            <p>Don't have an account?</p>
            <input type="button" className={styles.button} value="Register" onClick={Change} />
          </div>
        </form>
      </div>
      <div className={changePage ? styles.changePage : `${styles.changePage} ${styles.hidden}`}></div>
      <Modal show={TandC} buttons={[{ value: "No I dont agree", function: () => setTandC(false) }, { value: "Yes I agree", function: () => TandCSubmit() }]} width="450" height="450">
        <h1>Terms and Conditions</h1>
        <p style={{ fontSize: "15px", margin: "10px" }}>
          1.The owner and creator of this website is not responsible for any damages caused by the use of this website.<br />
          <br />
          2.The chat is unfiltered and may contain profanity.<br />
          <br />
          3.You may not use this website for any illegal purposes.<br />
          <br />
        </p></Modal>
      <Modal show={load}><p style={{ marginTop: "50px", fontSize: "22px" }}>Loading</p></Modal>
    </div>
  );
}

export default SignLogin;
