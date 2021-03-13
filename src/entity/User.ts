import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToMany,
    JoinTable 
} from "typeorm";
import { IsEmail } from 'class-validator';
import { Localization } from "./Localization";


@Entity("tb_users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: false})
    name: string;

    @Column({length: 255, nullable: false})
    surname: string;

    @Column({type: "date"})
    birth: string;

    @Column({length: 11, nullable: false, unique: true})
    cpf: string;

    @Column({nullable: false, unique: true})
    @IsEmail()
    email: string;

    @ManyToMany(() => Localization, localizations => localizations.users)
    @JoinTable()
    localizations: Localization[];
}
