"use client";

import styles from "./EditVaccination.module.css";
import api from "@/lib/api";

import { useEffect, useState } from "react";

export default function EditVaccination({ open, onClose, vaccination, onSaved }) {
  const [form, setForm] = useState({
    vaccine_name: "",
    date_administered: "",
    next_due: "",
    veterinarian: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open || !vaccination) return;
    setForm({
      vaccine_name: vaccination.vaccine_name || "",
      date_administered: (vaccination.date_administered || "").slice(0, 10),
      next_due: vaccination.next_due ? String(vaccination.next_due).slice(0, 10) : "",
      veterinarian: vaccination.veterinarian || "",
      notes: vaccination.notes || "",
    });
    setErr("");
  }, [open, vaccination]);

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!vaccination?.id) {
      setErr("Missing id for vaccination");
      return;
    }
    if (!form.vaccine_name || !form.date_administered) {
      setErr("vaccine_name and date_administered are required");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    if (form.date_administered > today) {
      setErr("Date administered cannot be in the future.");
      return;
    }
    if (form.next_due && form.next_due <= form.date_administered) {
      setErr("Next due date must be after the administered date.");
      return;
    }

    const payload = {
      vaccine_name: form.vaccine_name,
      date_administered: form.date_administered,
      next_due: form.next_due || null,
      veterinarian: form.veterinarian || null,
      notes: form.notes || null,
    };

    try {
      setSaving(true);
      await api(`/api/vaccinations/${encodeURIComponent(vaccination.id)}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      onSaved?.();
    } catch (e) {
      setErr(e?.message || "Failed to update vaccination");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <section className={styles.vaccination} onClick={onClose}>
      <div className={styles.vaccination__block} onClick={(e) => e.stopPropagation()}>
        <div className={styles.vaccination__header}>
          <h3 className={styles.vaccination__title}>Edit vaccination</h3>
          <button className={styles.vaccination__buttonClose} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.vaccination__body}>
          <div className={styles.vaccination__row}>
            <label>Vaccine name*</label>
            <input name="vaccine_name" value={form.vaccine_name} onChange={onChange} required className={styles.vaccination__field} />
          </div>

          <div className={styles.vaccination__row}>
            <label>Date administered*</label>
            <input type="date" name="date_administered" value={form.date_administered} onChange={onChange} required className={styles.vaccination__field} />
          </div>

          <div className={styles.vaccination__row}>
            <label>Next due</label>
            <input type="date" name="next_due" value={form.next_due} onChange={onChange} className={styles.vaccination__field} />
          </div>

          <div className={styles.vaccination__row}>
            <label>Veterinarian</label>
            <input name="veterinarian" value={form.veterinarian} onChange={onChange} className={styles.vaccination__field} />
          </div>

          <div className={styles.vaccination__row}>
            <label>Notes</label>
            <textarea name="notes" value={form.notes} onChange={onChange} rows={3} className={styles.vaccination__field} />
          </div>

          {err && <p className={styles.vaccination__error}>{err}</p>}

          <div className={styles.vaccination__footer}>
            <button type="button" className={styles.vaccination__buttonGhost} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.vaccination__button} onClick={onSubmit} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
