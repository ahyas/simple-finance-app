import { TitleBar, useNavigate, Loading } from "@shopify/app-bridge-react";
import { Page, Layout, LegacyCard, SkeletonBodyText } from "@shopify/polaris";
import { IncomeSubCategoryList } from "../components";
import { useAppQuery } from "../hooks";
import { useParams } from "react-router-dom";

export function IncomeSubCategoryIndex(){
    const navigate = useNavigate();
    const {category} = useParams();
    
    const {data:sub_category, isLoading, isRefetching} = useAppQuery({
        url:`/api/v1/sub_category/${category}/show`
    });

    const loadingMarkup = isLoading ? (
        <LegacyCard>
            <Loading/>
            <SkeletonBodyText/>
        </LegacyCard>
    ) : null;

    const rowMarkup = sub_category?.data ? (
        <IncomeSubCategoryList sub_category={sub_category.data} loading={isRefetching} />
    ) : null;
    
    return(
        <>
            <Page
                narrowWidth
                primaryAction={{
                    content:"Add new",
                    onAction:()=>navigate("")
                }}
                backAction={
                    {
                        onAction:()=>history.go(-1)
                    }
                }
                title="Income category"
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