import {
  LegacyCard,
  Page,
  Layout,
  LegacyStack
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

export default function HomePage() {
  const Navigate = useNavigate();

  return (
    <Page 
      narrowWidth 
      primaryAction={{
        content:"Add new transaction",
        onAction: () => Navigate("/transaction/add")
      }}
      title="Financial report"
    >
      <TitleBar title="Simple finance app" />
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <LegacyStack>
              <LegacyStack.Item fill>
                <p>Your Revenue</p>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <p>Rp 0 </p>
              </LegacyStack.Item>
            </LegacyStack>
            
            <LegacyStack>
              <LegacyStack.Item fill>
                <p>Your Side Income</p>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <p>Rp 0 </p>
              </LegacyStack.Item>
            </LegacyStack>
            
            <LegacyStack>
              <LegacyStack.Item fill>
                <p>Your Expense</p>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <p>Rp 0 </p>
              </LegacyStack.Item>
            </LegacyStack>
            <hr></hr>
            <LegacyStack>
              <LegacyStack.Item fill>
                <p><b>Your Profit</b></p>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <p><b>Rp 0 </b></p>
              </LegacyStack.Item>
            </LegacyStack>
            <br></br>            
          </LegacyCard>
        </Layout.Section>
        
      </Layout>
    </Page>
  );
}
