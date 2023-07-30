import { LegacyCard, Page, Layout, Form, FormLayout, TextField, Button, Select, DatePicker } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {useForm, useField} from "@shopify/react-form";
import { useCallback } from "react";
 
export function TransactionNew(){
    const {
        fields:{
            category,
            sub_category,
            date,
            value, 
            information
        },
        submit
    } = useForm({
        fields: {
            category: useField({
                value:0,
                validates: (category)=>{
                    if(category === 0){
                        return "Choose category";
                    }
                }
            }),
            sub_category: useField({
                value:0,
                validates:(sub_category)=>{
                    if(sub_category === 0){
                        return "Choose sub category";
                    }
                }
            }),
            date: useField({
                value:"",
                validates:(date)=>{
                    if(date === ""){
                        return "Insert relevant date";
                    }
                }
            }),
            value: useField({
                value:0,
                validates:(value)=>{
                    if(value === 0){
                        return "Insert value";
                    }
                }
            })
        },
        onSubmit: useCallback(
            (form)=>{
                console.log(form);    
            },[])
    });

    return(
        <Page 
            backAction={
                {
                    content: 'Products', 
                    onAction:()=>history.go(-1)
                }
            } 
            title="Add new transaction" 
            narrowWidth>
            <TitleBar title="Simple finance app"/>
            <Layout>
                <Layout.Section>
                <LegacyCard sectioned>
                <Form>
                    <FormLayout>  
                        <TextField 
                            label="Category" 
                            onChange={() => {}} 
                            autoComplete="off" 
                        />
                        <TextField
                            label="Sub category"
                            onChange={() => {}}
                            autoComplete="off"
                        />
                        <TextField
                            label="Date"
                            onChange={() => {}}
                            autoComplete="off"
                        />
                        <TextField
                            type="number"
                            label="Value"
                            onChange={() => {}}
                            autoComplete="off"
                            min={0}
                        />
                        <TextField
                            label="Information"
                            onChange={() => {}}
                            autoComplete="off"
                        />
                        <Button onClick={submit} primary fullWidth>Save</Button>
                    </FormLayout>
                    </Form>
                </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    )
}