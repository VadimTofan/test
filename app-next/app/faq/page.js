"use client";
import { useState } from "react";
import styles from "./page.module.css";

const faqs = [
  {
    question: "How do I add a new pet?",
    answer: "Go to your profile page and click on 'Add New Pet'. Fill in the details and save.",
  },
  {
    question: "Can I edit my pet's profile picture?",
    answer: "Yes! Open your pet's profile and click 'Edit Pet Picture' to upload or paste a new image link.",
  },
  {
    question: "How do I edit my profile information?",
    answer: "On your profile page, click the settings icon to edit your personal details.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use secure authentication and data protection measures to keep your information safe.",
  },
];
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className={styles.faq}>
      <h1 className={styles.faq__title}>Frequently Asked Questions</h1>
      <div className={styles.faq__list}>
        {faqs.map((faq, index) => (
          <div key={index} className={`${styles.faq__item} ${openIndex === index ? styles.open : ""}`} onClick={() => toggleFAQ(index)}>
            <div className={styles.faq__question}>
              {faq.question}
              <span className={styles.faq__icon}>{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && <div className={styles.faq__answer}>{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
