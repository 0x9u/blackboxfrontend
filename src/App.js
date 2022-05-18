import './App.css';

function App() {
  return (
    <div className="App">
      <div className="title"><h1>Astrea</h1></div>
      <div className='prompt'>
        <form className='register-form'>
        <div className="userBox" id="email">
        <input type="text" placeholder=' '/>
        <label>Email</label>
        </div>
        <div className="userBox" id="username">
        <input type="text" placeholder=' ' required/>
        <label>Username</label>
        </div>
        <div className="userBox" id="password">
        <input type="password" placeholder=' ' required/>
        <label>Password</label>
        </div>
        <div className="buttonBox">
          <input type="submit" className="button" value="Register"/>
        </div>
        </form>
        <form className='signin-form'>
        </form>
      </div>
    </div>
  );
}

export default App;
