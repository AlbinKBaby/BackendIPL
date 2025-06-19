const mongoose = require('mongoose')

// url used to connect connect with db atlas
const connectionString = process.env.DATABASE_URL

// connect with mongoose
mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB connected successfully");
    
}).catch((err)=>{
    console.log(err);
    
})