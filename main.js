let characters = [];


const render = () => {
    let disneyHTML = '';

    characters.map((character) => {
        return disneyHTML += `<div class="contents row">
          <div class="col-lg-2">
            <img
              class="img-size"
              src="${character.imageUrl==null || character.imageUrl==''?'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg':character.imageUrl}"
              alt=""
            />
          </div>
          <div class="inform col-lg-10">
            <h2>Name: ${character.name}</h2>
            <p>TV-Shows<i class="fa-solid fa-tv"></i>: ${character.tvShows==''?'No TV shows':character.tvShows}</p>
            <p>
              Films<i class="fa-solid fa-photo-film"></i>: ${character.films==''?'No Films':character.films}
            </p>
            <p>
              Videogames<i class="fa-solid fa-film"></i>: ${character.videoGames==''?'No Video Games':character.videoGames}
            </p>
          </div>
        </div>`;
    }).join('');
    
    document.querySelector('.render-disney').innerHTML = disneyHTML;
}

let currentPage = 1;
let totalPages = 0;
let url;

const getDisney = async () => {
    let response = await fetch(url);
    let dataSet = await response.json();
    console.log('dataSet', dataSet);
  
    characters = dataSet.data;
    totalPages = dataSet.totalPages;
   
    console.log(characters);
    console.log('total page',totalPages); 
    render();
    pagenation();
};


const callAPI = () => {
    url = new URL(`https://api.disneyapi.dev/characters`);
    console.log(url);
    getDisney();
};

callAPI();

const pagenation = () => {
  let pagenationHTML = '';

    
  let pageGroup = Math.ceil(currentPage/5);
    
  let lastNumber = pageGroup * 5;

  let firstNumber = lastNumber - 4;
  
  // lastNumber이 150 이고 totalPages가 149일때 pagination 마지막 페이지가 150이라고 뜨고 거기에는 아무 내용도 없기때문에 이 if문을 쓴다...!
  if (lastNumber > totalPages) {
    lastNumber = totalPages;
  }
  
  if (firstNumber >= 6) {
    pagenationHTML = `<li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onclick='moveToPage(1)'>
        <span aria-hidden="true">&lt;&lt;&lt;</span>
      </a>
    </li>
         <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onclick='moveToPage(${lastNumber - 9})'>
        <span aria-hidden="true">&lt;&lt;</span>
      </a>
    </li>
        <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onclick='moveToPage(${currentPage - 1})'>
        <span aria-hidden="true">&lt;</span>
      </a>
    </li>`;
    }

  for(let i = firstNumber; i <= lastNumber; i++){
      pagenationHTML += `<li class="page-item ${currentPage==i?"active":""}"><a class="page-link" href="#" onclick='moveToPage(${i})'>${i}</a></li>`;
  }

  if (lastNumber < totalPages) {
        pagenationHTML += `<li class="page-item">
      <a class="page-link" href="#" aria-label="Next" onclick='moveToPage(${currentPage + 1})'>
        <span aria-hidden="true">&gt;</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" onclick='moveToPage(${firstNumber + 5})'>
        <span aria-hidden="true">&gt;&gt;</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" onclick='moveToPage(${totalPages})'>
        <span aria-hidden="true">&gt;&gt;&gt;</span>
      </a>
    </li>`;
    }

  document.querySelector('.pagination').innerHTML = pagenationHTML;
}

const moveToPage = (pageNum) => {
  currentPage = pageNum;
  console.log(currentPage);
  // 여기서 let url로 설정한거때문에 페이지 렌더링이 안됬던거임 시발
  url = new URL(`https://api.disneyapi.dev/characters?page=${pageNum}`);
  console.log(url);
  getDisney();

}


