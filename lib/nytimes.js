import * as cheerio from 'cheerio';
import { fetchHtmlPage } from "./fetchHtmlPage";
import { formatedDate } from './utils';


export const nytimes = async () => {
    try {
        const pageUrl = "http://localhost:3000/html/nytimes.html"
        const htmlText = await fetchHtmlPage(pageUrl);
        const $ = cheerio.load(htmlText);

        const selectDiv = $('div.css-1lvvmm')
        console.log("nytimes", selectDiv.length)

        const data = selectDiv.map((i, item) => {

            //------- url --------------------------
            const findA = $(item).find('a');
            const url = $(findA).eq(0).attr('href');
    
            //---------- title -----------------------
                   const findP = $(item).find('p.indicate-hover');
            const titleText = $(findP).eq(0).text().trim();
            if (titleText.length === 0) return null;
            const title = titleText.split("\n").map(item => item.trim()).join(" ");
 
            //---------- img -----------------------
            const imgSeclector = $(item).find('img');
            if (imgSeclector.length === 0) return null;
            const poster = $(imgSeclector).eq(0).attr('src');


            const ref = "nytimes.com";
            const date = formatedDate(new Date());


            return { url, title, poster, ref, date };
        }).get();


        return data;

    } catch (err) {
        console.error(err);
    }
};



