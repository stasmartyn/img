import render from 'posthtml-render';
import './sass/main.scss';
import  template from './template/list.hbs';
const inputSerch=document.getElementById('inputSerch');
const gallery=document.getElementsByClassName('gallery')[0];
inputSerch.addEventListener('input', startSearch);
let pageNumber=1;
const button=document.getElementById('loadMoreBtn');
button.addEventListener('click',loadMore);
// let objectserch=inputSerch.value;
const APIKey='23158151-0736cf2b52eec953355b0c3a8';

function startSearch(){
     pageNumber=1;
     gallery.innerHTML='';
  loadData();
}
function onError(message){
    console.log('error');
}
function renderCard(data){
    const markup=template(data.hits);
    gallery.insertAdjacentHTML('beforeend',markup);
   
      
}    
function onSuccess(data,scrollFunc){
    renderCard(data);
    if(scrollFunc){
        scrollFunc();
    }
}
function loadData(scrollFunc){
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputSerch.value}&page=${pageNumber}&per_page=12&key=${APIKey}`)
    .then((response)=>{return response.json();})
    .then((response)=>onSuccess(response,scrollFunc))
    .catch(onError)
    
}
function loadMore(){
pageNumber++;
loadData(scroll);

}

function scroll(){
    setTimeout(function(){
        button.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
    },100);
    
}