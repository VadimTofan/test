"use client";

import styles from "./Hero.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";

export default function Hero() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isAuthed = !!user;

  const handleGetStarted = () => {
    if (!isAuthed) {
      localStorage.setItem("returnTo", "/profile/edit");

      window.location.href = "/auth/google";
      return;
    }

    router.push("/profile/edit");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.hero__image}>
        <Image src="/images/hero.webp" alt="Beautiful cat" width={3500} height={3500} className={styles.hero__background} priority />
        <div className={styles.hero__overlay}></div>
      </div>

      <div className={styles.hero__content}>
        <div className={styles.hero__text}>
          <h1 className={styles.hero__title}>Your Pet’s Passport, Always With You</h1>
          <p className={styles.hero__description}>
            Keep all your pet’s important documents in one secure place. From vaccination records to travel papers — everything is safe, accessible, and ready when you need it.
          </p>

          {!loading && !isAuthed && (
            <button className={styles.hero__button} onClick={handleGetStarted}>
              GET STARTED
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
