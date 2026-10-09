import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("taskduty_token", data.token);

      navigate("/tasks");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9FB] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <Link
          to="/"
          className="text-sm font-medium text-[#6C4FF3] hover:underline"
        >
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h1>

        <p className="mt-2 text-sm text-gray-500">
          Log in to search your tasks.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6C4FF3] focus:ring-2 focus:ring-[#6C4FF3]/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6C4FF3] focus:ring-2 focus:ring-[#6C4FF3]/20"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#6C4FF3] px-4 py-3 font-semibold text-white transition hover:bg-[#5A3FE0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
