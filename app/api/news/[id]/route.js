import { NextResponse } from 'next/server';
import { updateDataToFirestoreRedisServer, getSingleDataFromFirestore, deleteDataFromFirestoreRedisServer } from '@/lib/firebaseRedisFunctions';



export const GET = async (Request, { params }) => {
    try {
        const { id } = await params;

        const resultResponse = await getSingleDataFromFirestore("news", id);

      //  console.log(resultResponse);

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





export const PUT = async (Request, { params }) => {
    try {
        const { id } = await params;
        console.log(id);
        const data = await Request.json();
        const message = await updateDataToFirestoreRedisServer("news", data, id, "news_api");
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




export const DELETE = async (Request, { params }) => {
    try {
        const { id } = await params;
        const message = await deleteDataFromFirestoreRedisServer("news", id, "news_api");
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
