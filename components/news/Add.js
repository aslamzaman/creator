import React, { useState } from "react";
import { TextEn, BtnSubmit, TextDt } from "@/components/Form";
import { addDataToFirebase } from "@/lib/firebaseFunction";
import LoadingDot from "../LoadingDot";
import { formatedDate } from "@/lib/utils";

const Add = ({ message }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [poster, setPoster] = useState('');
    const [ref, setRef] = useState('');
    const [date, setDate] = useState('');    

    const [show, setShow] = useState(false);
    const [busy, setBusy] = useState(false);

    const showAddForm = () => {
        setShow(true);
        resetVariables();
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const resetVariables = () => {
       setTitle('');
       setUrl('');
       setPoster('');
       setRef('');
       setDate(formatedDate(new Date()));
    }


    const createObject = () => {
        return {
              title: title,
              url: url,
              poster: poster,
              ref: ref,
              date: date,
              createdAt: new Date().toISOString()
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            setBusy(true);
            const newObject = createObject();
            const msg = await addDataToFirebase("news", newObject);
            message(msg);
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
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 pb-6 border-0 text-black">
                            <div className="w-full overflow-auto">
                                <div className="p-4">
                                    <form onSubmit={saveHandler}>
                                        <div className="grid grid-cols-1 gap-4">
                                            <TextEn Title="Title" Id="title" Change={e => setTitle(e.target.value)} Value={title} Chr={250} />
                                            <TextEn Title="Url" Id="url" Change={e => setUrl(e.target.value)} Value={url} Chr={250} />
                                            <TextEn Title="Poster" Id="poster" Change={e => setPoster(e.target.value)} Value={poster} Chr={250} />
                                            <TextEn Title="Ref" Id="ref" Change={e => setRef(e.target.value)} Value={ref} Chr={250} />
                                            <TextDt Title="Date" Id="date" Change={e => setDate(e.target.value)} Value={date} />                                    
                                        </div>
                                        <div className="w-full mt-4 flex justify-start pointer-events-auto">
                                            <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                            <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                        </div>
                                    </form>
                                </div>
                            </div>
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
  
