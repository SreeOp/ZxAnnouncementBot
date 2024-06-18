CREATE TABLE IF NOT EXISTS `StoreItems` (
    `id` VARCHAR(255) PRIMARY KEY,
    `downloadLabel` VARCHAR(255) NOT NULL,
    `downloadLink` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);
