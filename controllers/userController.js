const userModel = require("../models/userModel");

//GET user info
const getUserController = async (req, res) =>{
    try {
        //find user
            const user = await userModel.findById({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User not found"
            });
        }
        res.status(200).send({
            success : true,
            message :"User details",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Error in GET user",error,
        })
    }
}
//Update user info
const updateUserController = async (req,res)=>{
    try {
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message:"User not found" 
            })
        }
         //UPDATE
         const {userName, address, phone} = req.body
        if(userName) user.userName = userName
        if(address)  user.address  = address
        if(phone) user.phone = phone
        //save user
        await user.save()
        res.status(200).send({
            success: true,
            message : "User details updated",user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : "Error updating user details"
        })
    }

}

module.exports = {getUserController,updateUserController};