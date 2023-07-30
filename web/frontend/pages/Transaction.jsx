import { LegacyCard, Page, Layout } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { TransactionList } from "../components";
export default function Transaction() {
  const Navigate = useNavigate();
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
            <TransactionList/>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
