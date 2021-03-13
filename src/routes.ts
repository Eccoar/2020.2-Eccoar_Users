import { Router, Request, Response } from 'express';

import ControllerUser from './controllers/ControllerUser';

const routers = Router();
const controller = new ControllerUser();

routers.get("/ping", (req: Request, resp: Response) => {
    controller.pong(req, resp);
});

routers.get("/user", (req: Request, resp: Response) => {
    controller.findUserByName(req, resp);
})

export default routers;