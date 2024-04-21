-- CreateTable
CREATE TABLE "LunchDays" (
    "preset" TEXT NOT NULL PRIMARY KEY,
    "monday" BOOLEAN NOT NULL,
    "tuesday" BOOLEAN NOT NULL,
    "wednesday" BOOLEAN NOT NULL,
    "thursday" BOOLEAN NOT NULL,
    "friday" BOOLEAN NOT NULL,
    "saturday" BOOLEAN NOT NULL,
    "sunday" BOOLEAN NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MealPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "mealId" INTEGER,
    "lunchId" INTEGER,
    CONSTRAINT "MealPlan_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MealPlan_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES "Meal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MealPlan" ("date", "day", "id", "lunchId", "mealId") SELECT "date", "day", "id", "lunchId", "mealId" FROM "MealPlan";
DROP TABLE "MealPlan";
ALTER TABLE "new_MealPlan" RENAME TO "MealPlan";
CREATE UNIQUE INDEX "MealPlan_date_key" ON "MealPlan"("date");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
