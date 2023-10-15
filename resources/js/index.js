
let baseurl=`https://api.rss2json.com/v1/api.json?rss_url=`;
 
async function fetchData(index)
{
  let response=await fetch(`${baseurl}${magazines[index]}`);
  let json=await response.json();
  return json;
}

const mainFunction = async() => {

  const ans = [];
  for(let i = 0; i < magazines.length; i++) {
    console.log(magazines[i]);
    let res = await fetchData(i);
    ans.push(res);
  }
  console.log(ans);
  for(let i = 0; i < ans.length; i++) {

    let newsArticle = ans[i];
    const newsItems = newsArticle.items;
    console.log(newsItems);

    const newsContainer = document.getElementById(`news-article-${i}`);
    newsContainer.innerHTML = getCarousel();

    const carouselItemsParent = document.getElementById(`carousel${i}-items-parent`);
    addCarouselContent(carouselItemsParent, newsItems);

    function addCarouselContent(carouselItemsParent, newsItems) {
      newsItems.forEach((itemObj, index) => {
        console.log(itemObj.enclosure.link)
        const imageDiv = document.createElement("div");
        index === 0
          ? imageDiv.classList.add("active", "carousel-item")
          : imageDiv.classList.add("carousel-item");
        imageDiv.innerHTML = `<a href="${itemObj.link} style="text-decoration:none"><img src=${itemObj.enclosure.link} class="d-block w-100" style="object-fit:cover" alt="image not available" /></a>
                              <h5 class="card-title">${itemObj.title}</h5>
                              <h6 class"card-subtitle" style="font-size:14px; color:#586069">${itemObj.author} &#x2022; ${itemObj.pubDate}</h6>
                              <p class="card-text" style="font-size:16px; color:#292B2E">${itemObj.description}</p>
                              `;
        carouselItemsParent.append(imageDiv);
      });
    }

    function getCarousel() {
      return `
      <div id="carousel-${i}" class="carousel slide">
        <div class="carousel-inner" id="carousel${i}-items-parent">
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${i}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${i}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `;
    }  
  }
  
}
mainFunction();



  

  
/*  
  let res =[]
async function newsArticlesObj(magazines) {
  try {
    const fetchPromises = magazines.map(async (link) => {
      const fetchAPI = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${link}`);
      res.push(fetchAPI.json())
      return fetchAPI.json();
    });
    /* forEach can cause issues because it does not work well with asynchronous operations. 
    The forEach loop will not wait for the fetch calls to complete before moving on to the next 
    iteration. This means that console.log(objArray.length) may not give you the correct count 
    of fetched items, and you may get an empty array in the ans variable. Since the fetch calls 
    are asynchronous, the function may return objArray before any data has been pushed into it, 
    leading to an empty array being returned. To fix these issues, you can use map with Promise.all
    to ensure that all fetch operations complete before processing the data and returning the result.*/
/*
    const objArray = await Promise.all(fetchPromises);
    console.log(objArray.length);
    return objArray;

  } catch (error) {
    console.error(error);
    return null;
  }
}
console.log(newsArticlesObj(magazines));
let ans;
ans = newsArticlesObj(magazines)
  .then((data) => {
    console.log(data);
    return data
  })

 const printLinks = async() => {
  const obj = await ans;
  return obj;
}
console.log(printLinks());

*/
