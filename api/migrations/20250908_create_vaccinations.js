export async function up(knex) {
  const exists = await knex.schema.hasTable("vaccinations");
  if (exists) return;

  await knex.schema.createTable("vaccinations", (t) => {
    t.increments("id").primary();
    t
      .integer("pet_id")
      .notNullable()
      .references("id")
      .inTable("pets")
      .onDelete("CASCADE");
    t.string("vaccine_name", 150).notNullable();
    t.date("date_administered").notNullable();
    t.date("next_due");
    t.string("veterinarian", 100);
    t.text("notes");
    t.timestamps(true, true); // created_at, updated_at
  });

  await knex.schema.alterTable("vaccinations", (t) => {
    t.index(["pet_id"], "idx_vaccinations_pet_id");
    t.index(["date_administered"], "idx_vaccinations_date");
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("vaccinations");
}
