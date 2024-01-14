/*
  Warnings:

  - You are about to drop the `IngredientsInMeals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "IngredientsInMeals";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_IngredientToMeal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_IngredientToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_IngredientToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToMeal_AB_unique" ON "_IngredientToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToMeal_B_index" ON "_IngredientToMeal"("B");
