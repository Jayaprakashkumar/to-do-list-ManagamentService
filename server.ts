require('dotenv').config();
import app from "./app";
const mongoose = require('mongoose');
const mongoDBConfig = 'mongodb://localhost:27017/toDoListManagement'


const PORT = process.env.PORT || 3000;
const db = process.env.DB;

app.listen(PORT, () => {
    if( db ==="mongo"){
    mongoose.connect(mongoDBConfig,{ useNewUrlParser: true },
        function (err) {
            if (err) {
                console.log('Some problem with the connection ' + err);
            } else {
                console.log('The Mongoose connection is ready');
            }
        });
    }
    console.log("I am listenint :", PORT)
})