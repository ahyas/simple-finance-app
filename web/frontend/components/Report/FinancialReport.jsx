import { LegacyCard, LegacyStack, Text } from "@shopify/polaris";

export function FinancialReport({total_income, total_expense}){
    let profit = total_income - total_expense;
    let showProfit = profit < 0 ? (
        <Text color="critical" fontWeight="bold">Rp {profit}</Text>
    ) : (<Text color="success" fontWeight="bold">Rp {profit}</Text>);

    return(
        <LegacyCard sectioned>
            <LegacyStack>
              <LegacyStack.Item fill>
                <p>Total Earnings</p>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <p>Rp {total_income}</p>
              </LegacyStack.Item>
            </LegacyStack>
            
            <LegacyStack>
              <LegacyStack.Item fill>
                <p>Total Expenses</p>
              </LegacyStack.Item>
              <LegacyStack.Item>
                <p>Rp {total_expense}</p>
              </LegacyStack.Item>
            </LegacyStack>
            <hr></hr>
            <LegacyStack>
              <LegacyStack.Item fill>
                <p><b>Profit</b></p>
              </LegacyStack.Item>
              <LegacyStack.Item>
                {showProfit}
              </LegacyStack.Item>
            </LegacyStack>            
          </LegacyCard>
    )
}