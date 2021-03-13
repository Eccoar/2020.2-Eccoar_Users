import {getRepository} from "typeorm";
import { Localization } from "../entity/Localization";

export class LocalizationRepository {

    save(localization: Localization) {
        const repository = getRepository(Localization);
        repository.save(localization);
    }

}
