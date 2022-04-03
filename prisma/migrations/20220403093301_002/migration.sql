-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "atuacao" TEXT,
    "origem" TEXT NOT NULL
);
INSERT INTO "new_contas" ("atuacao", "email", "id", "nome", "origem", "telefone") SELECT "atuacao", "email", "id", "nome", "origem", "telefone" FROM "contas";
DROP TABLE "contas";
ALTER TABLE "new_contas" RENAME TO "contas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
