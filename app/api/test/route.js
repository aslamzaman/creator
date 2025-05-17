import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';


const myData = [
    {
        "title": "Taylor Swift and even Marvel are now getting dragged into the Blake Lively and Justin Baldoni legal battle. Here's the latest — and how we got here.",
        "detail": "The Blake Lively and Justin Baldoni drama is the he-said-she-said case heard around Hollywood — and in May, superstar Tay",
        "poster": "https://s.yimg.com/ny/api/res/1.2/1NUUzV0wtXUMzkl.R_HLcg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD04Mjg-/https://s.yimg.com/os/creatr-uploaded-images/2025-05/2a457040-3194-11f0-afff-fbbc5c2be080",
        "url": "https://www.yahoo.com/entertainment/celebrity/article/taylor-swift-and-even-marvel-are-now-getting-dragged-into-the-blake-lively-and-justin-baldoni-legal-battle-heres-the-latest--and-how-we-got-here-233759422.html",
        "dt": "2025-05-16",
        "cat": "entertainment",
        "ref": "yahoo.com"
    },
    {
        "title": "Movie Review: The Weeknd's 'Hurry Up Tomorrow' is a surrealist vanity project",
        "detail": "It's the final night of tour. SoFi Stadium, just outside Los Angeles, is packed. 80,000 fans stand before The Weeknd, an ",
        "poster": "https://s.abcnews.com/images/Entertainment/wirestory_bf358e4edddfe96ffd04b2e125b3fda0_16x9_608.jpg",
        "url": "https://abcnews.go.com/Entertainment/wireStory/movie-review-weeknds-hurry-tomorrow-surrealist-vanity-project-121856923",
        "dt": "2025-05-16",
        "cat": "entertainment",
        "ref": "go.com"
    },
    {
        "title": "U.S. finance CEOs challenged for leaving climate pacts by Democratic lawmakers",
        "detail": "NEW YORK/LONDON, May 15 (Reuters) - Democratic lawmakers harshly criticized the chief executives of BlackRock (BLK.N), op",
        "poster": "https://www.reuters.com/resizer/v2/KNB3TE4OYFOQ7CXOYIFRW3VFBM.jpg?auth=c124e854f29fdbadcf2456dd48d8612903d3587370d25fdde0ac508c1d5c7a60&width=640&quality=80",
        "url": "https://www.reuters.com/sustainability/cop/us-finance-ceos-challenged-leaving-climate-pacts-by-democratic-lawmakers-2025-05-15/",
        "dt": "2025-05-16",
        "cat": "business",
        "ref": "reuters.com"
    },
    {
        "title": "JPMorgan investors look for clarity on tariff impact, succession plan",
        "detail": "JPMorgan Chase investors will be keen to learn how the largest U.S. lender and the world's biggest economy are likely to ",
        "poster": "https://www.reuters.com/resizer/v2/ABI7QKFXV5IODO3KZQVQRBKIJU.jpg?auth=1d0c3a0cef489cc31973802a26bd2f7dc7467f7159cbc754658b2d26f70d6aa6&width=720&quality=80",
        "url": "https://www.reuters.com/business/finance/",
        "dt": "2025-05-16",
        "cat": "business",
        "ref": "reuters.com"
    },
    {
        "title": "China's BYD plans to establish European centre in Hungary, CEO says",
        "detail": "Chinese electric vehicle giant BYD expects to establish a European centre in Hungary, CEO and President Wang Chuanfu said",
        "poster": "https://www.reuters.com/resizer/v2/N7S2F7Y3TFMIDET4WL2ORXKJ3E.jpg?auth=d274e8d52b011f5f4c40b15c90c4726925c497c52986072e7be88d489db1d9ba&width=960&quality=80",
        "url": "https://www.reuters.com/business/autos-transportation/",
        "dt": "2025-05-16",
        "cat": "business",
        "ref": "reuters.com"
    },
    {
        "title": "Journalism leads talented field of horses ready to step up at 2025 Preakness Stakes",
        "detail": "For the second year in a row, racing fans were treated to an outstanding stretch run in this year’s Kentucky Derby. Sover",
        "poster": "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-762x508,f_auto,q_auto:best/rockcms/2025-05/nebula-Journalism-leads-talented-field-of-horses-ready-to-step-up-at-2025-Preakness-Stakes-c6037c.jpg",
        "url": "https://www.nbcsports.com/horse-racing/news/journalism-leads-talented-field-of-horses-ready-to-step-up-at-2025-preakness-stakes?cid=nbcnews",
        "dt": "2025-05-16",
        "cat": "sports",
        "ref": "nbcsports.com"
    },
    {
        "title": "‘Turning point’: claw print fossils found in Australia rewrite story of amniotes by 40 million years",
        "detail": "Fossilised claw prints found in Australia suggest amniotes – the ancestors of reptiles, birds and mammals – evolved about",
        "poster": "https://i.guim.co.uk/img/media/bad7fbc8f1883689cbd1b0effe74e0a7964f3b08/0_0_1350_1080/master/1350.jpg?width=460&dpr=1&s=none&crop=5%3A4",
        "url": "https://www.theguardian.com/environment/2025/may/14/fossilised-claw-prints-australia-amniotes-fossils",
        "dt": "2025-05-16",
        "cat": "science",
        "ref": "theguardian.com"
    },
    {
        "title": "US doctors rewrite DNA of infant with severe genetic disorder in medical first",
        "detail": "Doctors in the US have become the first to treat a baby with a customised gene-editing therapy after diagnosing the child",
        "poster": "https://i.guim.co.uk/img/media/33e32ea5528cef1e03ab792e4f4e7920209f1818/167_0_1066_853/master/1066.jpg?width=620&dpr=1&s=none&crop=none",
        "url": "https://www.theguardian.com/science/2025/may/15/us-doctors-rewrite-dna-of-infant-with-severe-genetic-disorder-in-medical-first",
        "dt": "2025-05-16",
        "cat": "science",
        "ref": "theguardian.com"
    },
    {
        "title": "Everton fans on the end of a Goodison era: ‘I’ll be thinking about my dad, my brothers, my son’",
        "detail": "An era lasting 133 years comes to an end this Sunday as Everton’s men’s team play their final game at Goodison Park. In 1",
        "poster": "https://i.guim.co.uk/img/media/9f13af5f9668a4a5ab9d6091daadaa93f33f172a/311_0_4460_3568/master/4460.jpg?width=700&dpr=1&s=none&crop=5%3A4",
        "url": "https://www.theguardian.com/football/2025/may/16/everton-fans-goodison-park-end-of-an-era-picture-essay",
        "dt": "2025-05-16",
        "cat": "sports",
        "ref": "theguardian.com"
    },
    {
        "title": "Trump announces more than $200bn of deals between US and UAE",
        "detail": "Donald Trump has announced deals totaling more than $200bn between the United States and the United Arab Emirates, includ",
        "poster": "https://i.guim.co.uk/img/media/b6bdb56d8e55f1ebea5f168f104491296f8fc415/361_0_3009_2408/master/3009.jpg?width=620&dpr=1&s=none&crop=none",
        "url": "https://www.theguardian.com/us-news/2025/may/15/trump-200bn-uae",
        "dt": "2025-05-16",
        "cat": "politics",
        "ref": "theguardian.com"
    },
    {
        "title": "Number of UK billionaires falls after market turmoil, but King Charles’s wealth jumps – business live",
        "detail": "The Sunday Times Rich List also shows that Suneil Setiya and Greg Skinner, who founded hedge fund Quadrature Capital, are",
        "poster": "https://i.guim.co.uk/img/media/191ac1b13c3d4a3329830888aa9a616fb8102998/1000_0_5000_4000/master/5000.jpg?width=620&dpr=1&s=none&crop=none",
        "url": "https://www.theguardian.com/business/live/2025/may/16/rich-list-uk-billionaires-falls-after-market-turmoil-non-dom-hinduja-ratcliffe-sunak-king-charles-business-live-news",
        "dt": "2025-05-16",
        "cat": "business",
        "ref": "theguardian.com"
    },
    {
        "title": "Zelenskyy sends team for peace talks but says Russia ‘not serious enough’",
        "detail": " Zelenskyy sends team for peace talks but says Russia ‘not serious enough’ Two sides set for first direct negotiations si",
        "poster": "https://i.guim.co.uk/img/media/562ce30bdd2182626f3c361f59fec01c09801de8/1769_311_5887_4709/master/5887.jpg?width=620&dpr=1&s=none&crop=5%3A4",
        "url": "https://www.theguardian.com/world/2025/may/15/zelenskyy-ukraine-russia-peace-talks-istanbul",
        "dt": "2025-05-16",
        "cat": "politics",
        "ref": "theguardian.com"
    },
    {
        "title": "NFL schedule release reveals brutal path for these 3 teams in 2025",
        "detail": "The NFL released the schedules for all 32 teams on Wednesday, and some have it a little tougher than others this season. ",
        "poster": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2025/05/454/256/campbell-daboll-johnson.jpg?ve=1&tl=1",
        "url": "https://www.foxnews.com/sports/nfl-schedule-release-reveals-brutal-path-3-teams-2025",
        "dt": "2025-05-16",
        "cat": "sports",
        "ref": "foxnews.com"
    },
    {
        "title": "AI chipmaker AMD unveils $6B buyback plan",
        "detail": "Advanced Micro Devices on Wednesday announced a new $6 billion stock buyback plan, joining a string of chipmakers that ar",
        "poster": "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2025/05/720/405/amd-logo-chip-reuters.jpg?ve=1&tl=1",
        "url": "https://www.foxbusiness.com/markets/ai-chipmaker-amd-unveils-6b-buyback-plan",
        "dt": "2025-05-16",
        "cat": "science",
        "ref": "foxbusiness.com"
    },
    {
        "title": "WWE star Rhea Ripley drop kicks fans critical of female wrestlers",
        "detail": "\"YOU guys are the real reason it’s so difficult to be taken seriously as a women’s wrestler,\" she wrote on X. \"If YOU put",
        "poster": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2025/05/720/405/rhea-ripley.jpg?ve=1&tl=1",
        "url": "https://www.foxnews.com/sports/wwe-star-rhea-ripley-drop-kicks-fans-critical-female-wrestlers",
        "dt": "2025-05-16",
        "cat": "sports",
        "ref": "foxnews.com"
    },
    {
        "title": "Blake Lively's attempt to remove herself from 'self-concocted disaster' is abuse of legal system: lawyer",
        "detail": "Lively asked the court to dismiss Baldoni's lawsuit, which accuses the \"Gossip Girl\" star of retaliation and defamation, ",
        "poster": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2025/02/454/256/blake-lively-justin-baldoni-film.jpg?ve=1&tl=1",
        "url": "https://www.foxnews.com/entertainment/blake-livelys-attempt-remove-herself-self-concocted-disaster-abuse-legal-system-lawyer",
        "dt": "2025-05-16",
        "cat": "entertainment",
        "ref": "foxnews.com"
    },
    {
        "title": "TIKTOK MORMON WIVES' SWINGERS LIFESTYLE EXPOSED BY MOM WHO 'HIT ROCK BOTTOM'",
        "detail": "\"I think with each season there will be more and more voices that become more active and more vocal,\" she added. \"And I c",
        "poster": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2025/05/720/405/mormon-wives-2.jpg?ve=1&tl=1",
        "url": "https://www.foxnews.com/entertainment/secret-lives-mormon-wives-star-braces-more-hate-ahead-explosive-second-season",
        "dt": "2025-05-16",
        "cat": "entertainment",
        "ref": "foxnews.com"
    },
    {
        "title": "Marco Rubio warns Iran 'at the threshold' of nuclear weapon capability as US-Iran talks continue",
        "detail": "Secretary of State Marco Rubio warned that the United States faces a critical moment with Iran to curb the Islamic Republ",
        "poster": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2025/05/348/196/7738b654-marco-rubio.png?ve=1&tl=1",
        "url": "https://www.foxnews.com/media/marco-rubio-warns-iran-at-threshold-nuclear-weapon-capability-us-iran-talks-continue",
        "dt": "2025-05-16",
        "cat": "politics",
        "ref": "foxnews.com"
    },
    {
        "title": "Former Biden officials offer rare praise for Trump's bold Middle East moves",
        "detail": "Former top officials in the Biden administration admitted they were impressed by President Donald Trump’s bold moves this",
        "poster": "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2025/05/277/156/355b9cb4-trump1.png?tl=1&ve=1",
        "url": "https://www.foxnews.com/media/former-biden-officials-offer-rare-praise-trumps-bold-middle-east-moves",
        "dt": "2025-05-16",
        "cat": "politics",
        "ref": "foxnews.com"
    },
    {
        "title": "Mile-wide underwater volcano ready to erupt off the West Coast",
        "detail": "Things are heating up hundreds of miles off the coast of Oregon, where a large undersea volcano is showing signs of impen",
        "poster": "https://media.cnn.com/api/v1/images/stellar/prod/snowblower-press-release-copy.jpg?q=w_1160,c_fill/f_webp",
        "url": "https://edition.cnn.com/2025/05/08/science/underwater-volcano-erupt-oregon-coast",
        "dt": "2025-05-16",
        "cat": "science",
        "ref": "cnn.com"
    }
]


export const GET = async (Request) => {
    try {

        const client = createClient({
            username: 'default',
            password: 'j4RXPuI60xq6eVZ3TErqLUoj7TC8TYiM',
            socket: {
                host: 'redis-10507.c274.us-east-1-3.ec2.redns.redis-cloud.com',
                port: 10507
            }
        });

        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

        //await client.set('news', JSON.stringify(myData));
        const getDataFromRadis = await client.get('news');
        const result = JSON.parse(getDataFromRadis);

        await client.quit();

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