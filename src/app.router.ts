import { Router } from "express";
import RegistrationsRoute from "./routes/registrations.route";

export default class AppRouter {
    constructor(app: Router){
        new RegistrationsRoute(app);
    }
}