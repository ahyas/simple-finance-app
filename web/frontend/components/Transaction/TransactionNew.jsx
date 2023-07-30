import { LegacyCard, Page, Layout, Form, FormLayout, TextField, Button, Checkbox, } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
 
export function TransactionNew(){
    const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(() => {
    setEmail('');
    setNewsletter(false);
  }, []);

  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    [],
  );

  const handleEmailChange = useCallback((value) => setEmail(value), []);

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
                <Form onSubmit={handleSubmit}>
                  <FormLayout>
                    <Checkbox
                      label="Sign up for the Polaris newsletter"
                      checked={newsletter}
                      onChange={handleNewsLetterChange}
                    />

                    <TextField
                      value={email}
                      onChange={handleEmailChange}
                      label="Email"
                      type="email"
                      autoComplete="email"
                      helpText={
                        <span>
                          We’ll use this email address to inform you on future changes to
                          Polaris.
                        </span>
                      }
                    />

                    <Button submit>Submit</Button>
                  </FormLayout>
                </Form>
                </LegacyCard>
                </Layout.Section>
            </Layout>
        </Page>
    )
}