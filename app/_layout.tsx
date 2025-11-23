import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { store } from "../store/store";
import { loadAuth } from "../utils/storage";

function AuthGate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    const restore = async () => {
      try {
        const auth = await loadAuth();
        if (!mounted) return;
        if (auth && auth.token) {
          dispatch(setAuth(auth));
        } else {
          // If not authenticated and not already on auth pages, redirect to login
          if (
            !pathname?.startsWith("/login") &&
            !pathname?.startsWith("/register")
          ) {
            router.replace("/login");
          }
        }
      } catch (err) {
        console.error("Auth restore failed", err);
      }
    };
    restore();
    return () => {
      mounted = false;
    };
  }, [dispatch, router, pathname]);

  return null;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthGate />
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
