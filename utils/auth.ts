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
      "https://dummyjson.com/auth/login",
      {
        username,
        password,
      }
    );

    const auth = {
      token: res.data.token,
      user: { username: res.data.username },
    };
    // Persist auth locally
    await saveAuth(auth);
    return auth;
  } catch (err: any) {
    // Re-throw with friendly message
    const message =
      err?.response?.data?.message || err.message || "Login failed";
    throw new Error(message);
  }
};
