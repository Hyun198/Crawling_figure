const puppeteer = require('puppeteer');



async function Poison_scrapeWebsite(url, keyword) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${url}/goods/goods_search.php?keyword=${encodeURIComponent(keyword)}`);

    let products = [];

    const productSelector = '.item-display.type-gallery .list > ul > li';
    const productElements = await page.$$(productSelector);
    for (const productElement of productElements) {
        const productName = await productElement.$eval('.txt strong', element => element.textContent.trim());
        const imageUrl = await productElement.$eval('.thumbnail img', element => element.getAttribute('src'));
        const productPrice = await productElement.$eval('.price .cost strong', element => element.textContent.trim());
        products.push({
            name: productName,
            image: imageUrl,
            price: productPrice,
        });
    }
    await browser.close();
    return products

}

async function gloryMondayWebsite(url, keyword) {
    console.log(keyword);
    console.log("글러리몬 데이터----------------------------")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${url}/goods/goods_search.php?keyword=${keyword}`);
    let products = [];

}

async function FigureMallWebsite(url, keyword) {
    console.log(keyword);
    console.log("피규어몰 데이터----------------------------")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${url}/shop/shopbrand.html`);
    await page.type('input.MS_search_word', keyword.toString());
    await page.keyboard.press('Enter');
    await page.waitForSelector('#searchWrap div.prd-list tbody tr');

    let products = [];
    const productElements = await page.$$('#searchWrap div.prd-list tbody tr td');
    for (const productElement of productElements) {
        const productName = await productElement.$eval('li.dsc.name', element => element.textContent.trim());
        const productPrice = await productElement.$eval('li.price', element => element.textContent.trim());
        const productImage = await productElement.$eval('li > div > a > img', element => element.getAttribute('src'));

        products.push({
            name: productName,
            image: url + "/" + productImage,
            price: productPrice,
        });

    }
    await browser.close();
    return products

}

module.exports = { Poison_scrapeWebsite, gloryMondayWebsite, FigureMallWebsite };
