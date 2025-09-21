import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "Home", path: "/home" },
    { name: "My Pets", path: "/profile" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__section}>
            <h3 className={styles.footer__sectionTitle}>PetPass</h3>
            <p className={styles.footer__description}>The digital passport for your pets. Store vaccinations, medical history, and travel documents securely in one place.</p>
            <div className={styles.footer__contact}>
              <div className={styles.footer__contactItem}>
                <Mail size={16} className={styles.footer__contactIcon} />
                <span>not@avaliable.yet</span>
              </div>
            </div>
          </div>

          <div className={styles.footer__section}>
            <h4 className={styles.footer__sectionTitle}>Quick Links</h4>
            <ul className={styles.footer__list}>
              {quickLinks.map((link, index) => (
                <li key={index} className={styles.footer__listItem}>
                  <Link href={link.path} className={styles.footer__link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footer__section}>
            <h4 className={styles.footer__sectionTitle}>Support</h4>
            <ul className={styles.footer__list}>
              <li className={styles.footer__listItem}>
                <Link href="/faq" className={styles.footer__link}>
                  FAQ
                </Link>
              </li>
              <li className={styles.footer__listItem}>
                <Link href="/privacy" className={styles.footer__link}>
                  Privacy Policy
                </Link>
              </li>
              <li className={styles.footer__listItem}>
                <Link href="/tos" className={styles.footer__link}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footer__section}>
            <h4 className={styles.footer__sectionTitle}>Follow Us</h4>
            <div className={styles.footer__social}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a key={index} href={social.href} className={styles.footer__socialLink} aria-label={social.label}>
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <p className={styles.footer__copyright}>&copy; {new Date().getFullYear()} PetPass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
