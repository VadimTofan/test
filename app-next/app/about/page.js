import styles from "./page.module.css";

import Image from "next/image";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.about__container}>
        <div className={styles.about__content}>
          <div className={styles.about__text}>
            <h2 className={styles.about__title}>About PetPass</h2>

            <p className={styles.about__description}>
              PetPass is your digital solution for managing everything your pet needs. From vaccination records to travel papers, we help you keep all your pet’s important documents safe, organized,
              and accessible anywhere.
            </p>

            <p className={styles.about__description}>
              We believe pets are family, and caring for them should be simple. PetPass was designed to give owners peace of mind — whether you’re visiting the vet, crossing borders, or just keeping
              track of everyday care.
            </p>

            <div className={styles.about__features}>
              <div className={styles.about__feature}>
                <div className={styles.about__featureIcon}>✓</div>
                <span>Securely Store Medical Records</span>
              </div>
              <div className={styles.about__feature}>
                <div className={styles.about__featureIcon}>✓</div>
                <span>Easy Access to Travel Documents</span>
              </div>
              <div className={styles.about__feature}>
                <div className={styles.about__featureIcon}>✓</div>
                <span>Reminders for Vaccinations & Appointments</span>
              </div>
              <div className={styles.about__feature}>
                <div className={styles.about__featureIcon}>✓</div>
                <span>Simple & User-Friendly Design</span>
              </div>
            </div>
          </div>

          <div className={styles.about__media}>
            <div className={styles.about__imageContainer}>
              <Image width={150} height={150} src="/images/about.webp" alt="person holding a puppy" className={styles.about__image} />
              <div className={styles.about__overlay}>
                <div className={styles.about__overlayContent}>
                  <h3>One App</h3>
                  <p>For All Your Pet’s Documents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
