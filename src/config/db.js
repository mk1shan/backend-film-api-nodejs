import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV == "development" ? ["query", "error", "warn"] : ["error"]
});


const connectDB =async ()=>{
try{

    await prisma.$connect()
    console.log("db conected via prisma")
}
catch(error){
console.log(`databse not conect to prisma ${error}`)
process.exit(1);
}
};

const disconnectDB =async()=>{
    try{

    await prisma.$disconnect()
    console.log("db conected via prisma")
}
catch(error){
console.log(`databse not conect to prisma ${error}`)
process.exit(1);
}
};


export {prisma,connectDB,disconnectDB};
