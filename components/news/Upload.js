import React, { useState } from "react";
import { BtnEn } from "@/components/Form";
import { addDataToFirebase } from "@/lib/firebaseFunction";
import LoadingDot from "../LoadingDot";

import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";





const Upload = ({ message }) => {
    const [news, setNews] = useState([]);


    const [show, setShow] = useState(false);
    const [busy, setBusy] = useState(false);

    const showAddForm = async () => {
        setShow(true);
        try {
            const data = await getDataFromIndexedDB("news");
            setNews(data);
        } catch (err) {
            console.error(err);
        }
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const saveHandler = async () => {
        if(news.length===0) return null;
        try {
            setBusy(true);
            for (let i = 0; i < news.length; i++) {
                const obj = news[i];
                delete obj.id;
                await addDataToFirebase("news", obj);
            }

            message("Data exports successfully");
        } catch (error) {
            console.error("Error saving news data:", error);
            message("Error saving news data.");
        } finally {
            setBusy(false);
            setShow(false);
        }
    }


    return (
        <>
            {busy ? <LoadingDot message="Please wait" /> : null}
            {show && (
                <div className="fixed left-0 top-[60px] right-0 bottom-0 p-4 bg-gray-500/50 z-10 overflow-auto">
                    <div className="w-full sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-1/2 mx-auto my-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-500">
                        <div className="px-4 md:px-6 py-4 flex justify-between items-center border-b border-gray-300 rounded-t-md">
                            <h1 className="text-xl font-bold text-blue-600">Exports Date To Firebase</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 pb-6 border-0 text-black">
                            <div className="w-full overflow-auto">
                                <div className="p-4">


                                    <div className="w-full mt-4 flex justify-start pointer-events-auto">
                                        <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                        <BtnEn Click={saveHandler} Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-4 py-1.5 mr-6 mt-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition duration-500 cursor-pointer" title="Exports">
                Exports Data To Firebase
            </button>
        </>
    )
}
export default Upload;

