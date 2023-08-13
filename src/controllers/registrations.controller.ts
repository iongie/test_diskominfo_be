import { dataSource } from "../app.data"
import { Registrations } from "../entities/registrations.entity"


let registrationRepo =  dataSource.getRepository(Registrations)

export const Create = (registrations: Registrations, callback: Function) => {
    registrationRepo.save(registrations).then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err, null)
    })
}

export const Read = (callback: Function) => {
    registrationRepo.find().then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err, null)
    })
}

export const EmailExist = (email: string, callback: Function) => {
    registrationRepo.findOne({ where: { email } }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err, null)
    })
}