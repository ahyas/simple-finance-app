import { LegacyCard, Page, Layout, Form, FormLayout, TextField, Button, Select, DatePicker } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useCallback } from "react";
 
export function TransactionNew(){
    

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
                <p>Add new transaction here</p>
                </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    )
}