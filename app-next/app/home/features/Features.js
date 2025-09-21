"use client";

import styles from "./Features.module.css";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Features() {
  const router = useRouter();

  const features = [
    {
      title: "All Records in One Place",
      description: "From vaccinations to travel papers — securely store everything your pet needs, always accessible when you need it.",
      image: "/images/record.webp",
      buttonText: "GET STARTED",
      destination: "/profile",
    },
    {
      title: "Stay on Top of Pet Care",
      description: "Never miss a vet appointment or vaccine again. Set reminders and keep your pet’s health on track with ease.",
      image: "/images/petcare.webp",
      buttonText: "LEARN MORE",
      destination: "/profile",
    },
  ];

  const handleButtonClick = (destination) => {
    router.push(`${destination}`);
  };

  return (
    <section className={styles.features}>
      <div className={styles.features__container}>
        <div className={styles.features__grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.features__card}>
              <div className={styles.features__imageContainer}>
                <Image src={feature.image} alt={feature.title} width={1000} height={1000} className={styles.features__image} />
                <div className={styles.features__overlay}></div>
              </div>
              <div className={styles.features__content}>
                <h3 className={styles.features__title}>{feature.title}</h3>
                <p className={styles.features__description}>{feature.description}</p>
                {feature.destination && (
                  <button className={styles.features__button} onClick={() => handleButtonClick(feature.destination)}>
                    {feature.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
