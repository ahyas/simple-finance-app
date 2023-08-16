import { IndexTable, Link } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

export function ExpenseSubCategoryList({sub_category, loading}){
    const navigate = useNavigate();
    const rowMarkup = sub_category.map(({_id, name},index) => {
        return(
            <IndexTable.Row 
                id={_id} 
                key={_id} 
                position={index}
            >
                <IndexTable.Cell>
                    <Link
                        removeUnderline
                        url={`/sub_category/expense/${_id}/edit`}
                    >
                        {name}
                    </Link>
                </IndexTable.Cell>
            </IndexTable.Row>
        )
    }
    );

    return(
        <>
            <IndexTable
                itemCount={sub_category.length}
                headings={[
                    {title: 'Title'},
                ]}
                selectable={false}
                loading={loading}
            >
                {rowMarkup}
            </IndexTable>
        </>
    )
}