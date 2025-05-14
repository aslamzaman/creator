import * as cheerio from 'cheerio';
import { fetchHtmlPage } from "./fetchHtmlPage";


export const cnn = async () => {
    try {
        const pageUrl = "http://localhost:3000/html/cnn.html"
        const htmlText = await fetchHtmlPage(pageUrl);
        const $ = cheerio.load(htmlText);

        const selectDiv = $('div[data-component-name=container]')
        console.log(selectDiv.length)

        const data = selectDiv.map((i, item) => {
            //------- url --------------------------
            const anchor = $(item).find('a');
            if (anchor.length === 0) return null;
            const url = "https://edition.cnn.com" + $(anchor).eq(0).attr('href');


            //---------- title -----------------------
            const header = $(item).find('a > div > div > span');
            if (header.length === 0) return null;
            const titleText = $(header).eq(0).text().trim();
            const title = titleText.split("\n").map(item => item.trim()).join(" ");


            //---------- img -----------------------
            const imgSeclector = $(item).find('img');
            if (imgSeclector.length === 0) return null;
            const poster = $(imgSeclector).eq(0).attr('src');

            //---------- description -----------------------
           
            const description  = "";

            const ref = "2025-05-14 | edition.cnn.com";


            return {url, title, poster, description, ref };
        }).get();


        return data;

    } catch (err) {
        console.error(err);
    }

};


