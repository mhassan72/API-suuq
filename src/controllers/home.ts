import { Request, Response } from 'express';

async function home (req: Request, res: Response)  {
    res.json({ 
      "msg":"Macmiil ku soo dhawow API-ga Suuq.io",
      "timeStamp": new Date().getTime(),
    });
    
};

export default home;
