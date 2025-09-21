"use client";

import styles from "./AddPet.module.css";

import CountrySelect from "../PetView/components/api/flags";
import FetchUserData from "../DBFunctions/FetchUserData";
import api from "@/lib/api";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";

export default function AddPetData() {
  const { user: authUser, loading: authLoading } = useAuth();
  const isAuthed = !!authUser;

  const email = authUser?.email ?? "";
  const { user, isLoading: userLoading, error: userError } = FetchUserData(email);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const species = useMemo(
    () => ["Dog", "Cat", "Rabbit", "Guinea Pig", "Hamster", "Ferret", "Bird", "Fish", "Turtle", "Tortoise", "Snake", "Lizard", "Frog", "Horse", "Donkey", "Goat", "Pig", "Chicken", "Duck", "Other"],
    []
  );

  const isoToday = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const router = useRouter();

  const [pet, setPet] = useState({
    owner_user_id: undefined,
    name: "",
    species: "",
    breed: "",
    sex: "",
    color_markings: "",
    date_of_birth: isoToday,
    country_of_birth: "DK",
    current_status: "Active",
    photo_url: "",
  });

  function handleLogin() {
    try {
      localStorage.setItem("returnTo", window.location.pathname || "/profile/pets/new");
    } catch {}

    window.location.href = "/auth/google";
  }

  async function handleAddPet(e) {
    e.preventDefault();
    setError("");

    if (!isAuthed) {
      setError("You need to log in first.");
      return;
    }
    if (!user?.id) {
      setError("Please complete your profile before adding a pet.");
      return;
    }
    if (!pet.name || !pet.species || !pet.date_of_birth) {
      setError("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...pet,
        owner_user_id: user.id,
      };

      await api("/api/pets", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || userLoading) {
    return <p className={styles.pet__loading}>Loading…</p>;
  }

  if (!isAuthed) {
    return (
      <section className={styles.pet}>
        <h1 className={styles.pet__name}>Create New Pet</h1>
        <div>
          <p>You need to log in first.</p>
          <button onClick={handleLogin} className={styles.pet__login}>
            Log in with Google
          </button>
        </div>
      </section>
    );
  }

  if (userError && !user?.id) {
    return (
      <section className={styles.pet}>
        <h1 className={styles.pet__name}>Create New Pet</h1>
        <div className={styles.pet__guard}>
          <p>You’re logged in, but your profile isn’t set up yet. Please complete your profile first.</p>
          <button onClick={() => router.push("/profile/edit")} className={styles.pet__login}>
            Go to profile setup
          </button>
        </div>
      </section>
    );
  }

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <section className={styles.pet}>
      <h1 className={styles.pet__name}>Create New Pet</h1>

      <form className={styles.pet__form} onSubmit={handleAddPet} noValidate>
        <div className={styles.pet__container}>
          <div className={styles.pet__column}>
            <div className={styles.pet__row}>
              <label className={styles.pet__label} htmlFor="pet-name">
                Name <span className={styles.pet__required}>*</span>
              </label>
              <input id="pet-name" className={styles.pet__input} type="text" required value={pet.name} onChange={(e) => setPet({ ...pet, name: e.target.value })} placeholder="Pet name" />
            </div>

            <div className={styles.pet__row}>
              <label className={styles.pet__label} htmlFor="pet-photo">
                Picture Url
              </label>
              <input
                id="pet-photo"
                className={styles.pet__input}
                type="text"
                value={pet.photo_url}
                onChange={(e) => setPet({ ...pet, photo_url: e.target.value })}
                placeholder="https://pet.picture.com"
              />
            </div>

            <div className={styles.pet__row}>
              <label className={styles.pet__label} htmlFor="pet-species">
                Species <span className={styles.pet__required}>*</span>
              </label>
              <select id="pet-species" className={styles.pet__input} required value={pet.species} onChange={(e) => setPet({ ...pet, species: e.target.value })}>
                <option value="" disabled>
                  Select a species…
                </option>
                {species.map((specie) => (
                  <option key={specie} value={specie}>
                    {specie}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.pet__row}>
              <label className={styles.pet__label} htmlFor="pet-dob">
                Date of Birth <span className={styles.pet__required}>*</span>
              </label>
              <input id="pet-dob" className={styles.pet__input} type="date" required value={pet.date_of_birth || isoToday} onChange={(e) => setPet({ ...pet, date_of_birth: e.target.value })} />
            </div>

            <div className={styles.pet__row}>
              <label className={styles.pet__label} htmlFor="pet-sex">
                Sex <span className={styles.pet__required}>*</span>
              </label>
              <select id="pet-sex" className={styles.pet__input} value={pet.sex} onChange={(e) => setPet({ ...pet, sex: e.target.value })}>
                <option value="" disabled>
                  Select sex…
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {!pet?.photo_url || !isValidUrl(pet.photo_url) ? (
            <Image className={styles.pet__image} src="/images/loading.svg" alt="Pet preview" width={500} height={500} />
          ) : (
            <Image className={styles.pet__image} src={pet.photo_url} alt="Pet preview" width={500} height={500} />
          )}
        </div>

        <div className={styles.pet__row}>
          <label className={styles.pet__label} htmlFor="pet-breed">
            Breed
          </label>
          <input id="pet-breed" className={styles.pet__input} type="text" value={pet.breed} onChange={(e) => setPet({ ...pet, breed: e.target.value })} placeholder="Pet Breed" />
        </div>

        <div className={styles.pet__row}>
          <label className={styles.pet__label} htmlFor="pet-color">
            Color / Markings
          </label>
          <input
            id="pet-color"
            className={styles.pet__input}
            type="text"
            value={pet.color_markings}
            onChange={(e) => setPet({ ...pet, color_markings: e.target.value })}
            placeholder="Brown with grey dots"
          />
        </div>

        <div className={styles.pet__row}>
          <label className={styles.pet__label}>Country of Birth</label>
          <CountrySelect value={pet.country_of_birth} onChange={(value) => setPet({ ...pet, country_of_birth: value })} />
        </div>

        {error ? <p className={styles.pet__error}>{error}</p> : null}

        <button type="submit" className={styles.pet__submit} disabled={submitting} aria-disabled={submitting}>
          {submitting ? "Saving..." : "Create Pet"}
        </button>
      </form>
    </section>
  );
}
