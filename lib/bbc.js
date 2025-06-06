import * as cheerio from 'cheerio';
import { fetchHtmlPage } from "./fetchHtmlPage";
import { formatedDate } from './utils';


export const bbc = async () => {
    try {
        const pageUrl = "http://localhost:3000/html/bbc.html"
        const htmlText = await fetchHtmlPage(pageUrl);
        const $ = cheerio.load(htmlText);

        const selectDiv = $('body > a')
        console.log("bbc", selectDiv.length)

        const data = selectDiv.map((i, item) => {

            //------- url --------------------------
            const url = "https://www.bbc.com" + $(item).attr('href');


            //---------- title -----------------------
            const header = $(item).find('h2');
            if (header.length === 0) return null;
            const titleText = $(header).eq(0).text().trim();
            const title = titleText.split("\n").map(item => item.trim()).join(" ");

            //---------- img -----------------------
            const imgSeclector = $(item).find('img');
            if (imgSeclector.length === 0) return null;
            const poster = $(imgSeclector).eq(0).attr('src');


            const ref = "bbc.com";
            const date = formatedDate(new Date()); 


            return { url, title, poster, ref, date };
        }).get();


        return data;

    } catch (err) {
        console.error(err);
    }
};



