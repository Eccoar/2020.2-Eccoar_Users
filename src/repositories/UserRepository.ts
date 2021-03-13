import {getRepository} from "typeorm";
import { User } from "../entity/User";

export class UserRepository {

    findByName(firstName: string, lastName: string) {
        const repository = getRepository(User);
        return repository.findOne({ firstName, lastName });
    }

}