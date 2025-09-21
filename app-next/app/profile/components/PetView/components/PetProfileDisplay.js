"use client";

import styles from "./PetProfile.module.css";

import AddVaccination from "./vaccination/AddVaccination/AddVaccination";
import ProfileVaccination from "./vaccination/ProfileVaccination/ProfileVaccination";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function PetProfileDisplay({
  pet,
  onEdit,
  formatDate,
  isAdmin,
  isOwner,
}) {
  const [isVaccinationOpen, setIsVaccinationOpen] = useState(false);

  useEffect(() => {
    if (isVaccinationOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
    return () => document.body.classList.remove(styles.noScroll);
  }, [isVaccinationOpen]);

  const closeBtnRef = useRef(null);
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsVaccinationOpen(false);
    };
    if (isVaccinationOpen) {
      document.addEventListener("keydown", onKeyDown);

      setTimeout(() => closeBtnRef.current && closeBtnRef.current.focus(), 0);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isVaccinationOpen]);

  return (
    <form className={styles.pet__form} onSubmit={(e) => e.preventDefault()}>
      <header className={styles.pet__header}>
        <div className={styles.pet__avatarWrap}>
          <Image
            src={pet?.photo_url || "/images/loading.svg"}
            alt={pet.name || "loading"}
            width={160}
            height={160}
            className={styles.pet__avatar}
            priority
          />
        </div>
        <div className={styles.pet__headerInfo}>
          <h1 className={styles.pet__name}>{pet.name}</h1>
          <span className={styles.pet__species}>{pet.species}</span>
        </div>
        <div className={styles.pet__headerActions}>
          <button
            type="button"
            onClick={onEdit}
            className={styles.pet__editButton}
            aria-label="Edit"
          >
            <Image src="/icons/edit.png" alt="Edit" width={22} height={22} />
          </button>
        </div>
      </header>

      <main className={styles.pet__main}>
        <section className={styles.pet__section}>
          <h2 className={styles.pet__sectionTitle}>Basic Info</h2>
          <div className={styles.pet__fields}>
            <div className={styles.pet__field}>
              <label>Breed</label>
              <span>{pet.breed}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Sex</label>
              <span>
                {pet.sex
                  ? pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1)
                  : ""}
              </span>
            </div>
            <div className={styles.pet__field}>
              <label>Color / Markings</label>
              <span>{pet.color_markings}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Date of Birth</label>
              <span>{formatDate(pet.date_of_birth)}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Country of Birth</label>
              <span>{pet.country_of_birth}</span>
            </div>

            {isAdmin && (
              <div className={styles.pet__field}>
                <label>Vaccination</label>
                <button
                  type="button"
                  className={styles.pet__vaccination}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsVaccinationOpen(true);
                  }}
                >
                  Add/Edit
                </button>
              </div>
            )}
          </div>
        </section>

        <section className={styles.pet__section}>
          <ProfileVaccination petId={pet.id} />
        </section>

        <section className={styles.pet__section}>
          <h2 className={styles.pet__sectionTitle}>Microchip</h2>
          <div className={styles.pet__fields}>
            <div className={styles.pet__field}>
              <label>Microchip Number</label>
              <span>{pet.microchip_number}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Implant Date</label>
              <span>{formatDate(pet.microchip_implant_date)}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Implant Location</label>
              <span>{pet.microchip_implant_location}</span>
            </div>
          </div>
        </section>

        <section className={styles.pet__section}>
          <h2 className={styles.pet__sectionTitle}>Passport</h2>
          <div className={styles.pet__fields}>
            <div className={styles.pet__field}>
              <label>Passport Number</label>
              <span>{pet.passport_number}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Country of Issue</label>
              <span>{pet.country_of_issue}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Issuing Date</label>
              <span>{formatDate(pet.issue_date)}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Issuing Authority</label>
              <span>{pet.issuing_authority}</span>
            </div>
            <div className={styles.pet__field}>
              <label>Current Status</label>
              <span>{pet.current_status}</span>
            </div>
          </div>
        </section>
      </main>

      {isVaccinationOpen && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="vaccinationModalTitle"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsVaccinationOpen(false);
          }}
        >
          <div className={styles.modal__content}>
            <header className={styles.modal__header}>
              <h3 id="vaccinationModalTitle" className={styles.modal__title}>
                Add / Edit Vaccinations
              </h3>
              <button
                ref={closeBtnRef}
                className={styles.modal__close}
                aria-label="Close dialog"
                onClick={() => setIsVaccinationOpen(false)}
              >
                ×
              </button>
            </header>
            <div className={styles.modal__body}>
              <AddVaccination petId={pet.id} />
            </div>
            <footer className={styles.modal__footer}>
              <button
                type="button"
                className={styles.modal__secondary}
                onClick={() => setIsVaccinationOpen(false)}
              >
                Done
              </button>
            </footer>
          </div>
        </div>
      )}
    </form>
  );
}
