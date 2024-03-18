import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Auth = ({setActive}) => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate()

  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(true);
  const { email, password, firstName, lastName, confirmPassword } = state;
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('j')
    if (signUp) {
      if (password !== confirmPassword){
        setErrorMessage("Passwords don't match");
        setTimeout(() => setErrorMessage(''), 2000);
        
        return
         }
      if(firstName&&lastName&&confirmPassword){
         const {user} = await createUserWithEmailAndPassword(auth,email,password)
         await updateProfile(user,{displayName:`${firstName} ${lastName}`})
         setActive('home')
         navigate('/')
      }   else{
                setErrorMessage('All fields are mandatory')
                setTimeout(() => setErrorMessage(''), 2000);
      }
      
    }
    
    else{
        if(email&&password){
        try{
            const {user} = await signInWithEmailAndPassword(auth,email,password)
            setActive('home')
            navigate('/')
        }
        catch{
            setErrorMessage("Email or password doesn't match")
            setTimeout(() => setErrorMessage(''), 2000);
        }
        }
    }
    
  };
  return (
    <>
      <div>
        <div id="login-card" class="card">
          <div class="card-body">
            <h2 class="text-center">{!signUp ? "Login" : "Signup "}</h2>
            <br />
            <form action="" onSubmit={handleSubmit}>
              {errorMessage && (
                <h6
                  style={{
                    color: "red"
                  }}
                >
                  {errorMessage} </h6>)}
              {signUp && (
                <>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Enter first name"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Enter last name"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  id="email"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              {signUp && (
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="email"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}
              <button
                type="submit"
                id="button"
                class="btn btn-primary deep-purple btn-block "
              >
                {signUp === true ? "Signup" : "Login"}
              </button>{" "}
              <div>
                <h6>
                  {" "}
                  {signUp === false
                    ? "Dont have an account?"
                    : "Already have an account"}{" "}
                  <span onClick={() => setSignUp(!signUp)}>
                    {signUp === false ? "Sign Up" : "Login"}
                  </span>
                </h6>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
