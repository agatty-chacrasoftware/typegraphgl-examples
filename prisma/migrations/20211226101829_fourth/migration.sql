/*
  Warnings:

  - You are about to drop the column `profilePictureUrl` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "profilePictureUrl";

-- CreateTable
CREATE TABLE "EmployeeProfilePicture" (
    "profileId" SERIAL NOT NULL,
    "profilePictureUrl" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "EmployeeProfilePicture_pkey" PRIMARY KEY ("profileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfilePicture_employeeId_key" ON "EmployeeProfilePicture"("employeeId");

-- AddForeignKey
ALTER TABLE "EmployeeProfilePicture" ADD CONSTRAINT "EmployeeProfilePicture_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;
