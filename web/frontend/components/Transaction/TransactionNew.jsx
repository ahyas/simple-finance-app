import { LegacyCard, Page, Tabs, } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useCallback} from "react";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";

export function TransactionNew(){
  const [category, setCategory] = useState(0);

  const handleTabChange = useCallback(
    (selectedCategory) => setCategory(selectedCategory),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-fitted-2',
      content: 'Income',
      panelID: 'all-customers-fitted-content-2',
    },
    {
      id: 'accepts-marketing-fitted-2',
      content: 'Expense',
      panelID: 'accepts-marketing-fitted-Ccontent-2',
    },
  ];

  const switchView = (category) => {
    if(category===0){
      return <IncomeForm category={category} />
    }else{
      return <ExpenseForm category={category} />
    }
  }

    return(
        <Page 
          backAction={
            { 
                onAction:()=>history.go(-1)
            }
          }
          title="Add new transaction" 
          subtitle="Choose one of transaction category below"
          narrowWidth
        >
            <TitleBar title="Simple finance app"/>
            <LegacyCard>
                <Tabs tabs={tabs} selected={category} onSelect={handleTabChange} fitted>
                    {switchView(category)}
                </Tabs>
            </LegacyCard>          
        </Page>
    )
}