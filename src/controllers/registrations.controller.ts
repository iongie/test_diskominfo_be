import { Like } from "typeorm"
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

export const Read = (param:any, callback: Function) => {
    registrationRepo.find({
        order: {
            id: "DESC",
        },    
        take:param.limit,
        skip:param.offset
    }).then(data => {
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

export const Count = (param:any, callback: Function) => {
    registrationRepo.find({
    }).then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err, null)
    })
}

export const Searching = (param:any, callback: Function) => {
    registrationRepo.createQueryBuilder()
    .where(
        `CONCAT(
          name,
          email,
          alamat
          ) LIKE '%${param}%'`,
      )
    .getMany()
    .then(data => {
        callback(null, data)
    }).catch(err => {
        callback(err, null)
    })
}