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
        from: "TESTING <gigihsantoso0524@gmail.com>", // sender address
        to: toMail, // receiver email
        subject: "Send email in Node.JS with Nodemailer using Gmail account", // Subject line
        text: "Success Registered"
    }
}