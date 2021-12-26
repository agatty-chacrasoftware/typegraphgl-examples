/*
  Warnings:

  - Added the required column `profilePictureUrl` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "profilePictureUrl" TEXT NOT NULL;
