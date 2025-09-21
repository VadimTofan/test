"use client";

import styles from "./PetsAllView.module.css";
import Error404 from "@/app/components/Error404/Error404";
import formatDate from "@/app/components/FormatDate/FormatDate";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import api from "@/lib/api"; 

const ITEMS_PER_PAGE = 20;

export default function PetsAllView() {
  const { user, loading: isLoadingSession } = useAuth();
  const router = useRouter();

  const isAuthed = !!user;
  const isAdmin = isAuthed && user?.role === "admin";

  const [pets, setPets] = useState(null);
  const [petsError, setPetsError] = useState(null);
  const [petsLoading, setPetsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);

  const totalItems = pets?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    if (!pets?.length) return [];
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return pets.slice(start, start + ITEMS_PER_PAGE);
  }, [pets, safePage]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => setPage(1), [debouncedSearchTerm, sortConfig]);

  useEffect(() => {
    if (!isAdmin) return; 
    let cancel = false;

    async function fetchPets() {
      setPetsLoading(true);
      setPetsError(null);

      try {
        const params = new URLSearchParams();
        if (debouncedSearchTerm) params.set("title", debouncedSearchTerm);
        if (sortConfig.key) {
          params.set("sortKey", sortConfig.key);
          params.set("sortOrder", sortConfig.direction);
        }

        const data = await api(`/api/pets?${params.toString()}`, {
          cache: "no-store",
        });

        if (!cancel) setPets(data);
      } catch (e) {
        if (!cancel) setPetsError(e.message || "Unknown error");
      } finally {
        if (!cancel) setPetsLoading(false);
      }
    }

    fetchPets();
    return () => {
      cancel = true;
    };
  }, [isAdmin, debouncedSearchTerm, sortConfig]);

  if (isLoadingSession) {
    return <div className={styles.pets__loading}>Loading…</div>;
  }

  if (!isAuthed) return <Error404 />;

  if (!isAdmin) {
    return <div className={styles.pets__denied}>You don&apos;t have access</div>;
  }

  if (petsError)
    return <div className={styles.pets__error}>Pets error: {petsError}</div>;
  if (petsLoading) return <div className={styles.pets__loading}>Loading…</div>;

  const cell = (v) =>
    v === null || v === undefined || v === "" ? "—" : String(v);
  const columns = [
    "Name",
    "Species",
    "Breed",
    "Sex",
    "Birthday",
    "Country",
    "Passport",
    "Microchip",
    "Owner",
    "Email",
    "Phone",
  ];

  const handleSort = (column) => {
    setSortConfig((prev) =>
      prev.key === column
        ? { key: column, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key: column, direction: "asc" }
    );
  };

  const handlePetClick = (id) => router.push(`/profile/pets/${id}`);

  return (
    <section className={styles.pets}>
      <div className={styles.pets__header}>
        <h2 className={styles.pets__h2}>Full list of pets</h2>
        <form
          className={styles.pets__search}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className={styles.pets__input}
            type="text"
            placeholder="Search pets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <span className={styles.pets__pages}>
          Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}–
          {Math.min(safePage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </span>
      </div>

      <div className={styles.pets__spreadsheet}>
        <div className={styles.pets__right}>
          <table className={styles.pets__table} role="table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className={`${styles.pets__title} ${
                      styles[`pets__${column}`]
                    }`}
                    onClick={() => handleSort(column)}
                  >
                    {column}
                    <span
                      className={
                        sortConfig.key === column
                          ? sortConfig.direction === "asc"
                            ? styles.pets__arrowUp
                            : styles.pets__arrowDown
                          : ""
                      }
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((pet, index) => (
                <tr
                  key={pet.id || index}
                  onClick={() => handlePetClick(pet.id)}
                >
                  <td className={`${styles.pets__cell} ${styles.pets__name}`}>
                    {cell(pet.name)}
                  </td>
                  <td className={styles.pets__cell}>{cell(pet.species)}</td>
                  <td className={styles.pets__cell}>{cell(pet.breed)}</td>
                  <td className={styles.pets__cell}>{cell(pet.sex)}</td>
                  <td className={styles.pets__cell}>
                    {formatDate(pet.date_of_birth)}
                  </td>
                  <td className={styles.pets__cell}>
                    {cell(pet.country_of_birth)}
                  </td>
                  <td className={styles.pets__cell}>
                    {cell(pet.passport_number)}
                  </td>
                  <td className={styles.pets__cell}>
                    {cell(pet.microchip_number)}
                  </td>
                  <td className={styles.pets__cell}>{cell(pet.full_name)}</td>
                  <td className={styles.pets__cell}>{cell(pet.email)}</td>
                  <td className={styles.pets__cell}>{cell(pet.phone)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <nav className={styles.pets__pages} aria-label="Pets pages">
        <button
          className={styles.pets__button}
          disabled={safePage === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ‹ Prev
        </button>
        <span className={styles.pets__status}>
          Page {safePage} of {totalPages}
        </span>
        <button
          className={styles.pets__button}
          disabled={safePage === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next ›
        </button>
      </nav>
    </section>
  );
}
