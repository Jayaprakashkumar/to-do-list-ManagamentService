import express from "express";
import { ListRoutes } from "./api/routes/list";
import { ItemRoutes } from "./api/routes/item";

const bodyParser = require('body-parser');

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.init().then(() => { return; });
    }
    private async init(): Promise<void> {
        console.log("routes")
        this.app.use(bodyParser.json())
        new ListRoutes().routes(this.app)
        new ItemRoutes().routes(this.app)
    }
}

export default new App().app;
