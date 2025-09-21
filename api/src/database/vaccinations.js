import dbClient from "./database_client.js";

export async function getVaccinationsByPetId(petId) {
  return dbClient("vaccinations").select("*").where({ pet_id: petId });
}

export async function getVaccinationById(id) {
  const [vaccination] = await dbClient("vaccinations").select("*").where({ id });
  return vaccination;
}

export async function addVaccination(petId, vaccinationData) {
  const [newVaccination] = await dbClient("vaccinations")
    .insert({
      pet_id: petId,
      vaccine_name: vaccinationData.vaccine_name,
      date_administered: vaccinationData.date_administered,
      next_due: vaccinationData.next_due,
      veterinarian: vaccinationData.veterinarian,
      notes: vaccinationData.notes,
    })
    .returning("*");
  return newVaccination;
}

export async function updateVaccination(id, updates) {
  const [updated] = await dbClient("vaccinations").where({ id }).update(updates).returning("*");
  return updated;
}

export async function deleteVaccination(id) {
  return dbClient("vaccinations").where({ id }).del();
}
