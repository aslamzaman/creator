import * as cheerio from 'cheerio';
import { fetchHtmlPage } from "./fetchHtmlPage";


export const nbc = async () => {
    try {
        const pageUrl = "http://localhost:3000/html/nbc.html"
        const htmlText = await fetchHtmlPage(pageUrl);
        const $ = cheerio.load(htmlText);

        const selectDiv = $('body > div')
        if (selectDiv.length === 0) return null;

        const data = selectDiv.map((i, item) => {
            //------- url --------------------------
            const anchor = $(item).find('a');            
            if (anchor.length === 0) return null;
            const url = $(anchor).eq(0).attr('href');


            //------- title --------------------------
            const titleSeclector = $(item).find('h2 > a');
            if (titleSeclector.length === 0) return null;
            const title = $(titleSeclector).eq(0).text().trim();



            //---------- img -----------------------
            const imgSector = $(item).find('img');
            if (imgSector.length === 0) return null;
            const poster = $(imgSector).eq(0).attr('src');

            // console.log("aslam", poster)

            const description = "";
            const ref = "2025-05-14 | nbcnews.com";



            return { url, title, poster, description, ref };
        }).get();


        return data;

    } catch (err) {
        console.error(err);
    }

};

