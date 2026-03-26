import express from "express"
  
const router = express.Router();

router.get ("/hello", (req,res)=>{
    res.json({httpmethod:"get"})
})


router.get ("/", (req,res)=>{
    res.json({httpmethod:"get"})
})

router.delete ("/", (req,res)=>{
    res.json({httpmethod:"delete"})
})

router.post("/", (req,res)=>{
    res.json({httpmethod:"post"})
})

router.put("/", (req,res)=>{
    res.json({httpmethod:"put"})
})


export default router
