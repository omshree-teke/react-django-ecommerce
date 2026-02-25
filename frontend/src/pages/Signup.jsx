import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "",email:"",password: "", password2:"" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try{
        const response=await fetch(`${BASE}/api/register/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(form),
        });
        const data=await response.json();
        if(response.ok){
            // saveToken(data);
            setMsg("Account Created Successfully. Redirecting to Login...");
            setTimeout(()=>navigate("/login"),1200);
            
        }else{
            setMsg(data.username || data.password || JSON.stringify(data));
        }
    }catch(error){
        setMsg("Signup Failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder="Username"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={form.email}
            placeholder="email"
            required
            className="w-full p-2 border rounded"
          />
           <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="password"
            required
            className="w-full p-2 border rounded"
          />
           <input
            name="password2"
            type="password"
            onChange={handleChange}
            value={form.password2}
            placeholder="password"
            required
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Create Account
          </button>
        </form>

        {msg && <p className="mt-3 text-sm">{msg}</p>} 
      </div>
    </div>
  );
}

export default Signup;