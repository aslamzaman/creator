import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { fetchHtmlPage } from '@/lib/fetchHtmlPage';


const getData = async () => {
    try {
        const url = "https://www.imdb.com/news/celebrity/?ref_=nv_cel_nw";

        const htmlText = await fetchHtmlPage(url);
        const $ = cheerio.load(htmlText);

        const selectAll = $('div[data-testid=sub-section-news-card-section] > div[data-testid=item-id]');
        if (selectAll.length === 0) return null;


        const result = selectAll.map((i, item) => {

            //--------- Image -------------------------
            const imgSelect = $(item).find('a > div > img');
            if (imgSelect.length === 0) return null;
            const img = $(imgSelect).eq(0).attr('src');


            //--------- URL & Title -------------------------
            const selecTitle = $(item).find('a[data-testid=item-text-with-link]');
            if (selecTitle.length === 0) return null;
            const url = $(selecTitle).eq(0).attr('href');
            const title = $(selecTitle).eq(0).text().trim();


            //---------- Text Detail -----------------------------------
            const selecHtml = $(item).find('div[data-testid=item-html] > div');
            if (selecHtml.length === 0) return null;
            const detail = $(selecHtml).eq(0).prop('innerText');


            //---------- Date and By -----------------------------------
            const selecLi = $(item).find('ul > li');
            if (selecLi.length === 0) return null;
            const info = selecLi.map((i, item) => ($(item).text().trim())).get();


            return { img, url, title, detail, info };
        }).get();




        return result;

    } catch (err) {
        console.error(err);
    }

};





export const GET = async (Request) => {
    try {

        const result = await getData();

        return NextResponse.json(result, {
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