
const express=require('express');const jwt=require('jsonwebtoken');
const app=express();app.use(express.json());
const SECRET='supersecret';
app.post('/api/login',(req,res)=>{
 if(req.body.user==='admin'&&req.body.pass==='1234')
  res.json({token:jwt.sign({u:'admin'},SECRET)});
 else res.sendStatus(401);
});
app.post('/api/content',(req,res)=>res.json({ok:true,data:req.body}));
app.listen(3000);
