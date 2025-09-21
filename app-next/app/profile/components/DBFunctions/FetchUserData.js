"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function FetchUserData(email) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!!email);

  useEffect(() => {
    let cancel = false;

    if (!email) {
      setIsLoading(false);
      setUser(null);
      setError(null);
      return;
    }

    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        // adjust the path if your backend uses a different route
        const data = await api(`/api/users/${encodeURIComponent(email)}`, {
          cache: "no-store",
        });
        if (!cancel) setUser(data); // if your API returns { user }, use: setUser(data.user)
      } catch (e) {
        if (!cancel) setError(e.message || "Failed to fetch user");
      } finally {
        if (!cancel) setIsLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [email]);

  return { user, error, isLoading };
}
