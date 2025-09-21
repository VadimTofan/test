import styles from "./contact.module.css";
import Image from "next/image";

import pets from "/public/images/pets.png";
import facebookIcon from "/public/icons/facebook.svg";
import linkedinIcon from "/public/icons/linkedin.svg";
import instagramIcon from "/public/icons/instagram.svg";

export const metadata = { title: "Contact | PetPass" };

export default function ContactPage() {
  return (
    <main className={styles.contact}>
      <header className={styles.contact__header}>
        <p className={styles.contact__eyebrow}>CONTACT</p>
        <h1 className={styles.contact__title}>How can we help you?</h1>
        <p className={styles.contact__lead}>
          You are welcome to contact us using the form on the right. We will reply as soon as possible.
        </p>
      </header>

      <section className={styles.contact__grid}>
        <div className={styles.contact__media}>
          <div className={styles.contact__social}>
            <p className={styles.contact__socialTitle}>OUR SOCIAL MEDIA</p>
            <ul className={styles.social__list} aria-label="Social media links">
              <li className={styles.social__item}>
                <a href="#" aria-label="Facebook" className={styles.social__link}>
                  <Image src={facebookIcon} width={20} height={20} alt="Facebook" className={styles.social__icon} />
                </a>
              </li>
              <li className={styles.social__item}>
                <a href="#" aria-label="LinkedIn" className={styles.social__link}>
                  <Image src={linkedinIcon} width={20} height={20} alt="LinkedIn" className={styles.social__icon} />
                </a>
              </li>
              <li className={styles.social__item}>
                <a href="#" aria-label="Instagram" className={styles.social__link}>
                  <Image src={instagramIcon} width={20} height={20} alt="Instagram" className={styles.social__icon} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles.contact__panel} ${styles.contact__panelElevated}`}>
          <div className={styles.contact__petsWrapper} aria-hidden="true">
            <Image src={pets} alt="Pets" className={styles.contact__pets} />
          </div>

          <form className={styles.form} action="#" method="post">
            <div className={styles.form__field}>
              <label className={styles.form__label} htmlFor="name">
                Name
              </label>
              <input
                className={styles.form__input}
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
                maxLength={80}
              />
            </div>

            <div className={styles.form__field}>
              <label className={styles.form__label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.form__input}
                id="email"
                name="email"
                type="email"
                inputMode="email"
                placeholder="Email"
                required
                pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
                title="Please enter a valid email address (must include @)."
              />
            </div>

            <div className={styles.form__field}>
              <label className={styles.form__label} htmlFor="message">
                Notice
              </label>
              <textarea
                className={styles.form__textarea}
                id="message"
                name="message"
                placeholder="Notice"
                rows={6}
                required
              />
            </div>

            <div className={styles.form__actions}>
              <button className={`${styles.button} ${styles.buttonPrimary}`} type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
