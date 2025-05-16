"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function Home() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('https://apipark.vercel.app/api/news');
      const json = await response.json();
      console.log(json);
      setDatas(json);
    }
    load();

  }, [])

  const myFunction = () => {
    const x = list.map(item => (item.description === "" ? item.url : null));
    const filterItem = x.filter(item => item);
    console.log(filterItem);
  }



  return (
    <div className="p-6">
      <button onClick={myFunction} className="px-4 py-1.5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-2 ring-offset-2 ring-blue-400 rounded-md duration-300 cursor-pointer">Click Me</button>
      <div className="w-full p-4 grid grid-cols-5 gap-4">
        {datas.length ? datas.map((item, i) => {
          return (
            <div className="w-full" key={i}>

              <a href={item.url} target="_blank" >
                <h1 className="w-full font-bold">{item.title}</h1>
                <img src={item.poster} alt="poster" className="w-full h-auto" />
              </a>
              <p className="text-sm">{item.detail}</p>
              <p className="text-sm">{item.cat}</p>
              <p className="text-xs">{item.dt} - {item.ref}</p>
            </div>
          )
        }) : null}
      </div>

    </div>
  );
}
