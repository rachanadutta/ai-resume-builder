import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="bg-gray-700 p-4 rounded-lg shadow-2xl shadow-black/50 max-w-sm w-full">
        <h2 className="text-center font-bold text-white text-2xl mb-6 mt-1">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-200">Email</label>
            <input
              className="rounded-md bg-gray-600 px-3 py-2 w-full text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">Password</label>
            <input
              className="rounded-md bg-gray-600 px-3 py-2 w-full text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-2 ml-0.5">
            <a className="text-blue-600 text-md" href="#">Forgot Password?</a>
          </div>
          <button
            className="mt-6 shadow-2xl shadow-black/40 rounded-md w-full bg-blue-600 mb-6 text-white px-2 py-2 hover:bg-blue-800 hover:cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
