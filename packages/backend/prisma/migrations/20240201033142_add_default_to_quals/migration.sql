-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mealName" TEXT NOT NULL,
    "description" TEXT,
    "isHighCarb" BOOLEAN NOT NULL DEFAULT false,
    "isHighVeg" BOOLEAN NOT NULL DEFAULT false,
    "makesLunch" BOOLEAN NOT NULL DEFAULT false,
    "isCreamy" BOOLEAN NOT NULL DEFAULT false,
    "isAcidic" BOOLEAN NOT NULL DEFAULT false,
    "outdoorCooking" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Meal" ("description", "id", "isAcidic", "isCreamy", "isHighCarb", "isHighVeg", "makesLunch", "mealName", "outdoorCooking") SELECT "description", "id", coalesce("isAcidic", false) AS "isAcidic", coalesce("isCreamy", false) AS "isCreamy", coalesce("isHighCarb", false) AS "isHighCarb", coalesce("isHighVeg", false) AS "isHighVeg", coalesce("makesLunch", false) AS "makesLunch", "mealName", coalesce("outdoorCooking", false) AS "outdoorCooking" FROM "Meal";
DROP TABLE "Meal";
ALTER TABLE "new_Meal" RENAME TO "Meal";
CREATE UNIQUE INDEX "Meal_mealName_key" ON "Meal"("mealName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
