"use client";
import React, {useState} from 'react';
import {useRouter} from "next/navigation";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return
        }

        try {
            //TODO: use react-query and refactor request
            //loading, error, debounce state
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            })
            const data = await res.json();
            console.log("data:", data);
            router.push("/login");

            if(!res.ok){
                throw new Error(data.error || "registration Failed");
            }
        } catch (error) {
            console.log("Failed to register user:", error);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Confirm Password
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />/
                </label>
                <button type="submit">Register</button>/
            </form>
            <div>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
}

export default RegisterPage;