-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categorias_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `estados_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `elementos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `categoriaId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 0,
    `estadoId` INTEGER NOT NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispositivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementoId` INTEGER NOT NULL,
    `marca` VARCHAR(191) NULL,
    `modelo` VARCHAR(191) NULL,
    `numeroSerie` VARCHAR(191) NULL,
    `nip` VARCHAR(191) NULL,
    `imei` VARCHAR(191) NULL,

    UNIQUE INDEX `dispositivos_elementoId_key`(`elementoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `componentes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementoId` INTEGER NOT NULL,
    `tipoComponente` VARCHAR(191) NULL,
    `especificaciones` VARCHAR(191) NULL,

    UNIQUE INDEX `componentes_elementoId_key`(`elementoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accesorios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementoId` INTEGER NOT NULL,
    `tipoAccesorio` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,

    UNIQUE INDEX `accesorios_elementoId_key`(`elementoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consumibles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementoId` INTEGER NOT NULL,
    `tipoConsumible` VARCHAR(191) NULL,
    `unidad` VARCHAR(191) NULL,

    UNIQUE INDEX `consumibles_elementoId_key`(`elementoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sin_asignar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementoId` INTEGER NOT NULL,
    `motivo` VARCHAR(191) NULL,
    `fechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mantenimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementoId` INTEGER NOT NULL,
    `tipoMantenimiento` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,
    `fechaIngreso` DATETIME(3) NOT NULL,
    `fechaEstimadaSalida` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `temporal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementoId` INTEGER NOT NULL,
    `asignadoA` VARCHAR(191) NULL,
    `fechaEntrega` DATETIME(3) NOT NULL,
    `fechaDevolucionEstimada` DATETIME(3) NULL,
    `usoJustificado` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `elemento_opciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `elementoId` INTEGER NOT NULL,
    `opcionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `elementos` ADD CONSTRAINT `elementos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `elementos` ADD CONSTRAINT `elementos_estadoId_fkey` FOREIGN KEY (`estadoId`) REFERENCES `estados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispositivos` ADD CONSTRAINT `dispositivos_elementoId_fkey` FOREIGN KEY (`elementoId`) REFERENCES `elementos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `componentes` ADD CONSTRAINT `componentes_elementoId_fkey` FOREIGN KEY (`elementoId`) REFERENCES `elementos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accesorios` ADD CONSTRAINT `accesorios_elementoId_fkey` FOREIGN KEY (`elementoId`) REFERENCES `elementos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consumibles` ADD CONSTRAINT `consumibles_elementoId_fkey` FOREIGN KEY (`elementoId`) REFERENCES `elementos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sin_asignar` ADD CONSTRAINT `sin_asignar_elementoId_fkey` FOREIGN KEY (`elementoId`) REFERENCES `elementos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mantenimiento` ADD CONSTRAINT `mantenimiento_elementoId_fkey` FOREIGN KEY (`elementoId`) REFERENCES `elementos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `temporal` ADD CONSTRAINT `temporal_elementoId_fkey` FOREIGN KEY (`elementoId`) REFERENCES `elementos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opciones` ADD CONSTRAINT `opciones_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `elemento_opciones` ADD CONSTRAINT `elemento_opciones_elementoId_fkey` FOREIGN KEY (`elementoId`) REFERENCES `elementos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `elemento_opciones` ADD CONSTRAINT `elemento_opciones_opcionId_fkey` FOREIGN KEY (`opcionId`) REFERENCES `opciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
