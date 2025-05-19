import React, { useState } from "react";
import { BtnSubmit, DropdownEn, TextEn } from "@/components/Form";
import { formatedDate } from "@/lib/utils";
import LoadingDot from "@/components/LoadingDot";




function getMainDomain(url) {
    const hostname = new URL(url).hostname;
    const parts = hostname.split('.');
    if (parts.length <= 2) return hostname;
    return parts.slice(-2).join('.');
}



const Add = ({ message }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [poster, setPoster] = useState('');
    const [detail, setDetail] = useState('');
    const [cat, setCat] = useState('');
    const [show, setShow] = useState(false);

    const [waitPage, setWaitPage] = useState(false);


    const resetVariables = () => {
        setTitle('');
        setUrl('');
        setPoster('');
        setDetail('');
        setCat('');
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            title: title,
            url: url,
            poster: poster,
            detail: detail,
            ref: getMainDomain(url),
            dt: formatedDate(new Date()),
            cat: cat,
            createdAt: new Date().toISOString()
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        setWaitPage(true);
        try {

            const newObject = createObject();
            const apiUrl = "http://localhost:3000/api/news";
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                const json = await response.json();
                console.log(json.message)
                message(json.message);
            } else {
                throw new Error("Failed to create news");
            }


        } catch (error) {
            console.error("Error saving news data:", error);
            message("Error saving news data.");
        } finally {
            setShow(false);
            setWaitPage(false);
        }
    }


    return (
        <>
            {waitPage ? (
                <LoadingDot message={`Please wait ...`} />
            ) : null}

            {show && (
                <div className="fixed inset-0 px-2 py-16 bg-gray-500/50 z-10 overflow-auto">
                    <div className="w-full md:w-[500px] lg:w-[800px] mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-4 pb-6 text-black">
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Title" Id="title" Change={e => setTitle(e.target.value)} Value={title} Chr={250} />
                                    <TextEn Title="Url" Id="url" Change={e => setUrl(e.target.value)} Value={url} Chr={250} />
                                    <TextEn Title="Poster" Id="poster" Change={e => setPoster(e.target.value)} Value={poster} Chr={250} />
                                    <TextEn Title="Detail" Id="detail" Change={e => setDetail(e.target.value)} Value={detail} Chr={121} />
                                    <DropdownEn Title="Category" Id="cat" Change={e => setCat(e.target.value)} Value={cat}>
                                        <option value="politics">Politics</option>
                                        <option value="business">Business</option>
                                        <option value="entertainment">Entertainment</option>
                                        <option value="sports">Sports</option>
                                        <option value="science">Science</option>
                                    </DropdownEn>
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500 cursor-pointer" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;

