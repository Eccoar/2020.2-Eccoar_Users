import {getRepository} from "typeorm";
import { User } from "../entity/User";

export class UserRepository {

    findByName(name: string, surname: string) {
        const repository = getRepository(User);
        return repository.findOne({ name, surname });
    }

}