const apiKey = "4b7b92fa4d704939965316232ca169c5";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', async() => {
    await fetchNews("India");
    document.getElementById('preloader').style.display = 'none';
});

document.querySelector('.logo').addEventListener('click', ()=>{
    window.location.reload();
})

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    
    const cardsContainer = document.getElementById('container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";
     
    articles.forEach(article => {
        if(!article.urlToImage) return;
        
        const cardClone = newsCardTemplate.content.cloneNode(true);
        
        fillDataInCard(cardClone, article);

        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#card-img');
    const newsTitle = cardClone.querySelector('.heading');
    const newsSource = cardClone.querySelector('.date');
    const newsDesc = cardClone.querySelector('.description');
    const date = new Date(article.publishedAt).toLocaleString('en-US',{timeZone:'Asia/Jakarta'});

    newsImg.src = article.urlToImage;
    newsTitle.textContent = article.title;
    newsSource.textContent = `${article.source.name} - ${date}`;
    newsDesc.textContent = article.description;

    
    cardClone.firstElementChild.addEventListener('click', () => {
        setTimeout(() => {
            window.open(article.url, '_blank');
        }, 100);
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')
    searchBox.value = '';
}

const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');

searchBtn.addEventListener('click', ()=>{
    const query = searchBox.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav= null;
})

searchBox.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        const query = searchBox.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove('active');
        curSelectedNav= null;
    }} 
)
