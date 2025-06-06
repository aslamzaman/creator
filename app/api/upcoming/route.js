import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { fetchHtmlPage } from '@/lib/fetchHtmlPage';


const getList = async () => {
    try {
        const url = "https://www.imdb.com/calendar/?region=IN&type=MOVIE&ref_=rlm";
        const htmlText = await fetchHtmlPage(url);
        const $ = cheerio.load(htmlText);

        const articleBlock = $('article[data-testid=calendar-section]');
        //  console.log(articleBlock.length);

        const data = articleBlock.map((i, item) => {
            const releaseDateDiv = $(item).find('div[data-testid=release-date]');
            const releaseDate = releaseDateDiv.length > 0 ? $(releaseDateDiv).eq(0).text().trim() : null;

            //------------------------------------
            const getLi = $(item).find('ul > li');
            if (getLi.length === 0) return null;

            const getDv = getLi.map((i, item) => {
                if (item.length === 0) return null;
                const imgSelector = $(item).find('div:nth-child(1) > div > img');
                if (imgSelector.length === 0) return null;
                const img = $(imgSelector).eq(0).attr('src');

                const titleSelector = $(item).find('div:nth-child(2) > div > a');
                if (titleSelector.length === 0) return null;
                const title = $(titleSelector).eq(0).text().trim();
                const url = "https://www.imdb.com" + $(titleSelector).eq(0).attr('href');
                return {
                    releaseDate,
                    img,
                    title,
                    url
                }

            }).get();
            //------------------------------------
            return getDv;

        }).get();


        return data;

    } catch (err) {
        console.error(err);
    }

};




const getData = async (url, dt) => {
    try {
        const htmlText = await fetchHtmlPage(url);
        const $ = cheerio.load(htmlText);

        const titleArr = $('h1[data-testid=hero__pageTitle]');
        const title = titleArr.length > 0 ? $(titleArr).eq(0).text().trim() : "";


        const posterArr = $('div[data-testid=hero-media__poster] > div > img');
        const poster = posterArr.length > 0 ? $(posterArr).eq(0).attr('src') : "";

        const release = dt;

        const ratingArr = $('div[data-testid=hero-rating-bar__aggregate-rating__score]');
        const rating = ratingArr.length > 0 ? $(ratingArr).eq(0).text().trim() : "";

        const descArr = $('p[data-testid=plot] > span[data-testid=plot-xs_to_m]');
        const description = descArr.length > 0 ? $(descArr).eq(0).text().trim() : "";

        const lengthFnc = () => {
            const lenArr = $('section[data-testid=hero-parent] > div.sc-3b24bae4-3.iDcCm > div.sc-bf57f3f2-0.gDRYed > ul > li');
            if (lenArr.length === 0) return "";
            return lenArr.map((i, item) => $(item).text().trim()).get();
        }
        const len = lengthFnc();
        const length = len.length > 0 ? len.join(" ") : "";

        const catFnc = () => {
            const selectCat = $('div[data-testid=interests] > div');
            if (selectCat.length < 2) return [];
            const findCat = $(selectCat).eq(1).find('a');
            if (findCat.length === 0) return [];
            return findCat.map((i, item) => $(item).text().trim()).get();
        }
        const category = catFnc();

        const directorsFnc = () => {
            const selectDirectors = $('li[data-testid=title-pc-principal-credit]');
            if (selectDirectors.length === 0) return [];
            const targetedLi = $(selectDirectors).eq(0).find('ul > li');
            return targetedLi.map((i, item) => $(item).text().trim()).get();
        }
        const directors = directorsFnc();

        const writersFnc = () => {
            const selectWriters = $('li[data-testid=title-pc-principal-credit]');
            if (selectWriters.length < 2) return [];
            const targetedLi = $(selectWriters).eq(1).find('ul > li');
            return targetedLi.map((i, item) => $(item).text().trim()).get();
        }
        const writers = writersFnc();


        const castsFnc = () => {
            const selectCast = $('div[data-testid=title-cast-item]');
            if (selectCast.length === 0) return [];
            const targetedCast = selectCast.map((i, item) => {
                const selectName = $(item).find('div:nth-child(2) > a');
                if (selectName === 0) return null;
                return $(selectName).eq(0).text().trim();
            }).get();
            return targetedCast;
        }
        const cast = castsFnc();


        return { url, title, poster, release, rating, length, description, category, directors, writers, cast };
    } catch (err) {
        console.error(err);
    }

};




export const GET = async (Request) => {
    try {

        const list = await getList();
        console.log(list.length)


        const result = [];
        for (let i = 0; i < list.length; i++) {
            const url = list[i].url;
            const dt = list[i].releaseDate;
            const res = await getData(url, dt);
            result.push(res);
            console.log(`${i + 1} / ${list.length}`);
        }



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