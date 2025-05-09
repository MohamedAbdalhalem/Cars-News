var teamname = document.querySelector('#teamname');
var articles = document.querySelector("#articles");
var options = document.querySelector("#options");


options.addEventListener('click', (e) => {
    if (e.target.classList.contains("dropdown-item")) {
        getarticles(e.target.innerHTML)
    }
})
// initilize request
var newreq = new XMLHttpRequest()   
function getarticles(car) {
    newreq.open("GET", `https://gnews.io/api/v4/search?q=${car}&apikey=d562e9cbf06acdbc6b1df81809bf8d33`)
    newreq.send()
    newreq.addEventListener("readystatechange", () => {
        if (newreq.readyState === 4) {
            displayarticles(JSON.parse(newreq.response).articles)
            teamname.innerHTML = car;
            document.title = `${car} News`
            localStorage.setItem('car',car)
        }
    })
}
// function to display the data
function displayarticles(news) {
    var str = ``
    for (var i = 0; i < news.length; i++){
        str += `<div class="col-lg-6">
        <div class="card mb-3 h-100">
  <img src="${news[i].image ?? './images/1000_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'}" class="card-img-top" alt="...">
  <div class="card-body flex flex-column align-content-end">
    <h5 class="card-title">Author : ${news[i].source.name ?? 'Known'}</h5>
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

if (localStorage.getItem("car")) {
    getarticles(localStorage.getItem("car"))
} else {
    getarticles("BMW")
}