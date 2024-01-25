/*
  Warnings:

  - Added the required column `id` to the `MealPlan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MealPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "day" TEXT NOT NULL,
    "mealId" INTEGER NOT NULL,
    CONSTRAINT "MealPlan_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MealPlan" ("date", "day", "mealId") SELECT "date", "day", "mealId" FROM "MealPlan";
DROP TABLE "MealPlan";
ALTER TABLE "new_MealPlan" RENAME TO "MealPlan";
CREATE UNIQUE INDEX "MealPlan_date_key" ON "MealPlan"("date");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
