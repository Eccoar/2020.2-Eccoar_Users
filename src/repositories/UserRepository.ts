import { getRepository } from 'typeorm';
import { User } from '@entity/User';

export class UserRepository {
	findByName(name: string, surname: string): Promise<User> {
		const repository = getRepository(User);
		return repository.findOne({ name, surname });
	}

	yourName(name: string, surname: string): Promise<User> {
		const repository = getRepository(User);
		return repository.findOne({ name, surname });
	}
}
