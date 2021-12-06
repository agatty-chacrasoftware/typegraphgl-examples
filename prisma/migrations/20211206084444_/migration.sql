/*
  Warnings:

  - The values [Senior_Manager] on the enum `Designation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Designation_new" AS ENUM ('Junior', 'Manager', 'SeniorManager', 'Partner');
ALTER TABLE "Employee" ALTER COLUMN "designation" DROP DEFAULT;
ALTER TABLE "Employee" ALTER COLUMN "designation" TYPE "Designation_new" USING ("designation"::text::"Designation_new");
ALTER TYPE "Designation" RENAME TO "Designation_old";
ALTER TYPE "Designation_new" RENAME TO "Designation";
DROP TYPE "Designation_old";
ALTER TABLE "Employee" ALTER COLUMN "designation" SET DEFAULT 'Junior';
COMMIT;
