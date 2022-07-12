const mongoose = require("mongoose");
const  mongodbURL = `mongodb://LevelUP:${process.env.MONGO_PWD}@cluster0-shard-00-00.qb4uy.mongodb.net:27017,cluster0-shard-00-01.qb4uy.mongodb.net:27017,cluster0-shard-00-02.qb4uy.mongodb.net:27017/studentSkillDatabase?ssl=true&replicaSet=atlas-f4na1v-shard-0&authSource=admin&retryWrites=true&w=majority`
const mongoURL = `mongodb+srv://LevelUP:${process.env.MONGO_PWD}@cluster0.qb4uy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const localMongo = "mongodb://localhost:27017/StudentSkills" 
mongoose.connect(mongodbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log(`database connection succesfull`); 
}).catch((e) => {
    console.log(`no connection`,e);
})     