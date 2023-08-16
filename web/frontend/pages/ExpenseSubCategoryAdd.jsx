import { Layout, LegacyCard, Page, Form, FormLayout, TextField, Button } from "@shopify/polaris";
import { AppName } from "../components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";

export function ExpenseSubCategoryAdd(){
    let {category} = useParams();
    let fetch = useAuthenticatedFetch()

    let [form, setForm] = useState({
        id_category:category,
        name:""
    });
    const handleChange = (curr) => {
        return setForm((prev)=>{
            return {...prev, ...curr}
        });
    }
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log("Submit", form)
        await fetch(`/api/v1/sub_category/${category}/save`, {method:"POST", body:JSON.stringify(form), headers:{"Content-type":"application/json"}}).then((response)=>{
            return response.json();
        }).then((data)=>{
            return navigate(`/sub_category/expense/${category}/list`);
        });
    }

    return(
        <>
            <Page
                narrowWidth
                backAction={
                    {
                        onAction:()=>history.go(-1)
                    }
                }
                title="Add"
            >
                 <AppName/>
                <Layout>
                    <Layout.Section>
                        <LegacyCard sectioned>
                            <Form onSubmit={()=>handleSubmit()}>
                                <FormLayout>
                                    <TextField
                                        label="Title"
                                        value={form.name}
                                        onChange={(e)=>handleChange({name:e})}
                                    />
                                    <Button fullWidth primary submit>Save</Button>
                                </FormLayout>
                            </Form>
                        </LegacyCard>
                    </Layout.Section>
                </Layout>
            </Page>
        </>
    )
}