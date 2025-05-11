import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';


const getData = async (url) => {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            },
            timeout: 5000
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const htmlText = await res.text();
        const $ = cheerio.load(htmlText);

        const liData = $('li[data-testid=coming-soon-entry]');

        const data = liData.map((i, item) => {
            const imgDiv = $(item).find('div > img');
            let imgSrc = "";
            if (imgDiv.length === 0) {
                imgSrc = "";
            } else {
                imgSrc = $(imgDiv).eq(0).attr("src");
            }


            const titleDiv = $(item).find('div > a');
            let title = "";
            let titleHref = "";
            if (titleDiv.length === 0) {
                title = "";
                titleHref = "";
            } else {
                title = $(titleDiv).eq(0).text().trim();
                titleHref = "https://www.imdb.com" + $(titleDiv).eq(0).attr("href");
            }

            return {
                title,
                url: titleHref,
                poster: imgSrc,
            };
        }).get();
        console.log(data.length)
        const withOutPoster = data.filter(item => item.poster);
        console.log(withOutPoster.length)
        return withOutPoster;
    } catch (err) {
        console.error(err);
    }

};





export const GET = async (Request) => {
    try {

        const url = "https://www.imdb.com/calendar/?region=US&type=MOVIE&ref_=rlm";
        const res = await getData(url);

        return NextResponse.json(res, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });


    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({
            message: "An error occurred while fetching data",
            error: error.message
        }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    }

}