import dbClient from "./database_client.js";

export async function getPetByUserId(userId) {
  return dbClient("pets").select("*").where("owner_user_id", userId);
}

export async function getPetByName(petName) {
  return dbClient("pets").select("*").where("name", petName);
}

export async function getPetById(id) {
  const [pet] = await dbClient("pets").select("*").where("id", id);
  return pet;
}

export async function getPetByMicrochipNumber(microchipNumber) {
  return dbClient("pets").select("*").where("microchip_number", microchipNumber);
}

export async function getPetByPassportNumber(passportNumber) {
  return dbClient("pets").select("*").where("passport_number", passportNumber);
}

export async function updatePetById(id, pet) {
  return dbClient("pets").where("id", id).update(pet);
}

export async function addPet(pet) {
  const [id] = await dbClient("pets").insert(pet).returning("id");
  return id;
}

export async function deletePetById(id) {
  return dbClient("pets").where("id", id).del();
}

export async function getAllPets() {
  return dbClient("pets").select("*");
}

export async function getPetsFiltered(filters = {}) {
  const query = dbClient("pets").innerJoin("users", "pets.owner_user_id", "users.id").select("users.email", "users.phone", "users.full_name", "pets.*");

  const filterText = String(filters.search);
  if (filters.search) {
    const searchTerm = `%${filterText}%`;

    query.where(function () {
      this.whereILike("pets.name", searchTerm)
        .orWhereILike("pets.breed", searchTerm)
        .orWhereILike("pets.species", searchTerm)
        .orWhereILike("pets.microchip_number", searchTerm)
        .orWhereILike("users.full_name", searchTerm)
        .orWhereILike("users.phone", searchTerm)
        .orWhereILike("users.email", searchTerm);
    });
  }

  const sortMap = {
    Name: "pets.name",
    Species: "pets.species",
    Breed: "pets.breed",
    Sex: "pets.sex",
    Birthday: "pets.date_of_birth",
    Country: "pets.country_of_birth",
    Passport: "pets.passport_number",
    Microchip: "pets.microchip_number",
    Owner: "users.full_name",
    Email: "users.email",
    Phone: "users.phone",
  };

  const sortKey = filters.sortKey && sortMap[filters.sortKey];
  const sortOrder = filters.sortOrder === "desc" ? "desc" : "asc";

  if (sortKey) {
    query.orderBy([{ column: sortKey, order: sortOrder }]);
  } else {
    query.orderBy([{ column: "pets.name", order: "asc" }]);
  }

  return query;
}
