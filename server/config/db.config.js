
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()
const connectionDb=async()=>{
try {
    
 await   mongoose.connect(process.env.DATABASE_URL)
    console.log('Database is connected')
    
} catch (error) {
    console.log('Db conection Failed :'+ error.message)
}
}

export default connectionDb