import mongoose from "mongoose";

const Schema = mongoose.Schema;

const table = mongoose.model("sub_categories", Schema({
    id_category:String,
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

const sub_category_save = async (req, res) => {
    try {
        await table.create(req.body);
        
        const data = req.body;
        res.json({msg:"Success", data:data})
    } catch (error) {
        res.json({msg:error})
    }
}

const sub_category_edit = async (req, res) => {
    try {
        let {sub_category} = req.params;
        const data = await table.find({_id:sub_category});
        
        res.json({data:data});
    } catch (error) {
        res.json(error);
    }
}

const sub_categoey_update = async (req, res) => {
    try {
        let {sub_category} = req.params;
        await table.findByIdAndUpdate(sub_category, req.body);
        res.json({msg:"success"});
    } catch (error) {
        res.json(error)
    }
}

export {sub_category_show, sub_category_save, sub_category_edit, sub_categoey_update}