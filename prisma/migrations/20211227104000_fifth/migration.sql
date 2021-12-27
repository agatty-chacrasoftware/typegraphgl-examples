/*
  Warnings:

  - You are about to drop the `EmployeeProfilePicture` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profilePictureUrl` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmployeeProfilePicture" DROP CONSTRAINT "EmployeeProfilePicture_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "profilePictureUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "EmployeeProfilePicture";
