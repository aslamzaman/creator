import * as cheerio from 'cheerio';
import { fetchHtmlPage } from "./fetchHtmlPage";
import { formatedDate } from './utils';

export const nbc = async () => {
    try {
        const pageUrl = "http://localhost:3000/html/nbc.html"
        const htmlText = await fetchHtmlPage(pageUrl);
        const $ = cheerio.load(htmlText);

        const selectDiv = $('body > div')
        console.log("nbc", selectDiv.length);
        if (selectDiv.length === 0) return null;



        const data = selectDiv.map((i, item) => {
            //------- url --------------------------
            const findA = $(item).find('a');
            const url = $(findA).eq(1).attr('href');

            //------- title --------------------------
            const titleText = $(findA).eq(1).text().trim();
            const title = titleText.split("\n").map(item => item.trim()).join(" ");



            //---------- img -----------------------
            const imgSector = $(item).find('img');
            if (imgSector.length === 0) return null;
            const poster = $(imgSector).eq(0).attr('src');


            const ref = "nbcnews.com";
            const date = formatedDate(new Date());


            return { url, title, poster, ref, date };

        }).get();


        return data;

    } catch (err) {
        console.error(err);
    }

};

