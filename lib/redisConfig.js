import { createClient } from 'redis';

// npm install redis@5.0.1


export const redisConfig = async () => {
    try {
        const client = createClient({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            }
        });
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
      // const d =  await client.del('news_api');
      // console.log(d);

        return client;
    } catch (err) {
        console.error(err);
    }
}
