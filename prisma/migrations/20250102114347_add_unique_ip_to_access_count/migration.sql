/*
  Warnings:

  - A unique constraint covering the columns `[ip]` on the table `AccessCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccessCount_ip_key" ON "AccessCount"("ip");
