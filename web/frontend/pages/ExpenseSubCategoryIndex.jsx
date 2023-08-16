import { Loading, useNavigate } from "@shopify/app-bridge-react";
import { LegacyCard, Page, Layout, SkeletonBodyText, DatePicker } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useAppQuery } from "../hooks";
import { ExpenseSubCategoryList, AppName } from "../components";

export function ExpenseSubCategoryIndex(){
    const {category} = useParams();
    const navigate = useNavigate();
    const {data:sub_category, isLoading, isRefetching} = useAppQuery({
        url:`/api/v1/sub_category/${category}/show`
    });
    
    const loadingMarkup = isLoading ? (
        <LegacyCard sectioned>
            <Loading />
            <SkeletonBodyText/>
        </LegacyCard>
    ) : null;
    
    const rowMarkup = sub_category?.data ? (
        <ExpenseSubCategoryList sub_category={sub_category.data} loading={isRefetching} />
    ) 
    : null;
    return(
        <>
            <Page 
                narrowWidth 
                primaryAction={{
                    content:"Add new",
                    onAction: () => navigate(`/sub_category/expense/${category}/add`)
                }}
                backAction={
                    {
                        onAction:()=>navigate(`/transaction/add`)
                    }
                }
                title="Expense category"
            >
            <AppName/>
            <Layout>
                <Layout.Section>
                    <LegacyCard sectioned >
                        {loadingMarkup}
                        {rowMarkup}
                    </LegacyCard>
                </Layout.Section>
            </Layout>
            </Page>
        </>
    )
}