"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/news/Add";
import Edit from "@/components/news/Edit";
import Delete from "@/components/news/Delete";
import Upload from "@/components/news/Upload";
import { getDataFromIndexedDB, deleteKeyFromIndexedDB } from "@/lib/DatabaseIndexedDB";
import Link from "next/link";



const getCat = (data, category) => {
    const result = data.filter(item => item.cat === category);
    return result.length;
}



const News = () => {
    const [newss, setNewss] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const apiUrl = "http://localhost:3000/api/redis";
                const requestOptions = { method: "GET" };
                const response = await fetch(apiUrl, requestOptions);
                if (response.ok) {
                    const join = await response.json();
                    console.log(join.result);
                    setNewss(join.result);

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


    const deleteHandler = async () => {
        const isDelete = confirm("Are you sure?");
        if (!isDelete) return false;
        await deleteKeyFromIndexedDB("news");
        setMsg("Data deleted at " + Date.now());
    }



    return (
        <>

            <div className="w-full flex justify-end">
                <Upload message={messageHandler} />
            </div>

            <div className="w-full flex justify-end">
                <button onClick={deleteHandler} className="px-4 py-1.5 mr-6 mt-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition duration-500 cursor-pointer">Delete All Data</button>
            </div>


            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">News</h1>
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
                                <th className="text-start border-b border-gray-200 px-4 py-2">Detail</th>
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

