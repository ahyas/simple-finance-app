import { Form, FormLayout, Select, TextField, Button, LegacyCard, DatePicker, Text } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useAppQuery } from "../../hooks";
import { useNavigate, useAuthenticatedFetch } from "@shopify/app-bridge-react";

export default function IncomeForm({category}){
    let today = new Date();
    let startMonth = today.getMonth();
    let startYear = today.getFullYear();
    const [{month, year}, setDate] = useState({month: startMonth, year: startYear});
    const [selectedDates, setSelectedDates] = useState({start: new Date(), end: new Date()});
    
    let date = new Date(selectedDates.start);
    let years = date.getFullYear();
    let months = date.getMonth()+1;
    let day = date.getDate();

    let newDate = years+"-"+months +"-"+day;
    
    const handleMonthChange = useCallback(
      (month, year) => setDate({month, year}),
      [],
    );
    
    const fetch = useAuthenticatedFetch();
    const navigate = useNavigate();
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

    const handleSubmit = async () => {
        let formData = {
            amount:form.amount,
            date:newDate,
            id_category:form.id_category,
            id_sub_category:form.id_sub_category,
            information:form.information

        }
        await fetch("/api/v1/transaction/expense/save", {method:"POST", body:JSON.stringify(formData), headers:{"Content-type":"application/json"}}).then((response)=>{
            return response.json();            
        }).then((data)=>{
            return navigate("/transaction");
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
                onAction:()=> navigate(`/sub_category/income/${category}/list`)
            }
        ]}>
        <Form onSubmit={()=>handleSubmit()}>
            <FormLayout>
                <Select
                    label="Income category"
                    options={getSubCategory}
                    onChange={(e)=>handleChange({id_sub_category:e})}
                    value={form.id_sub_category}
                />
                <Text>Date</Text>
                <DatePicker
                    month={month}
                    year={year}
                    onChange={setSelectedDates}
                    onMonthChange={handleMonthChange}
                    selected={selectedDates}
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