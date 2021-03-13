import { Request, Response } from "express";
import { UserRepository } from './../repositories/UserRepository';

export default class ControllerUser {

    userRepository:UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async pong (req: Request, resp: Response) {
        const pingPong = {
            ping: "pong"
        }
        resp.status(200).json(pingPong);
    }

    async findUserByName (req: Request, resp: Response) {
        let user = await this.userRepository.findByName("Timber", "Saw");
        resp.json(user);
    }
}
