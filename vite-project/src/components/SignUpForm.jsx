import React from 'react';
import Authenticate from './Authenticate';
import { useState } from 'react';


export default function SignUpForm({setToken}) {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    function userLength() {
        if (username.length < 8) {
            setError("Username must be at least 8 characters long.");
        return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.")
            return false;
        }
        setError(null);
        return true;
    }
    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👏");

        if (!userLength()) return; 

        try {
           const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({username, password}),
    });

           const result = await response.json();
           setToken(result.token);
           console.log(result);
        } catch{}
    }
    return (
    <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
        <label>
            
            Username: <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
            Password: <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
        {error && <p>{error}</p>}
        <button type="submit">Submit</button>
        </form>
    </div>
    );
};
