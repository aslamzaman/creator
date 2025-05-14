import { NextRequest, NextResponse } from 'next/server';
import { bbc } from '@/lib/bbc';
import { cnn } from '@/lib/cnn';
import { nbc } from '@/lib/nbc';
import { nytimes } from '@/lib/nytimes';




export const GET = async (Request) => {
    try {

        const ny = await nytimes();

        const x = await bbc();
        const y = await cnn();
        const z = await nbc();
        const result = [...x, ...y, ...z, ...ny];
        console.log("Total data: ", result.length)

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