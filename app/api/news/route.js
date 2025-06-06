import { NextRequest, NextResponse } from 'next/server';
import { getDataFromFirestoreRedisServer, addDataToFirestoreRedisServer } from '@/lib/firebaseRedisFunctions';



export const GET = async (Request) => {
    try {
        const resultResponse = await getDataFromFirestoreRedisServer("news", "news_api",10);
       // console.log(resultResponse);
        
        return NextResponse.json(resultResponse, {
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



export const POST = async (Request) => {
    try {
        const data = await Request.json();
        const message = await addDataToFirestoreRedisServer("news", data, "news_api");
        return NextResponse.json({ message }, {
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
