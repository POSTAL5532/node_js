const http = require("http");
const fs = require("fs");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

const overviewTemplate = fs.readFileSync(`${__dirname}/templates/overview.template.html`, "utf-8");
const overviewCardTemplate = fs.readFileSync(`${__dirname}/templates/overview-card.template.html`, "utf-8");
const productTemplate = fs.readFileSync(`${__dirname}/templates/product.template.html`, "utf-8");
const rawDevData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const devData = JSON.parse(rawDevData);
const devDataSlugs = devData.map(data => slugify(data.productName, {lower: true}));
console.log(devDataSlugs);

const server = http.createServer(((req, res) => {
    const urlPath = req.url;
    const {query, pathname} = url.parse(urlPath, true);

    if (pathname === "/" || pathname === "/overview") {
        const cardsHtml = devData.map(el => replaceTemplate(overviewCardTemplate, el)).join("");
        res.writeHead(200, {"content-type": "text/html"});
        res.end(overviewTemplate.replace(/{%PRODUCTS_CARDS%}/g, cardsHtml));
    } else if (pathname === "/product") {
        const product = devData[query.id];


        res.writeHead(200, {"content-type": "text/html"});
        res.end(replaceTemplate(productTemplate, product));
    } else if (pathname === "/api") {
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(devData));
    } else {
        res.writeHead(404, {
            "content-type": "text/html"
        })
        res.end("<h1 style='color: red'>404 Page!</h1>")
    }
}));

server.listen(8000, () => {
    console.log("Server started on http://localhost:8000/")
});
