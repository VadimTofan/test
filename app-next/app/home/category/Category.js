import styles from "./Category.module.css";
import Image from "next/image";

export default function Category() {
  const features = [
    { name: "Vaccinations", image: "/images/vaccination.webp" },
    { name: "Travel Papers", image: "/images/travel.webp" },
    { name: "Medical History", image: "/images/medical.webp" },
    { name: "Identification", image: "/images/identification.webp" },
    { name: "Reminders", image: "/images/reminder.webp" },
  ];

  return (
    <section className={styles.category}>
      <div className={styles.category__container}>
        <div className={styles.category__header}>
          <h2 className={styles.category__title}>Manage Your Pet’s Records</h2>
          <p className={styles.category__subtitle}>Keep all important information in one secure place — from health to travel.</p>
        </div>

        <div className={styles.category__grid}>
          {features.map((feature) => (
            <div key={feature.name} className={styles.category__card}>
              <div className={styles.category__imageContainer}>
                <Image src={feature.image} alt={feature.name} width={250} height={250} className={styles.category__image} />
              </div>
              <h3 className={styles.category__name}>{feature.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
