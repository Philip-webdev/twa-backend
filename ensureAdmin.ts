import { Request, Response, NextFunction } from "express-serve-static-core";
import  "typescript";   
interface AuthRequest extends Request {
    session: { user?: { id: number; role: string } };
}

export const ensureAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.session.user || req.session.user.role !== "user") {
        return res.status(403).json({ message: "Access denied. registered users only." });
    }
    next();
};
