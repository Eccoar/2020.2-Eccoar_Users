import ControllerUser from '../src/controllers/ControllerUser';
import { Request, Response } from 'express';


const mockResponse = () => {
    let res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  

describe("pong", () => {

    test("should return ping-pong for pong()", async () => {
        const controller = new ControllerUser();
        let mReq = {} as Request;
        const mResp = mockResponse();
        await controller.pong(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(200);
        expect(mResp.json).toHaveBeenCalledWith({ping: "pong"});
    });

});