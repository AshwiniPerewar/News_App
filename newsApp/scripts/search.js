// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
import {navbar} from "../components/navbar.js";

document.querySelector("#navbar").innerHTML=navbar();


let query=localStorage.getItem("news");

let search1=async(query)=>
{
    let res=await fetch(`https://masai-mock-api.herokuapp.com/news?q=${query}`);
    
    let data=await res.json();
    console.log(data.articles);
    append(data.articles);
}
search1(query);
       
let search=async(e)=>
{
    try{
    if(e.key=="Enter")
    {
        let query=document.querySelector("#search_input").value;
        console.log(query);
    let res=await fetch(`https://masai-mock-api.herokuapp.com/news?q=${query}`);
    
    let data=await res.json();
    console.log(data.articles);
    append(data.articles);
    }
}
catch(err)
{
    console.log(err);
}
}


let append=(data)=>
{
    document.querySelector("#results").innerHTML=null;
    data.forEach(({urlToImage,title,description})=>
    {
        let box=document.createElement("div");
        let image=document.createElement("img");
        let box1=document.createElement("div");
        let heading=document.createElement("h3");
        let info=document.createElement("p");

        box.setAttribute("class","news")
        box1.setAttribute("class","box1");
        image.src=urlToImage;
        heading.innerText=title;
        info.innerText=description;
        box1.append(heading,info);
        box.append(image,box1);

        document.querySelector("#results").append(box);

        let newsData={
            image:urlToImage,
            heading:title,
            description:description,
        }
        box.addEventListener("click",function(){
            localStorage.setItem("newsData",JSON.stringify(newsData));
            window.location.href="news.html";
        });


    })
}

document.querySelector("#search_input").addEventListener("keydown",search);

