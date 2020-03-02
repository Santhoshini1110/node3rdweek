
const express=require("express");
const exp=express();
const fs=require("fs");
exp.use(express.json());

exp.get('/usersinfo',function(req,res){
    const ts=fs.readFileSync('Users.json','utf-8');
    res.send(JSON.parse(ts));
    res.end();
});

exp.post('/usersinfo/:id',function(req,res)
{
    const ts=fs.readFileSync('Users.json','utf-8');
    var data=JSON.parse(ts);
    var id=req.params.id;
    if(!(id in data))
    {
        data[id]=
        {
            "name":req.body.name,
            "password":req.body.password,
            "profession":req.body.profession,
            "id":req.body.id
        }

    res.send(data);
    fs.writeFileSync('./Users.json',JSON.stringify(data));
    }
    else
    res.send(400).send("User with this id already exists");
});

exp.put('/usersinfo/:id',function(req,res){
    const ts=fs.readFileSync('Users.json','utf-8');
    let data=JSON.parse(ts);
    const id=req.params.id;
    if(id in data)
    {
        user=data[id];
        var name=req.body.name;
        var password=req.body.password;
        var profession=req.body.profession;
        user["name"]=name;
        user["password"]=password;
        user["profession"]=profession;
        fs.writeFileSync('./Users.json',JSON.stringify(data));
    }
    else
    {
        res.status(404).send("user with given id is not found");
        return;
    }

  });

exp.delete('/usersinfo/:id',function(req,res){
    const ts=fs.readFileSync('Users.json','utf-8');
    let data=JSON.parse(ts);
    var id=req.params.id;
    if(id in data)
    {
        delete data[id];
        fs.writeFileSync('./Users.json',JSON.stringify(data));
        res.send(data);
    }
    else
    {
        res.send("user with this id doesnot exists");
    }   
        
    }); 

exp.listen(4000,()=>{
console.log("u r in port 4000")});
