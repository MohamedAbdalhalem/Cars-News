var teamname = document.querySelector('#teamname');
var articles = document.querySelector("#articles");
var options = document.querySelector("#options");
// handle the slider
var openCLoseIcon = document.querySelector("#open")
var heeader = document.querySelector("#header")
var slider = document.querySelector(".slider")
openCLoseIcon.addEventListener("click", () => {
    if (heeader.classList.contains("d-none")) {
        slider.style.width = "60%"
        slider.classList.add("bg-white")
        slider.classList.remove("bg-transparent")
        heeader.classList.add("d-block")
        heeader.classList.remove("d-none")
        options.classList.add("d-block")
        options.classList.remove("d-none")
    } else {
        slider.style.width = "auto"        
        slider.classList.add("bg-transparent")
        slider.classList.remove("bg-white")
        heeader.classList.add("d-none")
        heeader.classList.remove("d-block")        
        options.classList.add("d-none")
        options.classList.remove("d-block")
    }
})
// handle change the type of the car
options.addEventListener('click', (e) => {
    if (e.target.classList.contains("dropdown-item")) {
      getarticles(e.target.innerHTML)
      if (heeader.classList.contains("d-block")) {
        slider.style.width = "auto"        
        slider.classList.add("bg-transparent")
        slider.classList.remove("bg-white")
        heeader.classList.add("d-none")
        heeader.classList.remove("d-block")        
        options.classList.add("d-none")
        options.classList.remove("d-block")
      }
  }
        
})
// initilize request
var newreq = new XMLHttpRequest()   
function getarticles(car) {
    newreq.open("GET", `https://gnews.io/api/v4/search?q=${car}&apikey=92e2d6c88818ed54770eaf20cd6e1664`)
  newreq.send()
  
     newreq.addEventListener("loadstart", () => {
            articles.innerHTML = `
            <div class="col-lg-6">
                            <div class="card" aria-hidden="true">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                  <h5 class="card-title placeholder-glow">
                                   <span class="placeholder col-6"></span>
                                  </h5>
                                  <p class="card-text placeholder-glow">
                                    <span class="placeholder col-7"></span>
                                    <span class="placeholder col-4"></span>
                                    <span class="placeholder col-4"></span>
                                    <span class="placeholder col-6"></span>
                                    <span class="placeholder col-8"></span>
                                  </p>
                                  <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                                </div>
                              </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card" aria-hidden="true">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                  <h5 class="card-title placeholder-glow">
                                    <span class="placeholder col-6"></span>
                                  </h5>
                                  <p class="card-text placeholder-glow">
                                    <span class="placeholder col-7"></span>
                                    <span class="placeholder col-4"></span>
                                    <span class="placeholder col-4"></span>
                                    <span class="placeholder col-6"></span>
                                    <span class="placeholder col-8"></span>
                                  </p>
                                  <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                                </div>
                              </div>
                        </div>
            `
    })
    newreq.addEventListener("loadend", () => {
        if (newreq.status >= 200  && newreq.status < 300) {
            displayarticles(JSON.parse(newreq.response).articles)
            teamname.innerHTML = car + " News <i class='fa-solid fa-car-on'></i>";
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
    <a href="${news[i].url}" class=" bg-primary w-100 d-block py-2  text-center rounded-3  text-decoration-none text-white fw-bold txt-xl">More Detials <i class="fa-brands fa-searchengin"></i></a>
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