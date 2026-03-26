import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient({
    log:process.env.NODE_ENV == "development" ? ["query","error","warn"] : ["error"]
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
