export async function up(knex) {
  const hasColumn = await knex.schema.hasColumn("pets", "photo_url");
  if (!hasColumn) {
    await knex.schema.alterTable("pets", (table) => {
      table.text("photo_url").nullable();
    });
  }
}

export async function down(knex) {
  const hasColumn = await knex.schema.hasColumn("pets", "photo_url");
  if (hasColumn) {
    await knex.schema.alterTable("pets", (table) => {
      table.dropColumn("photo_url");
    });
  }
}
