import { TitleBar, Loading, useNavigate } from "@shopify/app-bridge-react";
import { LegacyCard, Page, Layout, SkeletonBodyText, DatePicker } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useAppQuery } from "../hooks";
import { ExpenseSubCategoryList } from "../components";

export function ExpenseSubCategoryIndex(){
    const {category} = useParams();
    const navigate = useNavigate();
    const {data:sub_category, isLoading, isRefetching} = useAppQuery({
        url:`/api/v1/sub_category/${category}/show`
    });
    
    const loadingMarkup = isLoading ? (
        <LegacyCard>
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
                    onAction: () => navigate("")
                }}
                backAction={
                    {
                        onAction:()=>history.go(-1)
                    }
                }
                title="Expense category"
            >
            <TitleBar title="Simple finance app"/>
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