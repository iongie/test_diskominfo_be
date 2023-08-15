import { Router, Response, Request } from "express";
import { Count, Create, EmailExist, Read, Searching } from "../controllers/registrations.controller";
import { Registrations } from "../entities/registrations.entity";
import { registrationUtil } from "../utils/registration.util";
import { validatorUtil } from "../utils/validator.util";
import { SendMail } from "../controllers/mail.controller";
import { optionsMail } from "../app.data";
import { checkEmailExisting } from "../utils/mail.util";
export default class RegistrationsRoute {
    constructor(app: Router) {
        this.create(app);
        this.read(app);
        this.checkEmail(app);
        this.countData(app);
        this.search(app)
    }

    create(app: Router) {
        app.post('/create-registration', registrationUtil, validatorUtil, checkEmailExisting, (req: Request, res: Response) => {
            const formRegistration = req.body;
            Create(formRegistration, (err: Error) => {
                if (err) {
                    return res.status(500).json({ "message": "Created data unsuccessfully" });
                }
                SendMail(optionsMail(req.body.email), (err: Error) => {
                    if (err) {
                        return res.status(500).json({ "message": "Send Email Failed" });
                    }
                })
                res.status(200).json({ "message": "Created data successfully" });
            })
        })
    }

    read(app: Router) {
        app.get('/read-registration', (req: Request, res: Response) => {
            const param = {
                offset: req.query.offset,
                limit: req.query.limit
            }
            Read(param, (err: Error, registrations: any) => {
                if (err) {
                    return res.status(500).json({ "message": err });
                }

                res.status(200).json({ "data": registrations });
            })
        })
    }

    checkEmail(app: Router) {
        app.post('/checkemail', (req: Request, res: Response) => {
            EmailExist(req.body.email, (err: Error, registrations: any) => {
                if (err) {
                    return res.status(500).json({ "message": err });
                }

                res.status(200).json({ "data": registrations });
            })
        })
    }

    countData(app: Router) {
        app.get('/total-registration', (req: Request, res: Response) => {
            const param = {
                offset: req.query.offset,
                limit: req.query.limit
            }
            Count(param, (err: Error, registrations: any) => {
                if (err) {
                    return res.status(500).json({ "message": err });
                }
                
                res.status(200).json({ "data": registrations.length });
            })
        })
    }

    search(app: Router) {
        app.get('/search-registration', (req: Request, res: Response) => {
            const like= req.query.like
            Searching(like?.toString(), (err: Error, registrations: any) => {
                if (err) {
                    return res.status(500).json({ "message": err });
                }

                res.status(200).json({ "data": registrations });
            })
        })
    }
}