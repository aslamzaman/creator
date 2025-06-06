import * as cheerio from 'cheerio';
import { fetchHtmlPage } from "./fetchHtmlPage";
import { formatedDate } from './utils';

export const cnn = async () => {
    try {
        const pageUrl = "http://localhost:3000/html/cnn.html"
        const htmlText = await fetchHtmlPage(pageUrl);
        const $ = cheerio.load(htmlText);

        const selectDiv = $('body > div')
        console.log("cnn", selectDiv.length)
        const data = selectDiv.map((i, item) => {
            //------- url --------------------------
            const anchor = $(item).find('a');
            if (anchor.length === 0) return null;
            const url = "https://edition.cnn.com" + $(anchor).eq(1).attr('href');
            //---------- title -----------------------
            const titleText = $(anchor).eq(1).text().trim();
            const title = titleText.split("\n").map(item => item.trim()).join(" ");


            //---------- img -----------------------
            const imgSeclector = $(item).find('img');
            if (imgSeclector.length === 0) return null;
            const poster = $(imgSeclector).eq(0).attr('src');

            //---------- description -----------------------


            const ref = "edition.cnn.com";
            const date = formatedDate(new Date());

            return { url, title, poster, ref, date };
        }).get();


        return data;

    } catch (err) {
        console.error(err);
    }

};


