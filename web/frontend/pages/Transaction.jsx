import { LegacyCard, Page, Layout, SkeletonBodyText } from "@shopify/polaris";
import { TitleBar, useNavigate, Loading } from "@shopify/app-bridge-react";
import { TransactionList } from "../components";
import { useAppQuery } from "../hooks";

export default function Transaction() {
  const Navigate = useNavigate();
  const {data:transaction, isLoading, isRefetching} = useAppQuery(
      {url:`/api/v1/transaction`}
  )

  const loadingMarkup = isLoading ? (
      <LegacyCard>
        <Loading />
        <SkeletonBodyText/>
      </LegacyCard>
  ):null;

  const dataMarkup = transaction?.data ? (
      <TransactionList transaction={transaction} loading={isRefetching} />
  ) : null;

  return (
    <Page 
      narrowWidth 
      primaryAction={{
        content:"Add new transaction",
        onAction: () => Navigate("/transaction/add")
      }}
      title="Transaction list"
    >
      <TitleBar title="Simple finance app"/>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned >
            {loadingMarkup}
            {dataMarkup}
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
