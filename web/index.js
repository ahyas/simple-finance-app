// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

//Import Controller
import { transaction_show, transaction_save } from "./controllers/transaction.js";
import { sub_category_show, sub_category_save, sub_category_edit, sub_categoey_update } from "./controllers/sub_category.js";

//import {readOrder} from "./models/Orders.js";
import {readProducts} from "./models/Products.js";

//import database connection string
import connectDB from "./connect_db.js";
import "dotenv/config.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  
  console.log("Total product: ",countData);
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

//===========WORKING API============= 
//app.get("/api/get_order", readOrder);
app.get("/api/products", readProducts);
app.get("/api/v1/transaction", transaction_show); 
app.get("/api/v1/sub_category/:category/show", sub_category_show);
app.post("/api/v1/sub_category/:category/save", sub_category_save);
app.get("/api/v1/sub_category/:sub_category/edit", sub_category_edit);
app.patch("/api/v1/sub_category/:sub_category/update", sub_categoey_update)
app.post("/api/v1/transaction/expense/save", transaction_save);

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
  connectDB(process.env.URI); 
});
