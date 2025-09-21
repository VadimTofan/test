"use client";

import api from "@/lib/api";

import { useState, useEffect } from "react";

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
        const data = await api(`/api/users/${encodeURIComponent(email)}`, {
          cache: "no-store",
        });
        if (!cancel) setUser(data);
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
