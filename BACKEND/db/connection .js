const mongoose=require('mongoose')
mongoose.connect(process.env.mongoDb_url).then(()=>{
    console.log('connection established to db')
})
.catch(()=>{
    console.log("connection not established")
});