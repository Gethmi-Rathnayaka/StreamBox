import axios from "axios";
import { saveAuth } from "./storage";

interface LoginResponse {
  id: number;
  username: string;
  token: string;
}

/**
 * Perform login against DummyJSON auth endpoint.
 * Accepts a username (and optional password). DummyJSON accepts any password for testing.
 */
export const login = async (username: string, password = "password") => {
  try {
    const res = await axios.post<LoginResponse>(
      "https://dummyjson.com/user/login",
      {
        username,
        password,
      }
    );

    // Normalize token field: DummyJSON may return different token property names
    const data = (res as any)?.data || {};
    const token =
      data.token ||
      data.accessToken ||
      data.access_token ||
      data.access ||
      data.jwt;

    const returnedUsername = data.username || data.firstName || username;

    const auth = {
      token,
      user: { username: returnedUsername },
    };

    // (debug logs removed)

    if (!token) {
      throw new Error(
        "Login succeeded but no token was returned by the auth provider."
      );
    }

    // Persist auth locally
    await saveAuth(auth);
    return auth;
  } catch (err: any) {
    // (detailed debug logging removed)
    try {
      // Keep basic error logging for visibility in production
      console.error("LOGIN ERROR (auth.ts):", err?.message || err);
    } catch (logErr) {
      // ignore logging errors
    }
    const message =
      err?.response?.data?.message || err.message || "Login failed";
    throw new Error(message);
  }
};
