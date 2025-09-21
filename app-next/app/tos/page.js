"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function TermsOfServicePage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using PetPass, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our app.",
    },
    {
      title: "2. User Accounts",
      content:
        "You must create an account to use certain features of PetPass. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
    },
    {
      title: "3. User Conduct",
      content: "You agree to use PetPass only for lawful purposes. You must not post or transmit any content that is harmful, offensive, or infringes on the rights of others.",
    },
    {
      title: "4. Intellectual Property",
      content:
        "All content and materials on PetPass, including text, graphics, logos, and images, are the property of PetPass or its licensors and are protected by copyright and other intellectual property laws.",
    },
    {
      title: "5. Termination",
      content:
        "We reserve the right to terminate or suspend your account at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of PetPass.",
    },
    {
      title: "6. Disclaimers and Limitation of Liability",
      content: "PetPass is provided 'as is' without warranties of any kind. We are not liable for any damages arising from your use of the app.",
    },
  ];

  return (
    <div className={styles.tos}>
      <h1 className={styles.tos__header}>Terms of Service</h1>
      <p className={styles.tos__intro}>Welcome to PetPass! By using our app, you agree to comply with and be bound by the following terms and conditions.</p>

      <div className={styles.tos__section}>
        {sections.map((section, index) => (
          <div key={index} className={`${styles.tos__item} ${openIndex === index ? styles.open : ""}`} onClick={() => toggleSection(index)}>
            <div className={styles.tos__title}>
              {section.title}
              <span className={styles.tos__icon}>{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && <div className={styles.tos__content}>{section.content}</div>}
          </div>
        ))}
      </div>

      <p className={styles.tos__conclusion}>
        By using PetPass, you acknowledge that you have read, understood, and agree to these Terms of Service. If you have any questions, please contact us at <strong>not@avaliable.yet</strong>.
      </p>
    </div>
  );
}
