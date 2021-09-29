import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { createList, getLists, getOneList, updateList, deleteList } from '../../handlers/list';

export class ListRoutes {

    public methodPrefix = '/lists'

    public routes(app: express.Application): void {

        app.route(this.methodPrefix + '/')
            .get(async (req: Request, res: Response, next: NextFunction) => {

                return res.status(200)
                    .send(await getLists())
            })
            .post(async (req: Request, res: Response, next: NextFunction) => {

                const { name } = req.body;
                if (!name) {
                    return res.status(400).send({ message: "Invalid request: Name required" });
                }
                if (name?.length > 96) {
                    return res.status(400).send({ message: "Invalid request: Name exceed max limit, 96" });
                }

                return res.status(200).send(await createList(req))

            })

        app.route(this.methodPrefix + '/:id')
            .put(async (req: Request, res: Response, next: NextFunction) => {

                const { name } = req.body

                if (!name) {
                    return res.status(400).send({ message: "Invalid request: Name required" });
                }
                if (name?.length > 96) {
                    return res.status(400).send({ message: "Invalid request: Name exceed max limit, 96" });
                };

                return res.status(200)
                    .send(await updateList(req))
            })
            .get(async (req: Request, res: Response, next: NextFunction) => {

                return res.status(200)
                    .send(await getOneList(req))
            })
            .delete(async (req: Request, res: Response, next: NextFunction) => {
                return res.status(200)
                    .send(await deleteList(req))
            })

    }

}