"use client";

import { useMemo, useState, useEffect } from "react";
import styles from "./VaccinationList.module.css";
import formatDate from "@/app/components/FormatDate/FormatDate";

export default function VaccinationList({ items, canEdit, onEdit, onDelete, pageSize = 3 }) {
  const data = Array.isArray(items) ? items : [];
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [data.length, pageSize, totalPages]);

  const pages = useMemo(() => {
    const array = Array.isArray(items) ? items : [];
    const start = (page - 1) * pageSize;
    return array.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  if (!data.length) {
    return <p className={styles.vaccination__info}>No records.</p>;
  }

  const startIdx = (page - 1) * pageSize + 1;
  const endIdx = Math.min(page * pageSize, data.length);

  return (
    <div className={styles.list}>
      <table className={styles.vaccination__table}>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Administered</th>
            <th>Next due</th>
            <th>Veterinarian</th>
            <th>Notes</th>
            {canEdit && <th className={styles.vaccination__actions}>Actions</th>}
          </tr>
        </thead>
        <tbody className={styles.vaccination__grid}>
          {pages.map((vaccination) => (
            <tr key={vaccination.id}>
              <td>
                <div className={styles.vaccination__cell}>{vaccination.vaccine_name}</div>
              </td>
              <td>
                <div className={styles.vaccination__cell}>
                  {vaccination.date_administered ? formatDate(vaccination.date_administered) : "-"}
                </div>
              </td>
              <td>
                <div className={styles.vaccination__cell}>
                  {vaccination.next_due ? formatDate(vaccination.next_due) : "-"}
                </div>
              </td>
              <td>
                <div className={styles.vaccination__cell}>{vaccination.veterinarian || "-"}</div>
              </td>
              <td className={styles.vaccination__notes}>{vaccination.notes || "-"}</td>
              {canEdit && (
                <td className={styles.vaccination__action}>
                  <button
                    type="button"
                    className={styles.vaccination__buttonLink}
                    onClick={() => onEdit?.(vaccination)}
                    aria-label={`Edit vaccination ${vaccination.vaccine_name}`}
                  >
                    Edit
                  </button>
                  <span className={styles.vaccination__separator}>·</span>
                  <button
                    type="button"
                    className={styles.vaccination__buttonDanger}
                    onClick={() => onDelete?.(vaccination.id)}
                    aria-label={`Delete vaccination ${vaccination.vaccine_name}`}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.vaccination__pagination} role="navigation" aria-label="Vaccinations pagination">
        <div className={styles.vaccination__summary}>
          {startIdx}–{endIdx} of {data.length}
        </div>
        <div className={styles.vaccination__controls}>
          <button
            type="button"
            className={styles.vaccination__buttonPage}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹ Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            const n = i + 1;
            return (
              <button
                type="button"
                key={n}
                className={`${styles.vaccination__buttonPage} ${n === page ? styles.vaccination__isActive : ""}`}
                aria-current={n === page ? "page" : undefined}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            );
          })}

          <button
            type="button"
            className={styles.vaccination__buttonPage}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}
