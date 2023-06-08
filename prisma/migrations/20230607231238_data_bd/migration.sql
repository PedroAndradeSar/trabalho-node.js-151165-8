/*
  Warnings:

  - You are about to drop the column `description` on the `Receitas` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Receitas` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `Receitas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Receitas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Receitas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tempPreparo" TEXT NOT NULL,
    CONSTRAINT "Receitas_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Receitas" ("id", "idUser", "tempPreparo") SELECT "id", "idUser", "tempPreparo" FROM "Receitas";
DROP TABLE "Receitas";
ALTER TABLE "new_Receitas" RENAME TO "Receitas";
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("email", "id") SELECT "email", "id" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
