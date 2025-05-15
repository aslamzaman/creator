"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/news/Add";
import Edit from "@/components/news/Edit";
import Delete from "@/components/news/Delete";
// import Print from "@/components/news/Print";
import { getDataFromFirebase } from "@/lib/firebaseFunction";
import { sortArray } from "@/lib/utils";
import Image from "next/image";
import Link from 'next/link'




const News = () => {
    const [newss, setNewss] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("Data ready");


    useEffect(() => {
        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromFirebase("news");
                const withSl = data.map((item, i) => ({ sl: i + 1, ...item }))
                const sortedData = withSl.sort((a, b) => sortArray(new Date(b.createdAt), new Date(a.createdAt)));
                console.log(sortedData);
                setNewss(sortedData);
                setWaitMsg('');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full py-4">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">News</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="w-full p-4 bg-white border-2 border-gray-300 shadow-md rounded-md overflow-auto">
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-200">
                            <th className="text-center border-b border-gray-200 px-4 py-1">Picture</th>
                            <th className="text-start border-b border-gray-200 px-4 py-1">Title</th>
                            <th className="w-[95px] border-b border-gray-200 px-4 py-2">
                                <div className="w-[90px] h-[45px] flex justify-end space-x-2 p-1 font-normal">
                                    {/* <Print data={newss} /> */}
                                    <Add message={messageHandler} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newss.length ? (
                            newss.map((news, i) => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={news.id}>
                                    <td className="text-center py-1 px-4">
                                        <div>
                                         <img src={news.poster} alt="poster" className="w-[150px] h-[100px]" />
                                        </div>
                                    </td>
                                    <td className="text-start py-1 px-4">
                                        <Link href={news.url} target="_blank"><span className="font-bold">{news.sl}. {news.title}</span></Link><br />
                                        <span className="text-xs">{news.url}</span> <br />
                                        <span className="text-xs">{news.poster}</span><br />
                                        <span className="text-xs text-gray-400">{news.detail}</span><br />
                                        {news.date} - {news.ref}
                                    </td>
                                    <td className="text-center py-2">
                                        <div className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                            <Edit message={messageHandler} id={news.id} data={news} />
                                            <Delete message={messageHandler} id={news.id} data={news} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-10 px-4">
                                    Data not available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );

};

export default News;

