import {
  LegacyCard,
  Page,
  Layout,
  SkeletonBodyText
} from "@shopify/polaris";
import { useNavigate, Loading } from "@shopify/app-bridge-react";
import { FinancialReport, AppName } from "../components";
import { useAppQuery } from "../hooks";

export default function HomePage() {
  const Navigate = useNavigate();
  const {data:transaction, isLoading} = useAppQuery({
    url:`/api/v1/transaction`
  });

  const loadingMarkup = isLoading ? (
    <LegacyCard sectioned>
      <Loading />
      <SkeletonBodyText/>
    </LegacyCard>
  ):null;

  const dataMarkup = (transaction?.total_income && transaction?.total_expense) ? (
    <FinancialReport total_income={transaction.total_income} total_expense={transaction.total_expense} />
  ) : null;

  return (
    <Page 
      narrowWidth 
      primaryAction={{
        content:"Add new transaction",
        onAction: () => Navigate("/transaction/add")
      }}
      title="Financial report"
    >
      <AppName/>
      <Layout>
        <Layout.Section>
         
          {loadingMarkup}
          {dataMarkup}
         
        </Layout.Section>
      </Layout>
    </Page>
  );
}
