"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Submission {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  website: string;
  services: string[];
  serviceDescription: string;
  budget: string;
  submittedAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      fetchSubmissions(storedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
        fetchSubmissions(data.token);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setIsAuthenticated(false);
    setSubmissions([]);
  };

  const fetchSubmissions = async (authToken: string) => {
    setIsLoadingSubmissions(true);
    try {
      const response = await fetch("/api/admin/submissions", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setSubmissions(data.submissions || []);
      } else {
        console.error("Failed to fetch submissions:", data.error);
        if (data.error === "Unauthorized") {
          handleLogout();
        }
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  const refreshSubmissions = () => {
    if (token) {
      fetchSubmissions(token);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-black/95 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-light mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2 text-white/80">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="admin"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-white/80">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="admin"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-full border border-white/30 bg-white/10 px-6 py-3 font-medium text-white transition-all ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-white/20 hover:border-white/40"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-light mb-2">Admin Dashboard</h1>
            <p className="text-white/60">View all form submissions</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={refreshSubmissions}
              disabled={isLoadingSubmissions}
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {isLoadingSubmissions ? "Loading..." : "Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-white/20 bg-white/5 p-4">
            <div className="text-2xl font-light mb-1">{submissions.length}</div>
            <div className="text-sm text-white/60">Total Submissions</div>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/5 p-4">
            <div className="text-2xl font-light mb-1">
              {submissions.filter((s) => {
                const date = new Date(s.submittedAt);
                const today = new Date();
                return date.toDateString() === today.toDateString();
              }).length}
            </div>
            <div className="text-sm text-white/60">Today</div>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/5 p-4">
            <div className="text-2xl font-light mb-1">
              {new Set(submissions.map((s) => s.email)).size}
            </div>
            <div className="text-sm text-white/60">Unique Emails</div>
          </div>
        </div>

        {/* Submissions List */}
        {isLoadingSubmissions ? (
          <div className="text-center py-12 text-white/60">Loading submissions...</div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 text-white/60 rounded-lg border border-white/20 bg-white/5">
            No submissions yet
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="rounded-lg border border-white/20 bg-white/5 p-6 hover:bg-white/8 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-medium mb-1">{submission.fullName}</h3>
                        <p className="text-white/60">{submission.companyName}</p>
                      </div>
                      <div className="text-sm text-white/50 whitespace-nowrap">
                        {new Date(submission.submittedAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-white/60">Email:</span>{" "}
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-white hover:text-white/80 underline"
                        >
                          {submission.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-white/60">Phone:</span>{" "}
                        <a
                          href={`tel:${submission.phoneNumber}`}
                          className="text-white hover:text-white/80 underline"
                        >
                          {submission.phoneNumber}
                        </a>
                      </div>
                      {submission.website && (
                        <div className="sm:col-span-2">
                          <span className="text-white/60">Website:</span>{" "}
                          <a
                            href={submission.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-white/80 underline"
                          >
                            {submission.website}
                          </a>
                        </div>
                      )}
                    </div>

                    {submission.services.length > 0 && (
                      <div>
                        <div className="text-sm text-white/60 mb-2">
                          Services ({submission.services.length}):
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {submission.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full text-xs border border-white/20 bg-white/5 text-white/90"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(submission.serviceDescription && submission.serviceDescription.trim()) && (
                      <div>
                        <div className="text-sm text-white/60 mb-2">
                          Service Description:
                        </div>
                        <p className="text-sm text-white/80 bg-white/5 rounded-lg p-3 border border-white/10 whitespace-pre-wrap">
                          {submission.serviceDescription}
                        </p>
                      </div>
                    )}

                    {(submission.budget && submission.budget.trim()) && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/60">Budget:</span>
                        <span className="text-sm font-medium text-white">
                          {submission.budget}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

