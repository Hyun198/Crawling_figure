const puppeteer = require('puppeteer');



async function Poison_scrapeWebsite(url, keyword) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {

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
        return products
    } catch (error) {
        console.error("poison apple: ", error);
    } finally {
        await browser.close();
    }




}

async function gloryMondayWebsite(url, keyword) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {


        await page.goto(`${url}/goods/goods_search.php?keyword=${keyword}`);

        let products = [];
        const productSelector = '.item_gallery_type > ul > li';
        const productElements = await page.$$(productSelector);

        for (const productElement of productElements) {
            const productName = await productElement.$eval('div.item_cont div.item_info_cont div.item_tit_box strong.item_name', element => element.textContent.trim());
            const imageUrl = await productElement.$eval('div.item_cont div.item_photo_box a img', element => element.getAttribute('src'));
            const priceElement = await productElement.$('div.item_cont div.item_info_cont div.item_money_box strong.item_price');
            const linkElement = await productElement.$('div.item_cont div.item_photo_box a');
            const link = await linkElement.evaluate(element => element.getAttribute('href'));
            let productPrice = 'Sold Out';
            if (priceElement) {
                productPrice = await priceElement.evaluate(node => node.textContent.trim());
            }

            products.push({
                name: productName,
                image: imageUrl,
                price: productPrice,
                link: link,
            });


        }
        return products;
    }
    catch (error) {
        console.error("glory monday", error);
    } finally {
        await browser.close();
    }




}

async function FigureMallWebsite(url, keyword) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
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
        return products
    } catch (error) {
        console.error("figuremall:", error);
    } finally {
        await browser.close();
    }


}


async function figureCityWebsite(url, keyword) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(`${url}/shop/shopbrand.html`);
        await page.type('input.MS_search_word', keyword.toString());
        await page.keyboard.press('Enter');

        // 페이지 로드를 대기하고 결과가 표시될 때까지 기다립니다.
        await page.waitForSelector('#prdSearch div.prd-list table tbody tr td');

        let products = [];
        const productElements = await page.$$('#prdSearch div.prd-list table tbody tr td');
        for (const productElement of productElements) {
            const productName = await productElement.$eval('li.dsc', element => element.textContent.trim())
            const productPrice = await productElement.$eval('li.price', element => element.textContent.trim())
            const productImage = await productElement.$eval('div.thumb a img', element => element.getAttribute('src'));

            products.push({
                name: productName,
                image: url + "/" + productImage,
                price: productPrice,
            })

        }

        return products;

    } catch (error) {
        console.error("figurecity:", error);
    } finally {
        await browser.close();
    }
}

module.exports = { Poison_scrapeWebsite, gloryMondayWebsite, FigureMallWebsite, figureCityWebsite };
