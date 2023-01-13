import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'

function LoginForm({Login, error}){
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const errorRef = useRef();

 async function login(email,password){
     const response = await fetch('http://localhost:3005/users/login', {
         method: 'POST',
         headers: {
             "Content-Type":"application/json"
         },
         body: JSON.stringify({
             email,password
         })
     })

     const data = await response.json().then((data) => {
         if(data.statusCode == 401){
             setErrorMessage(data.message)
         }
         else{
            sessionStorage.setItem("id", data.user.id);
            redirectHomePage();
         }
     })
    

     }

     const Handler = e => {
        e.preventDefault();
        login(email, password);
    }
    let navigate = useNavigate();
    const redirectHomePage = () => {
        let path = '/home';
        navigate(path);
        alert("Successfully Logged In!");
    }
     return(
         <>
             <Form className='login-form' onSubmit={Handler}>
                 <h1 className="font-weight-bold">Login</h1>
                 <FormGroup>
                    <Input required type="email" placeholder="Email" onChange = { e=> setEmail(e.target.value)} value={email}></Input>
                 </FormGroup>
                 <FormGroup>
                    <Input required type="password" placeholder="Password" onChange= { e=> setPassword(e.target.value)} value={password}></Input>
                 </FormGroup>
                 <p ref={errorRef} className={ errorMessage ? 'error' : ''} aria-live="assertive" >{errorMessage}</p>
                 <Button type='submit' className='btn-lg btn-dark btn-block'>Log in</Button>
             </Form>
             <a href="/register">Don't have an account yet? Register here!</a>
         </>
     )
}

export default LoginForm
