import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";

const NAME = "admin";
const PASS = "root@123";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === NAME && password === PASS) {
      localStorage.setItem("auth", "true"); 
      nav("/admin");
    }
     else {
      setErr("Wrong name or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md space-y-6 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/30" />
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white shadow-inner">
          <Shield size={28} />
        </div>

        <h1 className="text-center text-2xl font-bold text-white drop-shadow">
          Admin Login
        </h1>

        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            size={18}
          />
          <input
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-white/20 px-10 py-2.5 text-sm text-white placeholder-white/70 outline-none ring-1 ring-white/30 focus:bg-white/30 focus:ring-2 focus:ring-cyan-300"
            required
          />
        </div>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
            size={18}
          />
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/20 px-10 py-2.5 text-sm text-white placeholder-white/70 outline-none ring-1 ring-white/30 focus:bg-white/30 focus:ring-2 focus:ring-cyan-300"
            required
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {err && (
          <p className="rounded-md bg-red-500/20 px-3 py-2 text-center text-xs text-red-200">
            {err}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-500 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-px hover:bg-cyan-400 active:translate-y-0"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
