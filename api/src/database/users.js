import dbClient from "./database_client.js";

export async function addUser(user) {
  return dbClient("users").insert(user);
}

export async function deleteUserByGoogleId(id) {
  return dbClient("users").where("google_id", id).del();
}

export async function getUserById(id) {
  return dbClient("users").select("*").where("id", id);
}

export async function updateUserByEmail(email, user) {
  return dbClient("users").where("email", email).update(user);
}

export async function getUserByName(userName) {
  return dbClient("users").select("*").where("full_name", userName);
}

export async function getUserByPhoneNumber(phone) {
  return dbClient("users").select("*").where("phone", phone);
}

export async function getUserByEmail(email) {
  const [user] = await dbClient("users").select("*").where("email", email);
  return user;
}
