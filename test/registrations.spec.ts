import request from 'supertest';
import appMain from '../src/app.main';
import { expect } from 'chai';
import "reflect-metadata";
import { optionsMail } from '../src/app.data';
import { SendMail } from '../src/controllers/mail.controller';
import { EmailExist } from '../src/controllers/registrations.controller';
import { Registrations } from '../src/entities/registrations.entity';

describe('Registration API', () => {
    it('Menampilkan data registrasi', async () => {
        const response = await request(appMain).get('/read-registration');

        expect(response.status).to.equal(200);
    });
    
    it('Input data kosong', async () => {
        let data = {
            name: '',
            email: '',
            alamat: ''
        }
        const response = await request(appMain).post('/create-registration').send(data);

        expect(response.status).to.equal(400);
    });

    it('Input data format email salah', async () => {
        let data = {
            name: 'Gigih',
            email: 'gigih985042',
            alamat: 'Jalan Pendidikan 1'
        }
        const response = await request(appMain).post('/create-registration').send(data);

        expect(response.status).to.equal(400);
    });

    it('Input data benar', async () => {
        let data = {
            name: 'Gigih',
            email: 'kaido985042@gmail.com',
            alamat: 'Jalan Pendidikan 1'
        }
        const response = await request(appMain).post('/create-registration').send(data);

        expect(response.status).to.equal(200);
    });

    it('Input data email sudah terdaftar', async () => {
        let data = {
            name: 'Gigih',
            email: 'gigih985042@gmail.com',
            alamat: 'Jalan Pendidikan 1'
        }
        const response = await request(appMain).post('/create-registration').send(data);

        expect(response.status).to.equal(400);
    });
})

describe('Send Email', ()=> {
    it("Mencoba Kirim Email", async()=>{
        await SendMail(optionsMail("gigih985042@gmail.com"), (info:any, err: Error) => {
            console.log("Email sent successfully");
            console.log("MESSAGE ID: ", info);
        })
    })

    it("Mencoba Check Email", async()=>{
        await EmailExist("gigih985042@gmail.com", (err: Error, registrations: Registrations[]) => {
            if(err){
                console.log({ "message": err });
            }
            console.log({ "data": registrations });
        })
    })
})