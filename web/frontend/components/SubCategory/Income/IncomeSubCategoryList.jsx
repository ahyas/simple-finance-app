import { IndexTable, Link } from "@shopify/polaris"

export function IncomeSubCategoryList({sub_category, loading}){

    const rowMarkup = sub_category.map(({_id, name}, index)=>{
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
                            {name}
                        </Link>
                    </IndexTable.Cell>
                </IndexTable.Row>
            )
        }
    );

    return(
        <IndexTable
            itemCount={sub_category.length}
            headings={[{title:"Title"}]}
            selectable={false}
            loading={loading}
        >
            {rowMarkup}
        </IndexTable>
    )
}