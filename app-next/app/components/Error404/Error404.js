import styles from "./Error404.module.css";

import Image from "next/image";

export default function Error404() {
  return (
    <section className={styles.error}>
      <Image src="/images/error404.webp" alt="Error 404" width={500} height={500} priority className={styles.error__image} />
      <div className={styles.error__content}>
        <h1 className={styles.error__header}>Ooops! 404 - PAGE NOT FOUND</h1>
        <p className={styles.error__text}>The page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
      </div>
    </section>
  );
}
