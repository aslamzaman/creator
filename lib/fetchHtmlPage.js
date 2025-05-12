export const fetchHtmlPage = async (url) => {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
                'Accept': 'application/json, text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
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
