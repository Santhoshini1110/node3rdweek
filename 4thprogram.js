const express=require("express");
const app=express();
const fs=require('fs');

const users=[
    {
    "name":"Santhu",
    "id":1
    },
    {"name":"Nikki",
    "id":2}
]

app.use(function(req,res,next){
    const ts=fs.readFileSync('logfile.json','utf-8');
    var tvs=JSON.parse(ts);
    const log={
    path:req.path,
    method:req.method,
    time:req.time
    }
    tvs.push(log);
    fs.writeFileSync('./logfile.json',JSON.stringify(tvs));
    res.send(tvs);

    next();
});

app.get('/usersinfo',function(req,res){
    res.send(users);
});

app.post('/usersinfo',function(req,res){
    
const user={
        name:req.body.name,
        id:req.body.id
}
users.push(user);
res.send(users);
});

app.put('/usersinfo/:id',function(req,res){
    const tr=users.find(c=>c.id===parseInt(req.params.id));
    if(!tr)
    {
        res.status(404).send("user with given id is not found");
        return;
    }
        if(user.id==req.params.id)
        {
            user.name=req.body.name; 
        }
        return user;
    res.send(users);

});

app.delete('/usersinfo/:id',function(req,res){
    
    const tn=users.find(c=>c.id===parseInt(req.params.id));
    if(!tn)  res.status(404).send("user with given id is not found");
        
    const index=users.indexOf(id);
    users.splice(index,1);
res.send(users);
});

app.listen(3000,()=>
console.log("u r in port 3000"));