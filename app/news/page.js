"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/news/Add";
import Edit from "@/components/news/Edit";
import Delete from "@/components/news/Delete";
import Link from "next/link";
import { formatedDate } from "@/lib/utils";





const News = () => {
    const [newss, setNewss] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                 const apiUrl = "https://apipark.vercel.app/api/news";
               // const apiUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/news`;
                const requestOptions = { method: "GET" };
                const response = await fetch(apiUrl, requestOptions);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.length)
                    const todayData = data.filter(item => item.dt === formatedDate(new Date()));

                    console.log(data);
                    const politics = todayData.filter(item => item.cat === "politics").length;
                    const business = todayData.filter(item => item.cat === "business").length;
                    const science = todayData.filter(item => item.cat === "science").length;
                    const sports = todayData.filter(item => item.cat === "sports").length;
                    const entertainment = todayData.filter(item => item.cat === "entertainment").length;
                    const displayMsg = `politics=${politics}, business=${business},science=${science}, sports=${sports}, entertainment=${entertainment}`;
                    setMsg(displayMsg);

                    setNewss(data);

                } else {
                    throw new Error("Failed to create news");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setWaitMsg('');
            }
        };
        load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }




    return (
        <>

            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">News API Creator</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>


            <div className="w-full bg-white border-2 border-gray-200 p-4 shadow-md rounded-md">
                <div className="w-full overflow-auto">
                    <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
                    <div className="w-full flex justify-end">
                        <div className="w-auto flex items-center">
                        </div>
                    </div>
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">Poster</th>
                                <th className="text-start border-b border-gray-200 px-4 py-2">Detail/Description</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end items-center pr-2.5 font-normal">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newss.length ? newss.map((news, i) => {
                                    return (

                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={news.id}>
                                            <td className="text-center py-1 px-4">
                                                <div>
                                                    <img src={news.poster} alt="poster" className="w-[150px] h-[100px]" />
                                                </div>
                                            </td>
                                            <td className="text-start py-1 px-4">
                                                <Link href={news.url} target="_blank"><span className="font-bold">{i + 1}. {news.title}</span></Link><br />
                                                <span className="text-xs">{news.url}</span> <br />
                                                <span className="text-xs">{news.poster}</span><br />
                                                <span className="text-xs text-gray-400">{news.detail}</span><br />
                                                <span className="text-xs text-gray-400">{news.cat}</span><br />
                                                {news.dt} - {news.ref}
                                            </td>
                                            <td className="text-center py-2">
                                                <div className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                                                    <Edit message={messageHandler} id={news.id} data={news} />
                                                    <Delete message={messageHandler} id={news.id} data={news} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default News;

