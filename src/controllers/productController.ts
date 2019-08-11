import { Request, Response, NextFunction } from 'express';

export class ProductController {
    static getProducts(req: Request, res: Response, next: NextFunction) {
        res.json ({id : '1', name : 'Tulsi Drops'});
    }
}