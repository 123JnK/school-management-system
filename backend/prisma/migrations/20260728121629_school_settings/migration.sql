/*
  Warnings:

  - The `subscription` column on the `School` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `School` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('TRIAL', 'BASIC', 'STANDARD', 'PREMIUM', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "SchoolStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "pincode" TEXT,
ADD COLUMN     "principalName" TEXT,
ADD COLUMN     "state" TEXT,
DROP COLUMN "subscription",
ADD COLUMN     "subscription" "SubscriptionPlan" NOT NULL DEFAULT 'TRIAL',
DROP COLUMN "status",
ADD COLUMN     "status" "SchoolStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "SchoolSettings" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "language" TEXT NOT NULL DEFAULT 'en',
    "gradingSystem" TEXT NOT NULL DEFAULT 'PERCENTAGE',
    "attendanceMethod" TEXT NOT NULL DEFAULT 'DAILY',
    "allowOnlineFee" BOOLEAN NOT NULL DEFAULT true,
    "enableTransport" BOOLEAN NOT NULL DEFAULT false,
    "enableLibrary" BOOLEAN NOT NULL DEFAULT false,
    "enableHostel" BOOLEAN NOT NULL DEFAULT false,
    "enableAI" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolSettings_schoolId_key" ON "SchoolSettings"("schoolId");

-- AddForeignKey
ALTER TABLE "SchoolSettings" ADD CONSTRAINT "SchoolSettings_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
