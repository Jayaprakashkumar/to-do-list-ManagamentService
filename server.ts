require('dotenv').config();
import app from "./app";
const mongoose = require('mongoose');
const Pool = require('pg').Pool;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    if (process.env.DB === "mongo") {
        mongoose.connect(process.env.MONGOCONFIG, { useNewUrlParser: true },
            function (err) {
                if (err) {
                    console.log('Some problem with the connection ' + err);
                } else {
                    console.log('The Mongoose connection is ready');
                }
            });
    } else if (process.env.DB === "pg") {

        const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

        const pool = new Pool({
            connectionString: devConfig
        })

        if (pool) {
            console.log("Postgress : Database connected successfully but not implemented in the code")
        }

        module.exports = pool

    }
    console.log("I am listenint :", PORT)
})