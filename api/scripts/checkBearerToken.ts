import { Response, Request } from "express";
const API_KEY = process.env.NRG_LYON_API_KEY;

export const checkBearerToken = (req: Request, res: Response, next: any) => {
  const header = req.headers.authorization;
  if(typeof header !== "undefined") {
    const bearer = header.split(' ');
    const token = bearer[1];
    if (token !== `${API_KEY}`) {
      res.status(401).json({ error: "Unauthorized, token invalide" });
      return;
    }
    next();
  }
  else {
    res.sendStatus(403);
  }
}