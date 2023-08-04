import { Form, FormLayout, TextField, Button, Select, LegacyCard} from "@shopify/polaris";
import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import { useState } from "react";
import { useAppQuery } from "../../hooks";

export default function ExpenseForm({category}){
    const fetch = useAuthenticatedFetch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        id_category:category,
        id_sub_category:0,
        date:"",
        amount:0,
        information:""
    });

    const handleChange = (curr) => {
        return setForm((prev)=>{
        return {...prev,...curr}
        });
    }

    const handleSubmit = async () => {
        await fetch("/api/v1/transaction/expense/save", {method:"POST", body:JSON.stringify(form), headers:{"Content-type":"application/json"}}).then((response)=>{
            return response.json();            
        }).then((data)=>{
            console.log(data)
            return navigate("/transaction");
        });
        
    }

    const {data:sub_category} = useAppQuery({
        url:`/api/v1/sub_category/${category}/show`
    });
    
    const get_sub_category = sub_category?.data ? 
    [
        {label:"Choose sub category",value:""},
        ...sub_category.data.map((row)=>{
            const list = {
                label:row.name,
                value:row._id
            }
            return list;
        })
    ] : []

    return(
            <LegacyCard.Section actions={[
                {
                    content: "New expense category",
                    onAction:()=> navigate(`/sub_category/expense/${category}/list`)
                }
            ]}>
                <Form onSubmit={()=>handleSubmit()}>
                    <FormLayout>
                    <Select 
                        label="Expense category"
                        options={get_sub_category}
                        onChange={(e)=>handleChange({id_sub_category:e})}
                        value={form.id_sub_category}
                    />

                    <TextField
                        label="Date"
                        value={form.date}
                        onChange={(e)=>handleChange({date:e})}
                    />

                    <TextField
                        label="Amount"
                        type="number"
                        value={form.amount}
                        onChange={(e)=>handleChange({amount:e})}
                        autoComplete="off"
                    />

                    <TextField 
                        label="Information"
                        value={form.information}
                        onChange={(e)=>handleChange({information:e})}
                    />

                    <Button fullWidth primary submit>Save</Button>
                    </FormLayout>
                </Form>
                </LegacyCard.Section>
    )
}