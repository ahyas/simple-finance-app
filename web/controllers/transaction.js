import mongoose from "mongoose";

const Schema = mongoose.Schema;
const table = mongoose.model("transactions", Schema({
    id_category:String,
    id_sub_category:mongoose.Types.ObjectId,
    date:String,
    amount:Number,
    information:String
}));

const transaction_show = async (req, res) => {
    try {
        //const data = await table.find({});
        const data = await table.aggregate([
            {
                $lookup:{
                    from:"categories",
                    localField:"id_category",
                    foreignField:"id",
                    as:"category"
                }
            },
            {
                $unwind:"$category"
            },
            { "$addFields": { "id_sub_category": { "$toObjectId": "$id_sub_category" }}},
            {
                $lookup:{
                    from:"sub_categories",
                    localField:"id_sub_category",
                    foreignField:"_id",
                    as:"sub_category"
                }
            },
            {
                $unwind:"$sub_category"
            },
            {
                $project:{"_id":1,"category.information":1,"sub_category.name":1, "date":1, "amount":1,"information":1}
            }
            
        ]);

        const total_income = await table.aggregate([
            { $match : { id_category : "0" } },
            { $group: {_id:null, sum_val:{$sum:"$amount"}}}
        ]);

        const total_expense = await table.aggregate([
            { $match : { id_category : "1" } },
            { $group: {_id:null, sum_val:{$sum:"$amount"}}}
        ]);
        
        console.log(total_expense)
        res.json({data:data, total_income:total_income[0].sum_val, total_expense:total_expense[0].sum_val});        
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