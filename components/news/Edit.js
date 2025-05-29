import React, { useState } from "react";
import { BtnSubmit, TextDt, TextEn, DropdownEn } from "@/components/Form";
import { formatedDate } from "@/lib/utils";
import LoadingDot from "@/components/LoadingDot";




const Edit = ({ message, id }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [poster, setPoster] = useState('');
    const [detail, setDetail] = useState('');
    const [ref, setRef] = useState('');
    const [dt, setDt] = useState('');
    const [cat, setCat] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [show, setShow] = useState(false);


    const [waitPage, setWaitPage] = useState(false);



    const showEditForm = async () => {
        message("Ready to edit");
        setShow(true);
        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/news/${id}`;
            const requestOptions = { method: "GET" };
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                const json = await response.json();
                console.log(json)
                const { title, url, poster, detail, ref, dt, cat, createdAt } = json;
                setTitle(title);
                setUrl(url);
                setPoster(poster);
                setDetail(detail);
                setRef(ref);
                setDt(formatedDate(dt));
                setCat(cat);
                setCreatedAt(createdAt);
            } else {
                throw new Error("Failed to create customer");
            }

        } catch (err) {
            console.log(err);
        }
    };


    const closeEditForm = () => {
        setShow(false);
    };


    const createObject = () => {
        return {
            title: title,
            url: url,
            poster: poster,
            detail: detail,
            ref: ref,
            dt: dt,
            cat: cat,
            createdAt: createdAt
        }
    }


    const updateHandler = async (e) => {
        e.preventDefault();
        setWaitPage(true);
        try {
            const newObject = createObject();

            const apiUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/news/${id}`;
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            };

            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                const json = await response.json();
                console.log(json.message)
                message(json.message);
            } else {
                throw new Error("Failed to create customer");
            }
        } catch (error) {
            console.error("Error updating news data:", error);
            message("Error updating news data.");
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
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-4 pb-6 text-black">
                            <form onSubmit={updateHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextEn Title="Title" Id="title" Change={e => setTitle(e.target.value)} Value={title} Chr={250} />
                                    <TextEn Title="Url" Id="url" Change={e => setUrl(e.target.value)} Value={url} Chr={250} />
                                    <TextEn Title="Poster" Id="poster" Change={e => setPoster(e.target.value)} Value={poster} Chr={250} />
                                    <TextEn Title="Detail" Id="detail" Change={e => setDetail(e.target.value)} Value={detail} Chr={121} />
                                    <TextEn Title="Ref" Id="ref" Change={e => setRef(e.target.value)} Value={ref} Chr={150} />
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <DropdownEn Title="Category" Id="cat" Change={e => setCat(e.target.value)} Value={cat}>
                                        <option value="politics">Politics</option>
                                        <option value="business">Business</option>
                                        <option value="entertainment">Entertainment</option>
                                        <option value="sports">Sports</option>
                                        <option value="science">Science</option>
                                    </DropdownEn>
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;

