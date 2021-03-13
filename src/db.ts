import { createConnection } from "typeorm";


export async function  initializeDB(): Promise<void> {
    await createConnection();
}