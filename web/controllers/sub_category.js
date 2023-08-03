import mongoose from "mongoose";

const Schema = mongoose.Schema;

const table = mongoose.model("sub_categories", Schema({
    name:String
}));

const sub_category_show = async (req, res) => {
    try {
        let {category} = req.params;
        const data = await table.find({id_category:category});
        res.json({msg:"Succeed", data:data});
    } catch (error) {
        res.json({msg:error});
    }
}

export {sub_category_show}