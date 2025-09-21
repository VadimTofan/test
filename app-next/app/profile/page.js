"use client";

import styles from "./page.module.css";
import Image from "next/image";

import FetchUserData from "./components/DBFunctions/FetchUserData";
import useFetchUserPetData from "./components/DBFunctions/FetchUserPetData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/providers";
export default function ProfilePage() {

  const router = useRouter();
  const { user: userprofile, loading: loading } = useAuth();

  const { user, isLoading: userLoading, error: userError } = FetchUserData(userprofile?.email);
  const { pets = [], isLoading: petsLoading } = useFetchUserPetData(user?.id);

  const userPicture = userprofile?.photo ?? "/images/loading.svg";

  const count = (pets?.length || 0) + 1;
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);
  const isAuthed = !!userprofile;
  const goTo = (i) => {
    const next = (i + count) % count;
    setIndex(next);
    if (carouselRef.current) {
      carouselRef.current.style.setProperty("--index", String(next));
      carouselRef.current.style.setProperty("--count", String(count));
    }
  };

  useEffect(() => {
    goTo(0);
  }, [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count]);

  useEffect(() => {
    let startX = 0;
    const el = carouselRef.current;
    if (!el) return;

    const onTouchStart = (e) => (startX = e.touches[0].clientX);
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, count]);
 
  if (isAuthed === false) {
    return (
      <section className={styles.profile}>
        <div className={styles.profile__header}>
          <p className={styles.profile__loading}>You have to log in first.</p>
        </div>
      </section>
    );
  }

  if (loading || userLoading) {
    return (
      <section className={styles.profile}>
        <div className={styles.profile__header}>
          <p className={styles.profile__loading}>Loading…</p>
        </div>
      </section>
    );
  }

  if (userError) {
    return (
      <section className={styles.profile}>
        <div className={styles.profile__header}>
          <p className={styles.profile__loading}>This user has no profile yet.</p>
          <Link className={styles.profile__login} href="/profile/edit">
            Set up user Profile?
          </Link>
        </div>
      </section>
    );
  }
  const handleSettingsClick = () => router.push(`/profile/edit`);
  const handlePetCardClick = (id) => router.push(`/profile/pets/${id}`);
  const handleAddPickClick = () => router.push(`/profile/pets/new`);

  const isActive = (i) => i === index;
  const isPrev = (i) => (index - 1 + count) % count === i;
  const isNext = (i) => (index + 1) % count === i;

  const isValidUrl = (str) => {
    if (!str) return false;
    try {
      const u = new URL(str);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  return (
    <section className={styles.profile}>
      <div className={styles.profile__header}>
        <Image src={userPicture} alt="Profile" width={300} height={300} className={styles.profile__avatar} priority />
        <div className={styles.profile__edit}>
          <h1 className={styles.profile__name}>{user?.full_name}</h1>
          <Image onClick={handleSettingsClick} className={styles.profile__settings} src="/icons/settings.png" width={35} height={5} alt="settings button" />
        </div>
      </div>

      <span className={styles.profile__divider}></span>

      <div className={styles.profile__pets}>
        {petsLoading && <p className={styles.profile__loading}>Loading pets…</p>}

        {!petsLoading && (
          <div className={styles.profile__carousel} ref={carouselRef} data-count={count} style={{ "--count": count, "--index": index }} aria-roledescription="carousel" aria-label="Pets carousel">
            <div className={styles.profile__carouselStage}>
              {(pets || []).map((pet, i) => {
                const imgSrc = isValidUrl(pet?.photo_url) ? pet.photo_url : "/images/logo.png";

                return (
                  <figure
                    key={pet.id}
                    className={styles.profile__carouselItem}
                    style={{ "--i": i }}
                    data-active={isActive(i) ? "true" : undefined}
                    data-near={isPrev(i) || isNext(i) ? "true" : undefined}
                    onClick={() => handlePetCardClick(pet.id)}
                    role="button"
                    aria-label={pet.name || "Pet"}
                    tabIndex={0}
                  >
                    <Image src={imgSrc} alt={pet.name || "Pet"} width={220} height={220} className={styles.profile__carouselImg} priority />
                    <figcaption className={styles.profile__carouselName}>{pet.name}</figcaption>
                  </figure>
                );
              })}
              <figure
                className={`${styles.profile__carouselItem} ${styles.profile__carouselItemAdd}`}
                style={{ "--i": pets?.length || 0 }}
                data-active={isActive(pets?.length || 0) ? "true" : undefined}
                data-near={isPrev(pets?.length || 0) || isNext(pets?.length || 0) ? "true" : undefined}
                onClick={handleAddPickClick}
                role="button"
                aria-label="Add new pet"
                tabIndex={0}
              >
                <span className={styles.profile__carouselAddIcon}>＋</span>
                <figcaption className={styles.profile__carouselAddText}>Add New Pet</figcaption>
              </figure>
            </div>
            <button className={`${styles.profile__carouselArrow} ${styles.profile__carouselArrowLeft}`} aria-label="Previous" onClick={() => goTo(index - 1)}>
              ‹‹
            </button>
            <button className={`${styles.profile__carouselArrow} ${styles.profile__carouselArrowRight}`} aria-label="Next" onClick={() => goTo(index + 1)}>
              ››
            </button>
            <div className={styles.profile__carouselDots} aria-label="Carousel Dots">
              {Array.from({ length: count }).map((_, i) => (
                <button key={`dot-${i}`} aria-label={`Go to slide ${i + 1}`} className={`${styles.profile__carouselDot} ${i === index ? styles.isActive : ""}`} onClick={() => goTo(i)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
