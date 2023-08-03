import mongoose from "mongoose";

const Schema = mongoose.Schema;
const table = mongoose.model("transactions", Schema({
    id_category:Number,
    id_sub_category:String,
    date:String,
    amount:Number,
    information:String
}));

const transaction_show = async (req, res) => {
    try {
        const data = await table.find({});
        res.json({category:data});        
    } catch (error) {
        res.json(error); 
    } 
}

const transaction_save = async (req, res) => {
    try {
        await table.create(req.body);
        const data = req.body;
        res.json({msg:"Succeed", data:data})
    } catch (error) {
        res.json({msg:error})
    }
}

export {transaction_show, transaction_save}