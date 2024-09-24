let onOff = false;
//FUNCTION FOR PLAYING THE SONG
function playFunction(){
  if(onOff){
    playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    track.pause();
  }else{
    playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    track.play();
  }
  onOff = !onOff;
}

//FUNCTION TO SWITCH TO THE NEXT SONG
function nextFunction(){
  if(currentNode.next !== null){
    nextButton.disabled = true;

    currPic.style.animation = "curr-forward-change .4s ease-in-out forwards";
    nextPic.style.animation = "next-forward-change .4s ease-in-out forwards";
    prevPic.style.animation = "prev-forward-change .4s ease-in-out forwards";
    nextNextPic.style.animation = "next-next-pic-change .4s ease-in-out forwards";

    if(currentNode.next.next === null){
      newSongButton.style.animation = 'new-song-button-change .4s ease-in-out forwards';
    }
    
    setTimeout(() => {
      nextButton.disabled = false;
      currentNode = currentNode.next;
      updateTrack();
      resetAnimations();
    }, 400);
  }
}

//FUNCTION TO GO BACK TO THE PREVIOUS SONG
function prevFunction(){
  if(currentNode.prev !== null){
    prevButton.disabled = true;

    currPic.style.animation = "curr-back-change .4s ease-in-out forwards";
    nextPic.style.animation = "next-back-change .4s ease-in-out forwards";
    prevPic.style.animation = "prev-back-change .4s ease-in-out forwards";
    prevPrevPic.style.animation = "prev-prev-pic-change .4s ease-in-out forwards";

    if (currentNode.next === null) {
      newSongButton.style.animation = 'new-song-button-back .4s ease-in-out forwards';
    }

    setTimeout(() => {
      prevButton.disabled = false;
      currentNode = currentNode.prev;
      updateTrack();
      resetAnimations();
    }, 400);
  }
}

//RESETTING PICTURE ANIMATION AFTER SONGS CHANGE
function resetAnimations(){
  currPic.style.animation = "";
  nextPic.style.animation = "";
  prevPic.style.animation = "";
  nextNextPic.style.animation = "";
  prevPrevPic.style.animation = "";
}

//FORMAT DURATION TIME
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

//UPDATE THE TRACK
function updateTrack() {
  track.src = currentNode.data.audio;
  songName.innerText = currentNode.data.name;

  track.addEventListener('loadedmetadata', () => {
    slider.max = Math.floor(track.duration);
    totalTimeText.innerText = formatTime(track.duration);
  });

  track.addEventListener('timeupdate', () => {
    slider.value = Math.floor(track.currentTime);
    progressText.innerText = formatTime(track.currentTime);
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, rgb(60, 8, 95) ${value}%, #ddd ${value}%)`;
    if (track.currentTime >= track.duration) {
      nextFunction();
    }
  });

  slider.addEventListener('input', () => {
    track.currentTime = slider.value;
    if (!track.paused) {
      isPlaying = true;
      track.pause();
    }
  });

  slider.addEventListener('change', function() {
    if (isPlaying) {
      track.play();
      isPlaying = false;
    }
  });

  changePicture(currentNode);

  if (onOff) {
    track.play();
  }
}

//CHANGE THE PICTURES
function changePicture(current) {
  if (!current) {
    console.log('No current node provided.');
    return;
  }  

  currPic.src = current.data.picture;
  console.log(currPic.src);

  if (current.prev === null) {
    prevPic.src = 'nullPic.png';
    console.log(prevPic.src);

  } else {
    prevPic.src = current.prev.data.picture;
  }
  
  if (current.prev == null || current.prev.prev === null){
    prevPrevPic.src = 'nullPic.png';
  } else {
    prevPrevPic.src = current.prev.prev.data.picture;
  }

  if (current.next === null) {
    nextPic.src = 'nullPic.png';
  } else {
    nextPic.src = current.next.data.picture;
  }
  
  if (current.next == null || current.next.next === null){
    nextNextPic.src = 'nullPic.png';
  } else {
    nextNextPic.src = current.next.next.data.picture;
  }
  
}

//ANIMATION OF FILE CHOOSER WINDOW
function fileChooser(){
  addNewSong.style.animation = 'add-screen-appear .4s ease-in-out forwards';  
}
function removeFileChooser(){
  addNewSong.style.animation = 'add-screen-disap .4s ease-in-out forwards';  
}

//ADDING NEW SONG FUNCTION
function addSong() {
  const songFile = audioChoose.files[0];
  const imageFile = picChoose.files[0];
  const songName = nameChoose.value;

  if (songFile && imageFile && songName) {
    const songFileURL = URL.createObjectURL(songFile);
    const imageFileURL = URL.createObjectURL(imageFile);

    const newSong = new Song(songFileURL, imageFileURL, songName);
    dll.append(newSong);
    addNewSong.style.animation = 'add-screen-disap .4s ease-in-out forwards';  
    nextFunction();
  } else {
    alert('Please fill all fields (song, image, name)');
  }
}

//BUTTON EVENT LISTENERS
playButton.addEventListener('click', playFunction);
nextButton.addEventListener('click', nextFunction);
prevButton.addEventListener('click', prevFunction);
newSongButton.addEventListener('click',fileChooser);
songSubmitButton.addEventListener('click',addSong);
cancelButton.addEventListener('click', removeFileChooser);

//KEYS FUNCTIONALITY
document.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    event.preventDefault();
    playFunction();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    prevFunction();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    nextFunction();
  }
});

updateTrack();

