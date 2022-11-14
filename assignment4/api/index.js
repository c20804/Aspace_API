import express from "express";
import mongoose from "mongoose";
import usersRoute from "./routes/users.js";
import propertiesRoute from "./routes/properties.js";
import reservationsRoute from "./routes/reservations.js";

const db = "mongodb://localhost:27017/aspace";
const app = express();

// connect to mongoDB
const connect = async () => {
    try {
        await mongoose.connect(db);
        console.log("Connect to MongoDB");
    }catch (error){
        throw error;
    }
};
// notify if disconnected
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!!!");
})

app.get("/", (req, res)=>{
    res.send("Hello!");
})

//middlewares
app.use(express.json());

app.use("/users", usersRoute);
app.use("/properties", propertiesRoute);
app.use("/reservations", reservationsRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8000, ()=>{
    connect();
    console.log("connect to backend");
});