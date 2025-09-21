"use client";

import styles from "./PetView.module.css";
import { useState, useEffect , useCallback} from "react";
import { useParams } from "next/navigation";
import { PetProfileDisplay } from "./components/PetProfileDisplay";
import { PetProfileEdit } from "./components/PetProfileEdit";
import formatDate from "@/app/components/FormatDate/FormatDate";
import useFetchUserPetData from "../DBFunctions/FetchUserPetData";
import api from "@/lib/api";
import { useAuth } from "@/app/providers";
export default function FetchPetData() {
  const [pet, setPet] = useState(null);

  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const { user,loading } = useAuth();


  const id = useParams().pet;


  const fetchPet = useCallback(async () => {
    if (!id) return;
      setError(null);
    try {
      const data = await api(`/api/pet/${encodeURIComponent(id)}`, { cache: "no-store" ,raw: true});
      setPet(data);
    } catch (e) {
      setError(e?.message === "UNAUTHORIZED" ? "unauthorized" : (e?.message || "Failed to fetch pet"));
    } 
  }, [id]);

  useEffect(() => {
    fetchPet();
  }, [fetchPet]);

  const { pets = [], error: petsError, isLoading } = useFetchUserPetData(user?.id);

  const isAdmin = user?.role === "admin";
  const isOwner = pets?.some((userPet) => userPet.id.toString() === id);

  if (loading || isLoading) {
    return (
      <section className={styles.pet}>
        <div className={styles.pet__card}>
          <p className={styles.pet__loading}>Loading pet data...</p>
        </div>
      </section>
    );
  }

  if (error || petsError) {
    return (
      <section className={styles.pet}>
        <div className={styles.pet__card}>
          <p className={styles.pet__loading}>
            Error: {error || petsError}
          </p>
        </div>
      </section>
    );
  }

  if (!pet) {
    return (
      <section className={styles.pet}>
        <div className={styles.pet__card}>
          <p>No pet data found.</p>
        </div>
      </section>
    );
  }

  if (!isOwner && !isAdmin) {
    return (
      <section className={styles.pet}>
        <div className={styles.pet__card}>
          <p className={styles.pet__loading}>
            ❌ You don't have access to this pet.
          </p>
        </div>
      </section>
    );
  }

  const handleEditProfile = () => {
    const today = new Date().toISOString().slice(0, 10);
    setDraft({ ...pet, updated_at: today });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(null);
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await api(
        `/api/pet/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        }
      );
      const updated = await res.json();
      setPet(updated);
      window.location.reload();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsEditing(false);
      setDraft(null);
    }
  };

  return (
    <section className={styles.pet}>
      <div className={styles.pet__card}>
        {isEditing ? (
          <PetProfileEdit
            draft={draft}
            setDraft={setDraft}
            onSave={handleSaveProfile}
            onCancel={handleCancel}
          />
        ) : (
          <PetProfileDisplay
            pet={pet}
            onEdit={handleEditProfile}
            formatDate={formatDate}
            isAdmin={isAdmin}
            isOwner={isOwner}
          />
        )}
      </div>
    </section>
  );
}