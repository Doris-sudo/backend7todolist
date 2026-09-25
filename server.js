import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3400;

app.listen(PORT, ()=>{
    console.log(`This server is running on port ${PORT}`);
    
})