import shopify from "../shopify.js";

const readProducts = async (req, res) => {
    try {
        const products = await shopify.api.rest.Product.all({
            session:res.locals.shopify.session
        });
        res.json({products:products});
    } catch (error) {
        res.json(error);
    }
}

export {readProducts}