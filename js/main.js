var teamname = document.querySelector('#teamname');
var articles = document.querySelector("#articles");
var options = document.querySelector("#options");

options.addEventListener('click', (e) => {
    if (e.target.classList.contains("dropdown-item")) {
        getarticles(e.target.innerHTML)
    }
})
var newreq = new XMLHttpRequest()   
function getarticles(car) {
    newreq.open("GET", `https://newsapi.org/v2/everything?q=${car}&from=2025-04-07&sortBy=publishedAt&apiKey=74b23d710781426dbfc841b8fd5199cf`)
    newreq.send()
    newreq.addEventListener("readystatechange", () => {
        if (newreq.readyState === 4) {
            displayarticles(JSON.parse(newreq.response).articles.slice(0, 10))
            teamname.innerHTML = car;
            document.title = `${car} News`
            localStorage.setItem('team',car)
        }
    })
}
function displayarticles(news) {
    var str = ``
    for (var i = 0; i < news.length; i++){
        str += `<div class="col-lg-6">
        <div class="card mb-3 h-100">
  <img src="${news[i].urlToImage ?? './images/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'}" class="card-img-top" alt="...">
  <div class="card-body flex flex-column align-content-end">
    <h5 class="card-title">Author : ${news[i].author ?? 'Known'}</h5>
    <p class="card-text text-primary opacity-50">${news[i].title}</p>
    <p class="card-text">${news[i].content}</p>
    <p class="card-text"><small class="text-body-secondary">${news[i].publishedAt}</small></p>
    <a href="${news[i].url}" class=" bg-primary w-100 d-block py-2  text-center rounded-3  text-decoration-none text-white fw-bold txt-xl">More Detials</a>
  </div>
</div>
</div>`
    }
    articles.innerHTML = str
}
if (localStorage.getItem("team")) {
    getarticles(localStorage.getItem("team"))
} else {
    getarticles("real")
}
 
