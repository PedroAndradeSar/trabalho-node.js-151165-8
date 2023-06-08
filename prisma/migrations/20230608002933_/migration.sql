/*
  Warnings:

  - You are about to drop the column `idUser` on the `Receitas` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `Receitas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Receitas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tempPreparo" TEXT NOT NULL,
    CONSTRAINT "Receitas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Receitas" ("descricao", "id", "nome", "tempPreparo") SELECT "descricao", "id", "nome", "tempPreparo" FROM "Receitas";
DROP TABLE "Receitas";
ALTER TABLE "new_Receitas" RENAME TO "Receitas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
