-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MealPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "day" TEXT NOT NULL,
    "mealId" INTEGER,
    CONSTRAINT "MealPlan_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MealPlan" ("date", "day", "id", "mealId") SELECT "date", "day", "id", "mealId" FROM "MealPlan";
DROP TABLE "MealPlan";
ALTER TABLE "new_MealPlan" RENAME TO "MealPlan";
CREATE UNIQUE INDEX "MealPlan_date_key" ON "MealPlan"("date");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
