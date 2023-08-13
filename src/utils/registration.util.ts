import { ValidationChain, body } from 'express-validator';

export const registrationUtil: ValidationChain[] = [
    body('name')
        .not()
        .isEmpty().withMessage('Nama tidak boleh kosong!'),
    body('email')
        .not()
        .isEmpty().withMessage('Email tidak boleh kosong!')
        .bail()
        .isEmail().withMessage('Format Email tidak valid!'),
    body('alamat')
        .not()
        .isEmpty().withMessage('Alamat tidak boleh kosong!'),
]
