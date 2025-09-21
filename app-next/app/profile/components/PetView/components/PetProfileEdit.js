"use client";

import styles from "./PetProfile.module.css";
import Image from "next/image";
import CountrySelect from "./api/flags";
import { useAuth } from "@/app/providers";

import { useMemo } from "react";

export function PetProfileEdit({ draft, setDraft, onSave, onCancel }) {
  const { user: session } = useAuth();
  const today = new Date().toISOString().slice(0, 10);
  const isAuthed = !!session;
  const role = session?.role;
  const isAdmin = isAuthed && role === "admin";

  const species = useMemo(
    () => ["Dog", "Cat", "Rabbit", "Guinea Pig", "Hamster", "Ferret", "Bird", "Fish", "Turtle", "Tortoise", "Snake", "Lizard", "Frog", "Horse", "Donkey", "Goat", "Pig", "Chicken", "Duck", "Other"],
    []
  );

  const isValidUrl = (str) => {
    if (!str) return false;
    try {
      const u = new URL(str);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };
  const imageSrc = isValidUrl(draft?.photo_url) ? draft.photo_url : "/images/loading.svg";

  const dateFix = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);

    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  };

  return (
    <form
      className={styles.pet__form}
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <header className={styles.pet__header}>
        <div className={styles.pet__avatarWrap}>
          <Image src={imageSrc} alt={draft?.name || "Pet avatar"} width={160} height={160} className={styles.pet__avatar} priority />
        </div>

        <div className={styles.pet__headerInfo}>
          <input className={styles.pet__nameInput} type="text" value={draft?.name ?? ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Name" required />
          <select id="pet-species" required value={draft.species} onChange={(e) => setDraft({ ...draft, species: e.target.value })}>
            <option value="" disabled>
              Select a species…
            </option>
            {species.map((specie) => (
              <option key={specie} value={specie}>
                {specie}
              </option>
            ))}
          </select>
          <input className={styles.pet__nameInput} type="url" value={draft?.photo_url ?? ""} onChange={(e) => setDraft({ ...draft, photo_url: e.target.value })} placeholder="https://pet.photo.url" />
        </div>

        <div className={styles.pet__headerActions}>
          <button type="submit" className={styles.pet__saveButton} aria-label="Save" title="Save">
            <Image src="/icons/check.png" width={20} height={20} alt="check mark" />
          </button>
          <button type="button" onClick={onCancel} className={styles.pet__cancelButton} aria-label="Cancel" title="Cancel">
            <Image src="/icons/cancel.png" width={20} height={20} alt="cancel" />
          </button>
        </div>
      </header>

      <main className={styles.pet__main}>
        <section className={styles.pet__section}>
          <h2 className={styles.pet__sectionTitle}>Basic Info</h2>
          <div className={styles.pet__fields}>
            <div className={styles.pet__field}>
              <label>Breed</label>
              <input type="text" value={draft?.breed ?? ""} onChange={(e) => setDraft({ ...draft, breed: e.target.value })} />
            </div>

            <div className={styles.pet__field}>
              <label>Sex</label>
              <select value={draft?.sex ?? ""} onChange={(e) => setDraft({ ...draft, sex: e.target.value })}>
                <option value="">— Select —</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className={styles.pet__field}>
              <label>Color / Markings</label>
              <input type="text" value={draft?.color_markings ?? ""} onChange={(e) => setDraft({ ...draft, color_markings: e.target.value })} />
            </div>

            <div className={styles.pet__field}>
              <label>Date of Birth</label>
              <input type="date" value={dateFix(draft?.date_of_birth ?? "").slice(0, 10)} onChange={(e) => setDraft({ ...draft, date_of_birth: e.target.value })} />
            </div>

            <div className={styles.pet__field}>
              <label>Country of Birth</label>
              <CountrySelect value={draft?.country_of_birth ?? ""} onChange={(value) => setDraft({ ...draft, country_of_birth: value })} />
            </div>
          </div>
        </section>

        {isAdmin && (
          <>
            <section className={styles.pet__section}>
              <h2 className={styles.pet__sectionTitle}>Microchip</h2>
              <div className={styles.pet__fields}>
                <div className={styles.pet__field}>
                  <label>Microchip Number</label>
                  <input type="text" value={draft?.microchip_number ?? ""} onChange={(e) => setDraft({ ...draft, microchip_number: e.target.value })} />
                </div>

                <div className={styles.pet__field}>
                  <label>Implant Date</label>
                  <input
                    type="date"
                    value={dateFix(draft?.microchip_implant_date ?? today).slice(0, 10)}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        microchip_implant_date: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.pet__field}>
                  <label>Implant Location</label>
                  <input
                    type="text"
                    value={draft?.microchip_implant_location ?? ""}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        microchip_implant_location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            <section className={styles.pet__section}>
              <h2 className={styles.pet__sectionTitle}>Passport</h2>
              <div className={styles.pet__fields}>
                <div className={styles.pet__field}>
                  <label>Passport Number</label>
                  <input type="text" value={draft?.passport_number ?? ""} onChange={(e) => setDraft({ ...draft, passport_number: e.target.value })} />
                </div>

                <div className={styles.pet__field}>
                  <label>Country of Issue</label>
                  <CountrySelect value={draft?.country_of_issue ?? ""} onChange={(value) => setDraft({ ...draft, country_of_issue: value })} />
                </div>

                <div className={styles.pet__field}>
                  <label>Issuing Date</label>
                  <input type="date" value={(draft?.issue_date ?? "").slice(0, 10)} onChange={(e) => setDraft({ ...draft, issue_date: e.target.value })} />
                </div>

                <div className={styles.pet__field}>
                  <label>Issuing Authority</label>
                  <input type="text" value={draft?.issuing_authority ?? ""} onChange={(e) => setDraft({ ...draft, issuing_authority: e.target.value })} />
                </div>

                <div className={styles.pet__field}>
                  <label>Current Status</label>
                  <select value={draft?.current_status ?? ""} onChange={(e) => setDraft({ ...draft, current_status: e.target.value })}>
                    <option value="">— Select —</option>
                    <option value="Active">Active</option>
                    <option value="Deceased">Deceased</option>
                    <option value="Lost">Lost</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </form>
  );
}
