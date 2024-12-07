/*
 * para daniela
 * 2024 remix
 * @author santuario
 * @date 2024/12/05
 */

// python3 -m http.server
// python3 -m http.server 8080


/*
 *****************************************
 *****************************************
 * VARIABLES
 *****************************************
 *****************************************
 */



// Font
let geoMidFont
let geoSmallFont;


let theta = 0.0; 
let marginText = 15.0; 

let storyFontSize = 16;
let nameSongFontSize = 14;
let nameSingerFontSize = 12;


// Declare variable to store audio player
let audioPlayer;
// Create an array to hold all audio players
let audioPlayers = [];
let supportPath = '/daniela-playlist';

/*
 *****************************************
 *****************************************
 * LYFE CYCLE METHODS
 *****************************************
 *****************************************
 */

function preload() {
  // Backgrund



  // Fonts
  geoMidFont = loadFont('assets/fonts/Geogtq-Md.otf');
  geoSmallFont = loadFont('assets/fonts/Geogtq-Ul.otf');

  // Load songs data
  // Load songs data using p5.js loadJSON
  songs = loadJSON('assets/songs.json');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight*5);
    

}

function setup() {
  createCanvas(windowWidth, windowHeight*5);
  initialize();


}

function draw() {
  

drawInterface();
}

/*
 *****************************************
 *****************************************
 * INITIALIZE METHODS
 *****************************************
 *****************************************
 */

function initialize() {
  initializeAudios();


}
function initializeAudios() {
  // Create all audio players at initialization
  songs.songs.forEach((song, index) => {
    let player = createAudio(supportPath + song.audioPath);
    player.showControls();
    
    // Add event listener for play event
    player.elt.addEventListener('play', () => {
      // Stop all other players
      audioPlayers.forEach((otherPlayer, otherIndex) => {
        if (otherIndex !== index) {
          otherPlayer.pause();
          // Reset time to beginning if desired
          otherPlayer.time(0);
        }
      });
    });
    
    audioPlayers.push(player);
  });
}

function drawInterface(){
  background(255);
  fill(0);
  
  // HEADER
  let headerString = 'notas para daniela'
  let currentHeight = 0;
  let textBoxMaxWidth = windowWidth - 2 * marginText
 
  noStroke();
  textFont(geoSmallFont);
  textSize(52);
  textAlign(CENTER, CENTER);
  text(headerString, windowWidth/2, windowHeight/3, windowWidth/2, windowHeight/3);

  currentHeight = windowHeight;

  // Make sure songs data is loaded
  if (songs && songs.songs) {
      // Draw all songs with their respective players
      songs.songs.forEach((song, index) => {
          // Story text
          textFont(geoSmallFont);
          textSize(storyFontSize);
          textWrap(WORD);
          textAlign(LEFT, LEFT);
          text(song.storyText, marginText, currentHeight, textBoxMaxWidth);
          const storyHeight = getWrappedTextHeight(song.storyText, textBoxMaxWidth);
          currentHeight += storyHeight;
          currentHeight += 20;

          // Song title
          textFont(geoMidFont);
          textSize(nameSongFontSize);
          text(song.songName, marginText, currentHeight, textBoxMaxWidth);
          const songStringTextHeight = getWrappedTextHeight(song.songName, textBoxMaxWidth);
          currentHeight += songStringTextHeight;

          // Singer name
          textFont(geoSmallFont);
          textSize(nameSingerFontSize);
          text(song.singerName, marginText, currentHeight, textBoxMaxWidth);
          const singerStringTextHeight = getWrappedTextHeight(song.singerName, textBoxMaxWidth);
          currentHeight += singerStringTextHeight;

          // Position audio player for this song
          if (audioPlayers[index]) {
              audioPlayers[index].position(marginText, currentHeight);
          }
          currentHeight += 80; // Space after audio player

          // Add extra spacing between songs
          currentHeight += 20;
      });
  }
}


// Error handling for JSON loading
function loadJSONfromJS(path, callback) {
  fetch(path)
      .then(response => response.json())
      .then(data => callback(data))
      .catch(error => {
          console.error('Error loading songs data:', error);
          // Fallback to empty songs array if loading fails
          callback({ songs: [] });
      });
}

function getWrappedTextHeight(txt, maxWidth) {
  const words = txt.split(' ');
  let line = '';
  let totalHeight = 0;
  const lineHeight = textLeading();
  let lineCount = 1;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = textWidth(testLine);
    
    if (testWidth > maxWidth) {
      line = words[i] + ' ';
      lineCount++;
    } else {
      line = testLine;
    }
  }
  
  totalHeight = lineCount * lineHeight;
  return totalHeight;
}

function mousePressed() {
  /*
    if(mouseY <= windowHeight/2){
        window.location.href = "https://santuario.github.io/e-poem-nosotros-noche/nosotros/index.html";
    }else{
        window.location.href = "https://santuario.github.io/e-poem-nosotros-noche/noche/index.html";
    }
  */

}