
import {prisma} from '../config/db.js'
import bcrypt from 'bcryptjs';
import {genarateToken} from '../utils/genarateToken.js'

const register = async (req,res)=>{

  const body = req.body;
  const {name,email,password}=req.body;


  //user exist?
  const userExist = await prisma.user.findUnique({
    where:{email:email},
  });
  if (userExist){
    return res.status(400).json({error:"user already exist "})
  }



  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedpassword = await bcrypt.hash(password, salt);



  const user = await prisma.user.create({
    data:{
        name,
        email,
       password: hashedpassword
    }
  });


  const token = genarateToken(user.id,res);


  res.status(201).json({
    status:"success",
    data:{
        user:{
            id:user.id,
            name:name,
            email:email,
        },
        token,
    }
    

  })
};



const login = async (req,res)=>{
const {email,password} = req.body;


 const user = await prisma.user.findUnique({
    where:{email:email},
  });





  if(!user){
    return res
    .status(400)
    .json({error:"invalid email or password"});

  }

  const ispasswordValid = await bcrypt.compare(password, user.password);
  if(!ispasswordValid){
    return res
    .status(400)
    .json({error:"invalid email or password"});

  }

const token = genarateToken(user.id,res)

    res.status(201).json({
    status:"success",
    data:{
        userE:{
            id:user.id,
            email:email,
        },
        token,
    }

  })

}

const logout = async(req,res)=>{
  res.cookie("jwt","",{
    httpOnly:true,
    expires: new Date(0)
  })
res.status(200).json({
  staus:"success",
  message:"logout successfully",
})



}






export {register,login,logout}
