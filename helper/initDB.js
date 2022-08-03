import mongoose from 'mongoose';

const connectMongo = () => {
    if(mongoose.connection.readyState === 1 ){
        return ;
    } else {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    
        mongoose.connection.on('connected',()=>{
            console.log('connected to db')
        })
        mongoose.connection.on('error',()=>{
            console.log('Error while connecting to db')
        })
    }
};

export default connectMongo;
