// Ude Import export (MANDATORY)
import {navbar} from "../components/navbar.js";

document.querySelector("#navbar").innerHTML=navbar();

let data=JSON.parse(localStorage.getItem("newsData"));

let append=(data)=>
{
    document.querySelector("#detailed_news").innerHTML=null;
    let box=document.createElement("div");
        let image=document.createElement("img");
        let box1=document.createElement("div");
        let heading=document.createElement("h3");
        let info=document.createElement("p");

        box1.setAttribute("class","box1");
        image.src=data.image;
        heading.innerText=data.heading;
        info.innerText=data.description;
        box1.append(heading,info);
        box.append(image,box1);

        document.querySelector("#detailed_news").append(box);

        

    
}

append(data);


let navigate=(e)=>
{
    if(e.key=="Enter")
    {
    let query=document.querySelector("#search_input").value;
    localStorage.setItem("news",query);
    window.location.href="./search.html";
    }
    
}

document.querySelector("#search_input").addEventListener("keydown",navigate);