import { DataSource } from "typeorm";
import 'dotenv/config';
import "reflect-metadata";
import { Registrations } from "./entities/registrations.entity";

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Gigih985042@",
    database: "db_test_praktik",
    synchronize: true,
    logging: false,
    entities: [Registrations],
    subscribers: [],
    migrations: [],
})

export function optionsMail(toMail: string) {
    return {
        from: "Registration App <gigihsantoso0524@gmail.com>", // sender address
        to: toMail, // receiver email
        subject: "Notification Registratiom", // Subject line
        text: "Success Registered"
    }
}