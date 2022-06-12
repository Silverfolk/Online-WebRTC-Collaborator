const userModel=require('../Models/user');
module.exports.Signup=async function Signup(req,res,next){
    try{
        let userData=req.body;
        let user=await userModel.create(userData);
        console.log(user);
    
        // users=req.body;
        if(user){
            res.json({//res.send karne se bhi send hoga par res.json karne se json format mai send hoga
                message:"data is recieved Succesfully",
                user:userData
            //  respose ye wala postman pe show karega post karne pe ye aayega
            });
        }
        else{
            res.json({
                message:"error while signup"
            });
        }
      
    }
    catch(err){
        res.json({
            message:err
        });
    }
    };