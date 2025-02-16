"use client";

import { login, logout } from "./actions";
import { useState } from "react";
import { Input } from "@/components/Forms";
import { useRouter } from "next/navigation";

export const Login: React.FC = () => {
  const router = useRouter();
  const [lock, setLock] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("Enter password and click login");

  return (
    <>
      <div className="grid h-svh w-svw place-content-center">
        <div className="flex flex-col items-center gap-8">
          {message && (
            <div role="alert" className="alert alert-info alert-soft">
              <span></span>
              <span className="text-blue-800">{message}</span>
              <span></span>
            </div>
          )}

          <div className="w-96">
            <Input
              type="password"
              label="Password"
              autoComplete="off"
              value={password}
              onChange={setPassword}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary btn-wide bt-lg"
            disabled={lock}
            onClick={() => {
              setLock(true);
              login(password)
                .then(({ result }) => {
                  if (result) {
                    setMessage("Logging in... You will soon be connected to the Admin UI!");
                    router.replace("/admin/main");
                  } else {
                    setMessage("Failed. Please check whether password is correct.");
                  }
                })
                .finally(() => setLock(false));
            }}
          >
            {lock && <span className="loading loading-spinner"></span>} Login
          </button>

          <button
            type="button"
            className="btn btn-wide bt-lg"
            disabled={lock}
            onClick={() => {
              setLock(true);
              logout()
                .then(() => setMessage("Logged out"))
                .finally(() => setLock(false));
            }}
          >
            {lock && <span className="loading loading-spinner"></span>} Logout
          </button>
        </div>
      </div>
    </>
  );
};
