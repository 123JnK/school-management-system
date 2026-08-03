-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Teacher_isDeleted_idx" ON "Teacher"("isDeleted");

-- CreateIndex
CREATE INDEX "Teacher_schoolId_isDeleted_idx" ON "Teacher"("schoolId", "isDeleted");
