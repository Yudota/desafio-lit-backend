import { PrismaClient } from '@prisma/client'

export default class ConnectionFactory {
    static make() {
        return new PrismaClient()
    }
}