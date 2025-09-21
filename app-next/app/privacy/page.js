"use client";
import styles from "./page.module.css";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.privacy}>
      <h1 className={styles.privacy__title}>Privacy Policy</h1>
      <p className={styles.privacy__intro}>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our app.</p>

      <section className={styles.privacy__section}>
        <h2>1. Information We Collect</h2>
        <p>
          We may collect information that you provide directly, such as your name, email address, pet details, and profile picture. We may also collect technical information like device type and app
          usage.
        </p>
      </section>

      <section className={styles.privacy__section}>
        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and improve our services.</li>
          <li>Personalize your experience.</li>
          <li>Ensure account security.</li>
          <li>Communicate updates and support messages.</li>
        </ul>
      </section>

      <section className={styles.privacy__section}>
        <h2>3. Data Security</h2>
        <p>We implement appropriate measures to protect your data. However, no system is 100% secure, and we cannot guarantee absolute protection.</p>
      </section>

      <section className={styles.privacy__section}>
        <h2>4. Sharing of Information</h2>
        <p>We do not sell your personal information. We may share data only with trusted third parties to provide services such as authentication, hosting, or analytics.</p>
      </section>

      <section className={styles.privacy__section}>
        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access and update your personal information.</li>
          <li>Request deletion of your account.</li>
          <li>Control your data-sharing preferences.</li>
        </ul>
      </section>

      <section className={styles.privacy__section}>
        <h2>6. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page, with the updated date at the top.</p>
      </section>

      <section className={styles.privacy__section}>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <strong>not@avaliable.yet</strong>.
        </p>
      </section>
    </div>
  );
}
