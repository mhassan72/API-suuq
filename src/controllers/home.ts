import { Request, Response } from 'express';
import WebToken from '../services/WebToken';

async function home (req: Request, res: Response)  {
  try {
    const wt = new WebToken();
    const payload = { msg: "Welcome to the Home page! from payload" };
    // encode the token
    const token = await wt.encode(payload, '74h'); // Token expires in 74 hour
    const decoded = await wt.decode(token);
    res.json({ 
      "msg":payload.msg,
      "token": token,
      "decoded": decoded,
      "timeStamp": new Date().getTime(),
    });
  }catch(error){
    res.json(error)
  }
    
};

export default home;
