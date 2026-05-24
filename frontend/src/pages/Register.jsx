import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    login({ name, email });
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center p-4 font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-surface-container rounded-3xl p-6 border border-outline-variant shadow-sm space-y-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary-fixed-dim">Register</h1>
          <p className="text-xs text-on-surface-variant mt-1">Create your IssueHub account.</p>
        </div>
        <input value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-surface-dim border border-outline-variant focus:border-primary-container rounded-2xl py-3 px-4 text-sm text-on-surface outline-none" type="text" placeholder="Name" />
        <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-surface-dim border border-outline-variant focus:border-primary-container rounded-2xl py-3 px-4 text-sm text-on-surface outline-none" type="email" placeholder="Email" />
        <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-surface-dim border border-outline-variant focus:border-primary-container rounded-2xl py-3 px-4 text-sm text-on-surface outline-none" type="password" placeholder="Password" />
        <button className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl font-bold text-sm tracking-wide hover:brightness-110 active:scale-95 transition-all">Register</button>
        <p className="text-xs text-on-surface-variant text-center">
          Already have an account?{" "}
          <Link className="text-primary-core font-bold" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
