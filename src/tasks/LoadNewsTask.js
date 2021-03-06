import NewsItem from "../entities/NewsItem";

class LoadNewsTask{
    setNews = null;
    news = [[],[]];
    rssURLs = ["https://www.tagesschau.de/xml/rss2/", "https://www.politico.eu/feed/"];
    linkTexts = ["[Mehr]", "[More]"];
    titles = [];
    articleLinks = [];

    async load  (setNews)   {
        this.setNews = setNews;
        for (let i = 0; i < this.rssURLs.length; i++){
            this.titles = [];
            this.articleLinks = [];
            try{
                await fetch(this.rssURLs[i])
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    const items = data.querySelectorAll("item");
                    var counter = 0;
                    items.forEach(item => {
                        if (counter === 3){
                            return;
                        }
                        if(item.innerHTML.toLowerCase().includes("corona") || item.innerHTML.toLowerCase().includes("covid") || item.innerHTML.toLowerCase().includes("lockdown")){
                            const date = new Date(item.querySelector("pubDate").innerHTML);
                            this.titles.push(date.toLocaleString() + " - " + item.querySelector("title").innerHTML);
                            this.articleLinks.push(item.querySelector("link").innerHTML);
                            counter+=1;
                        }
                    })
                })
                this.news[i] = new NewsItem(this.linkTexts[i], this.titles, this.articleLinks)
            }
            catch{
                for(let j=0;j<3;j++){
                    this.news[i] = new NewsItem([undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]);
                }
            }
        }
        this.setNews(this.news);
    };
}

export default LoadNewsTask;