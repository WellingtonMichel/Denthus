-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpfCnpj" TEXT,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT NOT NULL DEFAULT 'ptBR',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cadistaId" TEXT,
    "labId" TEXT
);

-- CreateTable
CREATE TABLE "Cadista" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bankDetails" JSONB,
    "address" TEXT,
    "rating" REAL DEFAULT 0,
    CONSTRAINT "Cadista_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "paymentMethods" JSONB,
    "labType" TEXT NOT NULL,
    CONSTRAINT "Lab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Credit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    CONSTRAINT "Credit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Lab" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "briefing" TEXT NOT NULL,
    "originalFile" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "deliveryDate" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "labId" TEXT NOT NULL,
    "cadistaId" TEXT,
    "creditId" TEXT,
    CONSTRAINT "Job_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Job_cadistaId_fkey" FOREIGN KEY ("cadistaId") REFERENCES "Cadista" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Job_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobId" TEXT,
    "cadistaId" TEXT,
    "userId" TEXT,
    "labId" TEXT,
    CONSTRAINT "Transaction_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_cadistaId_fkey" FOREIGN KEY ("cadistaId") REFERENCES "Cadista" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "JobSkill" (
    "jobId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    PRIMARY KEY ("jobId", "skillId"),
    CONSTRAINT "JobSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "JobSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CadistaSkill" (
    "cadistaId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    PRIMARY KEY ("cadistaId", "skillId"),
    CONSTRAINT "CadistaSkill_cadistaId_fkey" FOREIGN KEY ("cadistaId") REFERENCES "Cadista" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CadistaSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpfCnpj_key" ON "User"("cpfCnpj");

-- CreateIndex
CREATE INDEX "User_type_idx" ON "User"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Cadista_userId_key" ON "Cadista"("userId");

-- CreateIndex
CREATE INDEX "Cadista_rating_idx" ON "Cadista"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_userId_key" ON "Lab"("userId");

-- CreateIndex
CREATE INDEX "Lab_labType_idx" ON "Lab"("labType");

-- CreateIndex
CREATE INDEX "Credit_type_idx" ON "Credit"("type");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");
