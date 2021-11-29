-- CreateTable
CREATE TABLE "Employee" (
    "empId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "salary" BIGINT NOT NULL DEFAULT 100000,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("empId")
);
