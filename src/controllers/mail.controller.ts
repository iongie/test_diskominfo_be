import { emailSetting } from "../utils/mail.util"

export const SendMail = (mailDetail: any, callback: Function) => {
    emailSetting.sendMail(mailDetail).then(res => {
        callback(null, res)
    }).catch(err => {
        callback(err, null)
    })
}