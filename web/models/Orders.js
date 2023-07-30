import shopify from "../shopify.js";

const readOrder = async (req, res) => {
    try {
        const order = await shopify.api.rest.Order.all({
            session: res.locals.shopify.session
        });
        console.log(order);
        res.json({data:order})
    } catch (error) {
        console.log(error);
    }
}

export {readOrder}
