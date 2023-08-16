import { Layout, LegacyCard, Page, SkeletonBodyText, Form, TextField, Button } from "@shopify/polaris";
import { AppName, ExpenseSubCategoryForm } from "../components";

import { useParams } from "react-router-dom";
import { Loading } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";

export function ExpenseSubCategoryEdit(){
    const {sub_category} = useParams();
    
    const {data:mydata, isLoading} = useAppQuery({
        url:`/api/v1/sub_category/${sub_category}/edit`
    });

    const loadingMarkup = isLoading ? (
        <LegacyCard sectioned>
            <Loading />
            <SkeletonBodyText/>
        </LegacyCard>
    ) : null;
    
    const rowMarkup = mydata?.data ? (
        <ExpenseSubCategoryForm category_title={mydata.data[0].name} id={sub_category}/>
    ) : null
    
    return(
        <>
            <Page
                narrowWidth
                backAction={
                    {
                        onAction:()=>history.go(-1)
                    }
                }
                title="Edit category"
            >
            <AppName/>
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned>
                        {loadingMarkup}
                        {rowMarkup}
                    </LegacyCard>
                </Layout.Section>
            </Layout>
            </Page>
        </>  
    )
}