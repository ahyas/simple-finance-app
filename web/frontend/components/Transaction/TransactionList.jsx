import { IndexTable, Link, Text } from "@shopify/polaris";
export function TransactionList({transaction, loading}){
    const filter = (information, amount) => {
      if(information==="Expense"){
        return(
          <>
            <IndexTable.Cell>
              - 
            </IndexTable.Cell>
            <IndexTable.Cell>
              <Text color="critical">{amount}</Text>
            </IndexTable.Cell>
          </>
        )
      }else{
        return(
          <>
            <IndexTable.Cell>
              <Text color="success">{amount}</Text> 
            </IndexTable.Cell>
            <IndexTable.Cell>
            -
            </IndexTable.Cell>
          </>
        )
      }
    }

    const rowMarkup = transaction.data.map(({_id, category, sub_category, date, amount, information}, index)=>{
      return(
        <IndexTable.Row
            id={_id}
            key={_id}
            position={index}
        >
            <IndexTable.Cell>
                <Link
                    removeUnderline
                    url="#"
                >
                    {information}
                </Link>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {sub_category.name}
            </IndexTable.Cell>
            <IndexTable.Cell>
                {date}
            </IndexTable.Cell>
            
                {filter(category.information, amount)}
            
        </IndexTable.Row>
      )
    })
    return(
        <>
            <IndexTable
              itemCount={transaction.data.length}
              headings={[
                {title:"Title"},
                {title:"Sub Category"},
                {title:"Date"},
                {title:"Income"},
                {title:"Expense"},
              ]}
              selectable={false}
              loading={loading}
            >
              <IndexTable.Row>
                <IndexTable.Cell><b>Total</b></IndexTable.Cell>
                <IndexTable.Cell></IndexTable.Cell>
                <IndexTable.Cell></IndexTable.Cell>
                <IndexTable.Cell></IndexTable.Cell>
                <IndexTable.Cell></IndexTable.Cell>
              </IndexTable.Row>
              {rowMarkup}
            </IndexTable>
        </>
    )
}