/*
  Warnings:

  - Added the required column `fun_data_criacao` to the `funcionarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "funcionarios" ADD COLUMN     "fun_data_criacao" VARCHAR(255) NOT NULL;
