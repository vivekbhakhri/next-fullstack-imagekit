"use client";
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect:false,
        })

        if(result?.error) {
            console.log(result.error)
        } else {
            router.push("/");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Login</button>
            </form>
            <div>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
            <div>
                <button onClick={() => signIn("google")}>Sign in with Google</button>
            </div>
        </div>
    );
}

export default LoginPage;