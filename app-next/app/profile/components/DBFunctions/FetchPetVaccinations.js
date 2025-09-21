import { useState, useEffect } from "react";
import api from "@/lib/api"; 

export default function useVaccinationData(petId) {
  const [vaccinations, setVaccinations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(!!petId);

  useEffect(() => {
    let cancel = false;

    if (!petId) {
      setVaccinations([]);
      setError("Pet is missing");
      setIsLoading(false);
      return;
    }

    (async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await api(
          `/api/pets/${encodeURIComponent(petId)}/vaccinations`,
          { cache: "no-store" }
        );
        const list = Array.isArray(data) ? data : (data.vaccinations || []);
        if (!cancel) setVaccinations(list);
      } catch (e) {
        if (!cancel) setError(e?.message || "Failed to fetch vaccinations");
      } finally {
        if (!cancel) setIsLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [petId]);

  return { vaccinations, error, isLoading };
}
