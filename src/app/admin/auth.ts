import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { JWT_EXPIRE_TIME, JWT_ISSUER } from "@/config";
import { getRuntimeConfig } from "@/db";
import { cookies } from "next/headers";

type Token = {
  isAdmin: boolean;
};

export async function signToken(token: Token): Promise<string> {
  const keyB64 = (await getRuntimeConfig(["jwtKey"]))["jwtKey"];
  if (!keyB64) throw new Error("Missing jwtKey");
  const key = Buffer.from(keyB64, "base64");

  return new SignJWT(token)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setExpirationTime(new Date(Date.now() + JWT_EXPIRE_TIME))
    .sign(key);
}

export async function verifyToken(token: string) {
  const keyB64 = (await getRuntimeConfig(["jwtKey"]))["jwtKey"];
  if (!keyB64) throw new Error("Missing jwtKey");
  const key = Buffer.from(keyB64, "base64");

  const { payload } = await jwtVerify<Token>(token, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function setAdminToken() {
  const expiresAt = new Date(Date.now() + JWT_EXPIRE_TIME);
  const session = await signToken({ isAdmin: true });
  const cookieStore = await cookies();

  cookieStore.set("token", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearToken() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) throw new Error("Missing token");

  const payload = await verifyToken(token.value);
  if (!payload.isAdmin) throw new Error("This token doesn't have admin permission");

  return payload;
}
