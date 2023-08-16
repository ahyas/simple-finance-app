import { LegacyCard, Page, Layout, SkeletonBodyText } from "@shopify/polaris";
import { useNavigate, Loading } from "@shopify/app-bridge-react";
import { TransactionList, AppName } from "../components";
import { useAppQuery } from "../hooks";

export default function Transaction() {
  const Navigate = useNavigate();
  const {data:transaction, isLoading, isRefetching} = useAppQuery(
      {url:`/api/v1/transaction`}
  )

  const loadingMarkup = isLoading ? (
      <LegacyCard sectioned>
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
      subtitle="All of your transaction activity"
    >
      <AppName/>
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
