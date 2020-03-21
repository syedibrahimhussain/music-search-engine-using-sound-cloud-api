//getvalue is a function to get the users input ,when user clicks the search icon using mouse 

function getValue(){
document.querySelector(".js-submit").addEventListener('click',function(){
	var input = document.querySelector('input').value;
	console.log(input);
	SoundCloudApi.gettrack(input);
	})
}

// // get value1 is a function to get the users input ,when user presses the enter button to search
function getValue1(){
document.querySelector(".js-search").addEventListener('keyup',function(e){
	var input = document.querySelector('input').value;
	
	if(e.which==13){
		console.log(input);
		SoundCloudApi.gettrack(input);
	}
	}	)
}

//soundCloudApi is an object
SoundCloudApi = {}

//soundCloudApi.init funtion is used to initialise  the  Api usig users key
SoundCloudApi.init = function() {
	//query soundcloud API
	SC.initialize({
  client_id: '___users key___'//please read soundcloud Api documentation to generate the users key 
});
}
SoundCloudApi.init(); 
getValue();
getValue1();  


//SoundCloudApi.gettrack function searches for the inputValue
SoundCloudApi.gettrack = function(inputValue){
	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', {
  	q: inputValue
	}).then(function(tracks) {
  	console.log(tracks);
  	SoundCloudApi.renderTracks(tracks);
	});
}


//sound.renderTracks will create a card for every music

SoundCloudApi.renderTracks = function(tracks){

	tracks.forEach(function(track){
			//console.log(track);

		var card = document.createElement('div');
		card.classList.add("card");

		var imageDiv = document.createElement('div');
		imageDiv.classList.add("image");

		var image_img = document.createElement('img');
		image_img.classList.add("image_img");
		image_img.src = track.artwork_url || 'https://picsum.photos/seed/picsum/200/300';

		imageDiv.appendChild(image_img);

		var content = document.createElement('div');
		content.classList.add("content");

		var header = document.createElement('div');
		header.classList.add("header");
		header.innerHTML='<a href ="'+track.permalink_url +'"target = "_blank">'+track.title+'</a>';

		var button = document.createElement('div');
		button.classList.add('ui' , 'bottom' , 'attached' , 'button' , 'js-button');

		var icon = document.createElement('i');
		icon.classList.add('add','icon');
		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add To Playlist';

		button.addEventListener('click',function(){
			SoundCloudApi.getEmbeded(track.permalink_url);
		})
		//apendChild

		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);

		var   searchResults = document.querySelector(".js-search-results");
		searchResults.appendChild(card);
	})

}

//soundCloudApi.getEmbeded  maintains the stack of  the music 
SoundCloudApi.getEmbeded = function(trackurl){
	console.log("in get getEmbeded");
	SC.oEmbed(trackurl, {
  	auto_play: true
	}).then(function(embed){
  	console.log('oEmbed response: ', embed);
  	var sideBar = document.querySelector('.js-playlist');

  	var box = document.createElement('div');
  	box.innerHTML = embed.html;
  	sideBar.insertBefore(box,sideBar.firstChild);
  	localStorage.setItem("key", sideBar.innerHTML);

	});
}

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");