import { Form, FormLayout, Select, TextField, Button, LegacyCard } from "@shopify/polaris";
import { useState } from "react";
import { useAppQuery } from "../../hooks";

export default function IncomeForm({category}){
    const [form, setForm] = useState({
        id_category:category,
        id_sub_category:0,
        date:"",
        amount:0,
        information:""
    });

    const {data:sub_category} = useAppQuery({url:`/api/v1/sub_category/${category}/show`});

    const handleChange = (current) => {
        return setForm((prev)=>{
            return {...prev, ...current}
        });
    }

    const getSubCategory = sub_category?.data? [
        {label:"Choose income category", value:""},
        ...sub_category.data.map((row)=>{
            return {label:row.name, value:row._id}
        })
    ] : [];

    return(
        <LegacyCard.Section actions={[
            {
                content: "New income category",
                onAction:()=> navigate("")
            }
        ]}>
        <Form>
            <FormLayout>
                <Select
                    label="Income category"
                    options={getSubCategory}
                    onChange={(e)=>handleChange({id_sub_category:e})}
                    value={form.id_sub_category}
                />
                <TextField
                    label="Date"
                    onChange={(e)=>handleChange({date:e})}
                    value={form.date}
                />
                <TextField
                    label="Amount"
                    type="number"
                    onChange={(e)=>handleChange({amount:e})}
                    value={form.amount}
                />
                <TextField
                    label="Information"
                    onChange={(e)=>handleChange({information:e})}
                    value={form.information}
                />
                <Button fullWidth primary submit>Save</Button>
            </FormLayout>
        </Form>
        </LegacyCard.Section>
    )
}