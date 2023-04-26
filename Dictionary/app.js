let input=document.getElementById('input');
let searchBtn=document.getElementById('search');
let notFound=document.querySelector('.not_found');
let defBox=document.querySelector('.def');

//Reset button

const reset=()=>{
    input.value="";
    defBox.style.display="none";
    notFound.style.display = "none";
    return;
}

searchBtn.addEventListener('click',(e)=>{
   e.preventDefault();
   //Get input data
   let word=input.value;
   if(word==""){
     alert('Ooo Satvi fail , Word to daal !!')
     return;
   }

   getData(word);
});

   const getData=async(word)=>{
    
    notFound.innerText="";
    notFound.style.display='none';
    const response = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=5eaeddf3-a682-43a5-a896-76e24db278b4`
    ); 
    const data=await response.json();

    //if no result
    if(!data.length){
        notFound.innerText='Not Found';
    }

    //if result is suggestion

    if(typeof data[0]== 'string'){
        let heading=document.createElement('h3');
        notFound.style.display='block';
        heading.innerText='Did you mean?';
        notFound.appendChild(heading);
        data.forEach(element=>{
            let suggestion=document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText=element;
            notFound.appendChild(suggestion);
        })
        return;
    }

    //Result showing

    let definition=data[0].shortdef[0];
    defBox.style.display="block";
    defBox.innerText=`Meaning of the word:  `+definition;
    console.log(data);
}
