import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { IsLatitude, IsLongitude } from 'class-validator';
import { User } from "./User";


@Entity("tb_localization")
export class Localization {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    @IsLatitude()
    latitude: number;

    @Column({nullable: false})
    @IsLongitude()
    longitude: number;

    @Column({length: 255, unique: true, nullable: false})
    address: string;

    @Column({length: 8, unique: true})
    cep:string;

    @ManyToMany(() => User, users => users.localizations)
    users: User[];
}
