const express=require("express");
const fileUpload=require("express-fileupload")
const cors=require("cors");
const swaggerFile = require('./swaggerDoc.json')
const swaggerUi = require("swagger-ui-express");
const dotenv=require("dotenv");
const { dbConnection } = require("./models/db");
const { UserRoutes } = require("./routes/user.routes");
const { Project } = require("./routes/project.routes");
const { contactMe } = require("./routes/contactMe.route");
const { Resume } = require("./routes/resume.route");
dotenv.config()
const port=process.env.PORT || 3000
const app=express()
app.use(express.json())
//cors
app.use(cors());
app.use(fileUpload({useTempFiles : true}));
//routes
app.use("/", UserRoutes);
app.use("/",Project)
app.use("/",contactMe)
app.use("/",Resume)
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile, false, {
    docExpansion: "none"
}))
app.get("/testing-pipelines",(req,res)=>{;
    res.json({message:"Heyyy, I am testing pipelines"})
})

app.listen(port,()=>{
    console.log("App running on port "+port);
})
dbConnection()