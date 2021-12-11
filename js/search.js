const searchSection = document.querySelector('#search-section');
const form = document.querySelector('form');
const addedForm = document.querySelector('.addedForm');
const addButton = document.querySelector('.addButton');
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
        // console.log(cards);
        let alt = false;
        cards.map(card => {
            const tempCard = showCard(card, alt);
            alt = !alt;
            // console.log(alt);
            searchResultsSection.innerHTML += tempCard;
        });
    });
    
    // console.log(filter, searchedItem);
    event.preventDefault();
    event.stopPropagation();
    form.reset();
}, true);


addButton.addEventListener('click', e => {
  openForm();
});


function openForm() {
  document.getElementById("addedFormContainer").style.display = "block";
}

function closeForm() {
  document.getElementById("addedFormContainer").style.display = "none";
}

addedForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(addedForm);
  const title = data.get('title');
  const subtitle = data.get('subtitle');
  const filter = data.get('filter');
  const ann = {
    'title' : title,
    'description' : subtitle,
    tags: [
      "arduino",
      "catia"
    ],
    author: "niko micheal",
    date: "30/10/2021",
    backgroundImage: 'https://images.unsplash.com/photo-1639196933420-0fad4a755157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
  }

  searchData[filter] = [ann, ...searchData[filter]];
  closeForm();
})

