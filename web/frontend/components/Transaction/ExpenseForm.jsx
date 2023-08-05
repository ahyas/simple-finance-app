import { Form, FormLayout, TextField, Button, Select, LegacyCard, DatePicker} from "@shopify/polaris";
import { useAuthenticatedFetch, useNavigate } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import { useAppQuery } from "../../hooks";

export default function ExpenseForm({category}){
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

    const [form, setForm] = useState({
        id_category:category,
        id_sub_category:0,
        date:newDate,
        amount:0,
        information:""
    });

    const fetch = useAuthenticatedFetch();
    const navigate = useNavigate();

    const handleChange = (curr) => {
        return setForm((prev)=>{
            return {...prev,...curr}
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
    ] : [];

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

                    <DatePicker
                        month={month}
                        year={year}
                        onChange={setSelectedDates}
                        onMonthChange={handleMonthChange}
                        selected={selectedDates}
                    />

                    {/* <TextField 
                        label="Date"
                        value={newDate}
                        readOnly
                    /> */}

                    <TextField
                        label="Amount"
                        type="number"
                        value={form.amount}
                        onChange={(e)=>handleChange({amount:e})}
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