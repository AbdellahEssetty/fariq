const searchSection = document.querySelector('#search-section');
const form = document.querySelector('form');
const searchTerm = document.querySelector('.searchTerm');
const searchResultsSection = document.querySelector('.search-results')


// A helper function to display a single card.
const showCard = ({backgroundImage, author, date, tags, title, description}, alt=false) => (`
<div class="blog-card ${alt ? 'alt' : ''}">
            <div class="meta">
              <div class="photo" style="background-image: url(${backgroundImage})"></div>
              <ul class="details">
                <li class="author"><a href="#">${author}</a></li>
                <li class="date">${date}</li>
                <li class="tags">
                  <ul>
                    ${tags.map(tag => `<li><a>${tag}</a></li>`)}
                  </ul>
                </li>
              </ul>
            </div>
            <div class="description">
              <h1>${title}</h1>
              <h2>Opening a door to the future</h2>
              <p> ${ description ? description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit."}</p>
              <p class="read-more">
                <a href="#">Read More</a>
              </p>
            </div>
        </div>

`);

async function readCard() {
    return searchData;
};


form.addEventListener('submit', event => {
    const data = new FormData(form);
    const searchedItem = searchTerm.value;
    // searchResultsSection.innerHTML = '';
    searchResultsSection.innerHTML = `<h3>Results of ${searchedItem? searchedItem : 'all'}</h3>`

    for(let [key, item] of data){
        filter = item;
    }
    readCard()
    .then(unfilteredCards => {
        let cards = unfilteredCards[filter];

        cards = searchedItem ? cards.filter(card => {
            const tags = card.tags.map(tag => tag.toLowerCase());
            return tags.includes(searchedItem.toLowerCase())
        }) : cards;
        console.log(cards);
        let alt = false;
        cards.map(card => {
            const tempCard = showCard(card, alt);
            alt = !alt;
            console.log(alt);
            searchResultsSection.innerHTML += tempCard;
        });
    });
    
    console.log(filter, searchedItem);
    event.preventDefault();
    event.stopPropagation();
    form.reset();
}, true);



