"use client";

import styles from "./AddVaccination.module.css";

import ListVaccination from "../ListVaccination/VaccinationList";
import FormVaccination from "../FormVaccination/FormVaccination";
import EditVaccination from "../EditVaccination/EditVaccination";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/app/providers";
import api from "@/lib/api"; // or "@/app/lib/api" if that's where your file is

export default function AddVaccination({ petId }) {
  const { user } = useAuth();
  const isAdmin = !!user && user.role === "admin";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);



  const load = useCallback(async () => {
    if (!petId) {
      setErr("Missing pet id (?pet=...)");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setErr("");
      const data = await api(`/api/pets/${encodeURIComponent(petId)}/vaccinations`, { cache: "no-store" });
      setItems(Array.isArray(data) ? data : data?.vaccinations || []);
    } catch (e) {
      setErr(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleEdit = (v) => {
    setEditing(v);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    const ok = window.confirm("Delete this vaccination?");
    if (!ok) return;

    try {
      await api(`/api/vaccinations/${encodeURIComponent(id)}`, { method: "DELETE" });
      await load();
    } catch (e) {
      alert(e?.message || "Error");
    }
  };

  return (
    <section className={styles.vaccination}>
      {loading && <p className={styles.vaccination__info}>Loading…</p>}
      {err && <p className={styles.vaccination__error}>{err}</p>}

      {!loading && !err && (
        <>
          {isAdmin && <FormVaccination petId={petId}  onCreated={load} />}
          <ListVaccination items={items} canEdit={isAdmin} onEdit={handleEdit} onDelete={handleDelete} />

          {editOpen && editing && (
            <EditVaccination
              open={editOpen}
              onClose={() => setEditOpen(false)}
              vaccination={editing}
              onSaved={async () => {
                setEditOpen(false);
                setEditing(null);
                await load();
              }}
            />
          )}
        </>
      )}
    </section>
  );
}
