"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBearerToken = void 0;
const API_KEY = process.env.NRG_LYON_API_KEY;
const checkBearerToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (typeof header !== "undefined") {
        const bearer = header.split(' ');
        const token = bearer[1];
        if (token !== `Bearer ${API_KEY}`) {
            res.status(401).json({ error: "Unauthorized, token invalide" });
            return;
        }
        next();
    }
    else {
        res.sendStatus(403);
    }
};
exports.checkBearerToken = checkBearerToken;
