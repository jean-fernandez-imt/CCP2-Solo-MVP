-- CreateTable
CREATE TABLE "Project" (
    "Id" TEXT NOT NULL,
    "Name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Item" (
    "Id" TEXT NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Manufacturer" VARCHAR(255),
    "Provider" VARCHAR(255),
    "Price" DOUBLE PRECISION NOT NULL,
    "ProjectId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Project"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
