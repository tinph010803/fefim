-- CreateTable
CREATE TABLE "AccessCount" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT NOT NULL,

    CONSTRAINT "AccessCount_pkey" PRIMARY KEY ("id")
);
