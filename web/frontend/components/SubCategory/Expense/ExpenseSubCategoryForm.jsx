import {TextField, Form, Button, FormLayout} from "@shopify/polaris";
import { useState } from "react";
import {useAuthenticatedFetch, useNavigate,} from "@shopify/app-bridge-react";

export function ExpenseSubCategoryForm({category_title, id}){
    const fetch = useAuthenticatedFetch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name:category_title
    });

    const handleChange = (curr) => {
        setForm((prev)=>{
            return {...prev, ...curr}
        });
    }

    const handleSubmit = async () => {
    
        await fetch(`/api/v1/sub_category/${id}/update`, {method:"PATCH", body:JSON.stringify(form), headers:{"Content-Type":"application/json"}}).then((response)=>{
            return response.json();
        }).then((data)=>{
            return navigate(`/sub_category/expense/1/list`)
        })
    }

    return(
        <Form onSubmit={()=>handleSubmit()}>
            <FormLayout>
                <TextField 
                    label="Title"
                    value={form.name}
                    onChange={(e)=>handleChange({name:e})}
                />
                <Button primary fullWidth submit>Update</Button>
            </FormLayout>
        </Form>
    )
}