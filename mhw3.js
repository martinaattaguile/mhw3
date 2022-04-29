
  const simbolo_spotify = document.querySelector('.spotify');    
  simbolo_spotify.addEventListener('click', clickOnSpotify);                 

  function clickOnSpotify(event) {
    window.open("https://open.spotify.com/artist/715gea5W9B0Wt27UTfOTiJ#login",'width=600,height=500,left=0,top=0').creator;
    event.preventDefault();
  }
 
  const client_id = '02708fc277ce4b3d9d4dca259adfcb90';
  const client_secret = '6d96f1aaf4cf451fb3951522982fb95e';
  let token;
  const form = document.querySelector('form');
  form.addEventListener('submit', Cerca);
  const testo = document.querySelector('#testo');
  const botton = testo.querySelector('#submit');
  botton.addEventListener('click', text);
  
  
  function onResponse(response) {
     console.log('Risposta ricevuta');
      return response.json();
    }
  
    function onJson(json) {
      console.log('JSON ricevuto'); 
      const library = document.querySelector('#album_view');
      library.innerHTML = '';
      const results = json.albums.items;
      let num_results = results.length;
      if(num_results > 6)
        num_results = 6;
      for(let i=0; i<num_results; i++)
      {
        
        const lista = results[i]
        const titolo = lista.name;
        const selected_image = lista.images[0].url;
        const album = document.createElement('div');
        album.classList.add('stile');
        const img = document.createElement('img');
        img.src = selected_image;
        const caption = document.createElement('p');
        const link= document.createElement('a');
        link.setAttribute('href', lista.external_urls.spotify);
        link.textContent = titolo;
  
        album.appendChild(img);
        album.appendChild(caption);
        album.appendChild(link);
        library.appendChild(album);
    
      }
    } 
  
  
  function Cerca(event){
      event.preventDefault();
      const audio = document.querySelector('#album');
      const audio_value = encodeURIComponent(audio.value);
      console.log('Eseguo ricerca: ' + audio_value);
      console.log(audio.value);
      console.log(audio_value);
  
      fetch("https://api.spotify.com/v1/search?type=album&q=" + audio_value,
        {
          headers:
          {
            'Authorization': 'Bearer ' + token
          }
        }
      ).then(onResponse).then(onJson);
    }
  
    function onTokenJson(json){
     console.log(json)
      token = json.access_token;
    }
    function onTokenResponse(response){
      return response.json();
    }
    fetch("https://accounts.spotify.com/api/token",
    {
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
  ).then(onTokenResponse).then(onTokenJson);

function text(event){
  event.preventDefault();
  const artista = testo.querySelector('#nome_artista');
  const brano = testo.querySelector('#nome_brano');
  const url = "https://api.lyrics.ovh/v1/"
  if(artista.value === "" || brano.value === ""){
    alert("Entrambi i campi devono essere compilati.")
  }else{
    fetch(url + artista.value + "/" + brano.value).then(onResponseCatch).then(onJsonDue);
  }
}

function onResponseCatch(response){
  return response.json();
}

function onJsonDue(json){
  const artista = testo.querySelector('#nome_artista');
  const text_song = testo.querySelector('#text');
  if(json.error === "Nessun testo trovato"){
    alert("Non è stato trovato alcun brano di " + artista.value);
  }else{
    text_song.innerHTML = "";
    text_song.innerHTML = json.lyrics;
  }
}