import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap'

function RegisterForm({Login, error}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const errorRef = useRef();

    async function register(email, password){
        if(password === confirmPassword){
        try{
         const response = await fetch('http://localhost:3005/users/register', {
         method: 'POST',
         headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name,email,password
         })
        })

        const data = await response.json().then((data) => {
            if(data.statusCode == 401){
                alert("fafa");
                setErrorMessage(data.message)
            }
        })
        }catch(err){
            alert(err);
        }
        }else{
            setErrorMessage("Password does not match")
        }
    }

    const Handler = e => {
       e.preventDefault();
       register(email, password);
   }

    let navigate = useNavigate();
    const redirectLogin = () => {
        let path = '/login';
        navigate(path);
        alert("Account Registered!");
    }

    

    return(
        <>
         <Form className='register-form' onSubmit={Handler}>
                 <h1 className="font-weight-bold">Sign up</h1>
                 <FormGroup>
                    <Input required type="text" placeholder="Full Name" onChange= { e=> setName(e.target.value)} value={name}></Input>
                 </FormGroup>
                 <FormGroup>
                    <Input required type="email" placeholder="Email" onChange = { e=> setEmail(e.target.value)} value={email}></Input>
                 </FormGroup>
                 <FormGroup>
                    <Input required type="password" placeholder="Password" onChange= { e=> setPassword(e.target.value)} value={password}></Input>
                 </FormGroup>
                    <Input required type="password" placeholder="Confirm Password" onChange= { e=> setConfirmPassword(e.target.value)} value={confirmPassword}></Input>
                 <p ref={errorRef} className={ errorMessage ? 'error' : ''} aria-live="assertive" >{errorMessage}</p>
                 <Button onClick={redirectLogin} type='submit' className='btn-lg btn-dark btn-block'>Register</Button>
             </Form>
             <a href="/login">Already have an account? Login here!</a>
        </>
    )
}

export default RegisterForm