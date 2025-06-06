

export const fetchHtmlPage = async (url, agent) => {
    try {
    


        const res = await fetch(url, {
            headers: {
                'User-Agent': agent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            },
            timeout: 5000
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const htmlText = await res.text();
        return htmlText;
    } catch (err) {
        console.error(err);
    }
};
