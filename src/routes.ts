import { Router } from 'express';

import ControllerUser from './controllers/ControllerUser';

const routers = Router();
const controller = new ControllerUser();

routers.get("/ping", (req, resp) => {
    controller.pong(req, resp);
});

routers.get("/user", (req, resp) => {
    controller.findUserByName(req, resp);
})

export default routers;