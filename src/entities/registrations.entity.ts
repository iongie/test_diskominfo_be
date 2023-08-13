import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Registrations {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    alamat: string
}