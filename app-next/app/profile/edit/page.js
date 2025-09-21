"use client";

import styles from "./page.module.css";
import FetchUserData from "../components/DBFunctions/FetchUserData";
import api from "@/lib/api";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/providers";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const today = new Date().toISOString().slice(0, 10);
  const { user: authUser, loading: status } = useAuth();
  const [draft, setDraft] = useState({
    name: "",
    species: "",
    sex: "",
    date_of_birth: today,
  });
  const isAuthed = !!authUser;
  const email = authUser?.email ?? "";
  const { user } = FetchUserData(email);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setDraft((prev) => ({
        ...prev,
        ...user,
        date_of_birth: user.date_of_birth || prev.date_of_birth,
      }));
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleGoogle = async () => {
    setErr("");
    localStorage.setItem("returnTo", pathname || "/profile/edit");
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErr(null);
    try {
      const now = new Date().toISOString();

      const res = await api(`/api/users/${email}`, {
        method: "PUT",
        body: JSON.stringify({
          ...draft,
          email: draft?.email ?? email,
          created_at: draft?.created_at ?? now,
          updated_at: now,
        }),
      });

      setSuccess(true);
      setDraft(null);
    } catch (e) {
      setErr(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.signup}>
      <div className={styles.signup__container}>
        <div className={styles.signup__left}>
          <h1 className={styles.signup__heading}>Edit your account</h1>

          <div className={styles.signup__imageWrap}>
            <Image className={styles.signup__image} src="/images/pets-signup.png" width={800} height={800} priority alt="Cat and dog looking at a phone" loading="eager" />
          </div>
        </div>
        {!success ? (
          <>
            {!isAuthed ? (
              <button type="button" onClick={handleGoogle} className={styles.signup__google}>
                <span className={styles.signup__googleIcon}>
                  <Image src="/icons/google.svg" width={25} height={25} alt="Google" />
                </span>
                Continue with Google
              </button>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className={styles.signup__field}>
                  <input
                    className={styles.signup__input}
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    value={draft?.full_name ?? ""}
                    onChange={(e) => setDraft({ ...draft, full_name: e.target.value })}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className={styles.signup__field}>
                  <input
                    className={styles.signup__input}
                    type="tel"
                    name="mobile"
                    placeholder="Phone Number"
                    value={draft?.phone ?? ""}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setDraft({ ...draft, phone: digitsOnly });
                    }}
                    autoComplete="tel"
                    minLength={8}
                    maxLength={15}
                    required
                  />
                </div>

                <div className={styles.signup__field}>
                  <input
                    className={styles.signup__input}
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={draft?.address ?? ""}
                    onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                    autoComplete="street-address"
                    required
                  />
                </div>

                <div className={styles.signup__dob}>
                  <label htmlFor="date_of_birth">Date of Birth</label>
                  <input
                    id="date_of_birth"
                    className={styles.signup__dobInput}
                    type="date"
                    name="date_of_birth"
                    value={(draft?.date_of_birth ?? "").slice(0, 10)}
                    onChange={(e) => setDraft({ ...draft, date_of_birth: e.target.value })}
                    autoComplete="bday"
                    required
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className={styles.signup__field}>
                  <input
                    className={styles.signup__input}
                    type="text"
                    name="passport_number"
                    placeholder="Passport Number"
                    value={draft?.passport_number ?? ""}
                    onChange={(e) => setDraft({ ...draft, passport_number: e.target.value })}
                    minLength={8}
                    maxLength={8}
                    required
                  />
                </div>

                <button type="submit" className={styles.signup__primary} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Update account"}
                </button>
                {err && (
                  <p className={styles.signup__fail}>
                    {err}, please try again later <br />
                  </p>
                )}
                <p className={styles.signup__terms}>By continuing, you agree to our Terms and Privacy Policy.</p>
              </form>
            )}
          </>
        ) : (
          <div>
            <p className={styles.signup__ok}>You successfully updated your information.</p>
            <Link href="/profile" className={styles.signup__profile}>
              Go back to your profile.
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
