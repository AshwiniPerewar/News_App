// Ude Import export (MANDATORY)
// Onclicking store the news in local storage with key "news" so that you can access that on news.html page
// https://masai-mock-api.herokuapp.com/news/top-headlines?country=
import {navbar,sidebar} from "../components/navbar.js";

document.querySelector("#navbar").innerHTML=navbar();

document.querySelector("#sidebar").innerHTML=sidebar();



let country=document.querySelector("#sidebar").children;



let countryNews=async(id)=>
{
    try{
    let res=await fetch(`https://masai-mock-api.herokuapp.com/news/top-headlines?country=${id}`);
    
    let data=await res.json();
    console.log(data.articles);
    append(data.articles);
    
}
catch(err)
{
    console.log(err);
}
}

for(let el of country)
{
   el.addEventListener("click",csearch);
}

function csearch()
{
    console.log(this.id);
    countryNews(this.id);
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


let navigate=(e)=>
{
    if(e.key=="Enter")
    {
    let query=document.querySelector("#search_input").value;
    localStorage.setItem("news",query);
    window.location.href="search.html";
    }
    
}

document.querySelector("#search_input").addEventListener("keydown",navigate);