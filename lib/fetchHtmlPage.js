export const fetchHtmlPage = async (url) => {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
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
