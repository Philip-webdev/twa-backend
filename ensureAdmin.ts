import { Request, Response, NextFunction } from "express-serve-static-core";
import  "typescript";   
import { Session } from "express-session";

interface AuthRequest extends Request {
    session: Session & { user?: { id: number; role: string } };
}

   const ensureAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.session.user || req.session.user.role !== "user") {
        return res.status(403).json({ message: "Access denied. registered users only." });
    }
    next();
};
export default ensureAdmin;