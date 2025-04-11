import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import "../styles/globals.css";


export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
  
    console.log("🟡 Sending credentials:", { userName, password });
  
    const result = await signIn("credentials", {
      redirect: false,
      userName,  // Ensure correct key names
      password,
    });
  
    console.log("🔵 Auth response:", result);
    setLoading(false);
  
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }

    if (result.error === "CredentialsSignin") {
      setError("Invalid Store ID or password.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Store Login</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
            type="text"
            placeholder="Store ID"
            value={userName}
            onChange={(e) => setStoreId(e.target.value.trim())} 
            required
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

<button 
  type="submit" 
  className="bg-blue-500 text-white py-2 rounded-md"
  disabled={loading}
>
  {loading ? "Signing in..." : "Sign In"}
</button>

        </form>
      </div>
    </div>
  );
}
