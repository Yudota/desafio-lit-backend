-- CreateTable
CREATE TABLE "cargos" (
    "car_id" SERIAL NOT NULL,
    "car_nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "cargos_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "funcionarios" (
    "fun_id" SERIAL NOT NULL,
    "fun_nome" VARCHAR(255) NOT NULL,
    "fun_cpf" VARCHAR(255) NOT NULL,
    "fun_data_contratacao" VARCHAR(255) NOT NULL,
    "fun_matricula" VARCHAR(255) NOT NULL,
    "fun_email" VARCHAR(255) NOT NULL,
    "fun_car_id" INTEGER NOT NULL,
    "fun_isActive" BOOLEAN NOT NULL,
    "fun_senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("fun_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_fun_email_key" ON "funcionarios"("fun_email");

-- AddForeignKey
ALTER TABLE "funcionarios" ADD CONSTRAINT "fk_fun_car" FOREIGN KEY ("fun_car_id") REFERENCES "cargos"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;
