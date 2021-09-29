import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { createItem, getItem, updateItem, deleteItem, getItemsByList } from '../../handlers/item';

const routeByList = '/list/:listId/items';

export class ItemRoutes {

    public methodPrefix = '/item'

    public routes(app: express.Application): void {

        app.route(routeByList)
            .post(async (req: Request, res: Response, next: NextFunction) => {

                const { description } = req.body;
                const { listId } = req.params;

                if (!listId) {
                    return res.status(400).send({ message: "Invalid request: check the url" });
                }
                if (description?.length > 256) {
                    return res.status(400).send({ message: "Description exceed max limit, 256" });
                }

                res.status(200).send(await createItem(req));

            })
            .get(async (req: Request, res: Response, next: NextFunction) => {

                return res.status(200)
                    .send(await getItemsByList(req))
            })

        app.route(this.methodPrefix + '/:id')
            .get(async (req: Request, res: Response, next: NextFunction) => {

                const {id } = req.params;

                if (!id) {
                    return res.status(400).send({ error: "Invalid request: check the url" });
                }

                res.status(200).send(await getItem(req));

            })
            .put(async (req: Request, res: Response, next: NextFunction) => {

                const { description, checked } = req.body;

                if (!description && checked === undefined) {
                    return res.status(400).send({ error: "Invalid request" });
                }
                res.status(200).send(await updateItem(req));
            })

            .delete(async (req: Request, res: Response, next: NextFunction) => {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).send({ error: "Invalid request: check the url" });
                }

                res.status(200).send(await deleteItem(req));
            })
    }

}