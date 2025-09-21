"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api"; 

export default function useFetchUserPetData(id) {
  const [pets, setPets] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id);

  useEffect(() => {
    let cancel = false;

    if (!id) {
      setIsLoading(false);
      setPets(null);
      setError(null);
      return;
    }

    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api(`/api/pets/${encodeURIComponent(id)}`, {
          cache: "no-store",
        });
        const list = Array.isArray(data) ? data : data?.pets ?? data ?? [];
        if (!cancel) setPets(list);
      } catch (e) {
        if (!cancel) setError(e?.message || "Failed to fetch pets");
      } finally {
        if (!cancel) setIsLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [id]);

  return { pets, error, isLoading };
}
