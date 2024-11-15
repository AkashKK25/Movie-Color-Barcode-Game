let difficulty = "";
let score = 0;
let wrongCount = 0;
let currentImage = "";
let movieKeys = {};
let imgFiles = [];
let names = [];
const maxWrongs = 5;
let pastMovies = [];

// DOM elements
const easyBtn = document.getElementById("easy-btn");
const hardBtn = document.getElementById("hard-btn");
const gameScreen = document.getElementById("game-screen");
const welcomeScreen = document.getElementById("welcome-screen");
const movieImage = document.getElementById("movie-image");
const optionsDiv = document.getElementById("options");
const verdictDiv = document.getElementById("verdict");
const wrongCountDiv = document.getElementById("wrong-count");
const nextButton = document.getElementById("next-button");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again");
const quitBtn = document.getElementById("quit");

// Event listeners
easyBtn.addEventListener("click", () => startGame("Easy"));
hardBtn.addEventListener("click", () => startGame("Hard"));
playAgainBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    welcomeScreen.style.display = "block";
    score = 0;
    wrongCount = 0;
    pastMovies = [];
});
quitBtn.addEventListener("click", () => window.location.reload());
nextButton.addEventListener("click", loadNextQuestion);

// Start the game
function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    welcomeScreen.style.display = "none";
    gameScreen.style.display = "block";
    document.getElementById("difficulty").textContent = `Difficulty: ${difficulty}`;

    // Reset values
    score = 0;
    wrongCount = 0;
    pastMovies = [];
    loadImages(difficulty);
}

// Load images from the local file system
function loadImages(difficulty) {
    // Example list of images (You would use a method to load files from the local directory in a real setup)
    imgFiles = [];
    names = [];
    movieKeys = {};

    const folderPath = difficulty === "Easy" ? "Movie Color Barcodes Easy" : "Movie Color Barcodes Hard";
    
    // Here we're using mock data for testing purposes. In a real-world scenario, you would need to fetch the images
    const movieFiles = [
        {file: "movie_color_barcode_10 Cloverfield Lane.jpg", name: "10 Cloverfield Lane"},
        {file: "movie_color_barcode_12th Fail.jpg", name: "12th Fail"},
        {file: "movie_color_barcode_2001 A Space Odyssey.jpg", name: "2001 A Space Odyssey"},
        {file: "movie_color_barcode_500 Days of Summer.jpg", name: "500 Days of Summer"},
        {file: "movie_color_barcode_777 Charlie.jpg", name: "777 Charlie"},
        {file: "movie_color_barcode_Ant-Man And The Wasp.jpg", name: "Ant-Man And The Wasp"},
        {file: "movie_color_barcode_Ant-Man.jpg", name: "Ant-Man"},
        {file: "movie_color_barcode_Avengers Age of Ultron.jpg", name: "Avengers Age of Ultron"},
        {file: "movie_color_barcode_Avengers Endgame IMAX.jpg", name: "Avengers Endgame IMAX"},
        {file: "movie_color_barcode_Avengers Endgame.jpg", name: "Avengers Endgame"},
        {file: "movie_color_barcode_Avengers Infinity War IMAX.jpg", name: "Avengers Infinity War IMAX"},
        {file: "movie_color_barcode_Avengers Infinity War.jpg", name: "Avengers Infinity War"},
        {file: "movie_color_barcode_Barry.jpg", name: "Barry"},
        {file: "movie_color_barcode_Batman Begins REMASTERED.jpg", name: "Batman Begins"},
        {file: "movie_color_barcode_Batman Begins.jpg", name: "Batman Begins"},
        {file: "movie_color_barcode_Batman Hush.jpg", name: "Batman Hush"},
        {file: "movie_color_barcode_Batman The Dark Knight Returns Part 1.jpg", name: "Batman The Dark Knight Returns Part 1"},
        {file: "movie_color_barcode_Batman The Dark Knight Returns Part 2.jpg", name: "Batman The Dark Knight Returns Part 2"},
        {file: "movie_color_barcode_Batman The Killing Joke.jpg", name: "Batman The Killing Joke"},
        {file: "movie_color_barcode_Batman The Long Halloween Part One.jpg", name: "Batman The Long Halloween Part One"},
        {file: "movie_color_barcode_Batman The Long Halloween Part Two.jpg", name: "Batman The Long Halloween Part Two"},
        {file: "movie_color_barcode_Batman Under the Red Hood.jpg", name: "Batman Under the Red Hood"},
        {file: "movie_color_barcode_Batman v Superman Dawn of Justice EXTE.jpg", name: "Batman v Superman Dawn of Justice EXTENDED"},
        {file: "movie_color_barcode_Big Hero 6.jpg", name: "Big Hero 6"},
        {file: "movie_color_barcode_Black Panther.jpg", name: "Black Panther"},
        {file: "movie_color_barcode_Braveheart.jpg", name: "Braveheart"},
        {file: "movie_color_barcode_Bullet Train.jpg", name: "Bullet Train"},
        {file: "movie_color_barcode_Captain America Civil War.jpg", name: "Captain America Civil War"},
        {file: "movie_color_barcode_Captain America The First Avenger.jpg", name: "Captain America The First Avenger"},
        {file: "movie_color_barcode_Captain America The Winter Soldier.jpg", name: "Captain America The Winter Soldier"},
        {file: "movie_color_barcode_Captain Marvel.jpg", name: "Captain Marvel"},
        {file: "movie_color_barcode_Casino Royale.jpg", name: "Casino Royale"},
        {file: "movie_color_barcode_Catch Me If You Can.jpg", name: "Catch Me If You Can"},
        {file: "movie_color_barcode_Daft Punk  - Alive 2007 - Paris - Fan DVD.jpg", name: "Daft Punk  - Alive 2007"},
        {file: "movie_color_barcode_Daft Punk - Alive 2007  [Full Concert].jpg", name: "Daft Punk - Alive 2007"},
        {file: "movie_color_barcode_Daft Punk - Live @ Coachella Festival.jpg", name: "Daft Punk - Live @ Coachella Festival"},
        {file: "movie_color_barcode_Dawn of the Planet of the Apes.jpg", name: "Dawn of the Planet of the Apes"},
        {file: "movie_color_barcode_Despicable Me.jpg", name: "Despicable Me"},
        {file: "movie_color_barcode_Doctor Strange in the Multiverse of Madness.jpg", name: "Doctor Strange in the Multiverse of Madness"},
        {file: "movie_color_barcode_Doctor Strange.jpg", name: "Doctor Strange"},
        {file: "movie_color_barcode_Dunkirk.jpg", name: "Dunkirk"},
        {file: "movie_color_barcode_Edge of Tomorrow.jpg", name: "Edge of Tomorrow"},
        {file: "movie_color_barcode_Ee Nagaraniki Emaindi.jpg", name: "Ee Nagaraniki Emaindi"},
        {file: "movie_color_barcode_Eternals IMAX.jpg", name: "Eternals IMAX"},
        {file: "movie_color_barcode_Every Day.jpg", name: "Every Day"},
        {file: "movie_color_barcode_Everything Everywhere All at Once.jpg", name: "Everything Everywhere All at Once"},
        {file: "movie_color_barcode_Ex Machina.jpg", name: "Ex Machina"},
        {file: "movie_color_barcode_Fantastic Beasts and Where to Find Them.jpg", name: "Fantastic Beasts and Where to Find Them"},
        {file: "movie_color_barcode_Fantastic Beasts The Crimes Of Grindelwald.jpg", name: "Fantastic Beasts The Crimes Of Grindelwald"},
        {file: "movie_color_barcode_Fantastic Beasts The Secrets of Dumbledore.jpg", name: "Fantastic Beasts The Secrets of Dumbledore"},
        {file: "movie_color_barcode_Fight Club.jpg", name: "Fight Club"},
        {file: "movie_color_barcode_Finding Dory.jpg", name: "Finding Dory"},
        {file: "movie_color_barcode_Finding Nemo.jpg", name: "Finding Nemo"},
        {file: "movie_color_barcode_First Man IMAX.jpg", name: "First Man IMAX"},
        {file: "movie_color_barcode_Following.jpg", name: "Following"},
        {file: "movie_color_barcode_Ford V Ferrari.jpg", name: "Ford V Ferrari"},
        {file: "movie_color_barcode_Furiosa A Mad Max Saga.jpg", name: "Furiosa A Mad Max Saga"},
        {file: "movie_color_barcode_Gladiator EXTENDED REMASTERED.jpg", name: "Gladiator"},
        {file: "movie_color_barcode_Good Will Hunting 1080p.jpg", name: "Good Will Hunting 1080p"},
        {file: "movie_color_barcode_Good Will Hunting.jpg", name: "Good Will Hunting"},
        {file: "movie_color_barcode_GOUTAM NANDA.jpg", name: "GOUTAM NANDA"},
        {file: "movie_color_barcode_Gravity.jpg", name: "Gravity"},
        {file: "movie_color_barcode_Groundhog Day.jpg", name: "Groundhog Day"},
        {file: "movie_color_barcode_Guardians Of The Galaxy Vol. 2.jpg", name: "Guardians Of The Galaxy Vol. 2"},
        {file: "movie_color_barcode_Guardians of the Galaxy.jpg", name: "Guardians of the Galaxy"},
        {file: "movie_color_barcode_Hachiko A Dog's Story.jpg", name: "Hachiko A Dog's Story"},
        {file: "movie_color_barcode_Happy Birthday (2022).jpg", name: "Happy Birthday (2022)"},
        {file: "movie_color_barcode_Hardcore Henry.jpg", name: "Hardcore Henry"},
        {file: "movie_color_barcode_Harry Potter and the Half Blood Prince (2).jpg", name: "Harry Potter and the Half Blood Prince"},
        {file: "movie_color_barcode_Harry Potter and the Order of the Phoenix.jpg", name: "Harry Potter and the Order of the Phoenix"},
        {file: "movie_color_barcode_Harry Potter and the Prisoner of Azkaban.jpg", name: "Harry Potter and the Prisoner of Azkaban"},
        {file: "movie_color_barcode_Harry Potter and the socrcers stone.jpg", name: "Harry Potter and the socrcers stone"},
        {file: "movie_color_barcode_Harry Potter And The Sorcerers Stone E.jpg", name: "Harry Potter And The Sorcerers Stone EXTENDED"},
        {file: "movie_color_barcode_Harry Potter and the Sorcerers Stone.jpg", name: "Harry Potter and the Sorcerers Stone"},
        {file: "movie_color_barcode_How to Train Your Dragon.jpg", name: "How to Train Your Dragon"},
        {file: "movie_color_barcode_Hugo.jpg", name: "Hugo"},
        {file: "movie_color_barcode_Inception.jpg", name: "Inception"},
        {file: "movie_color_barcode_Inside Out.jpg", name: "Inside Out"},
        {file: "movie_color_barcode_Insomnia.jpg", name: "Insomnia"},
        {file: "movie_color_barcode_Interstellar.jpg", name: "Interstellar"},
        {file: "movie_color_barcode_Iron Man 2.jpg", name: "Iron Man 2"},
        {file: "movie_color_barcode_Iron Man 3.jpg", name: "Iron Man 3"},
        {file: "movie_color_barcode_Iron Man.jpg", name: "Iron Man"},
        {file: "movie_color_barcode_James Bond Quantum of Solace.jpg", name: "James Bond Quantum of Solace"},
        {file: "movie_color_barcode_John Wick Chapter 4.jpg", name: "John Wick Chapter 4"},
        {file: "movie_color_barcode_Joker.jpg", name: "Joker"},
        {file: "movie_color_barcode_Justice League Dark Apokolips War.jpg", name: "Justice League Dark Apokolips War"},
        {file: "movie_color_barcode_Justice League Snyders Cut.jpg", name: "Justice League Snyders Cut"},
        {file: "movie_color_barcode_Justice League The Flashpoint Paradox.jpg", name: "Justice League The Flashpoint Paradox"},
        {file: "movie_color_barcode_Koyaanisqatsi.jpg", name: "Koyaanisqatsi"},
        {file: "movie_color_barcode_Kung Fu Panda (2008).jpg", name: "Kung Fu Panda (2008)"},
        {file: "movie_color_barcode_Kung Fu Panda 2 (2011).jpg", name: "Kung Fu Panda 2 (2011)"},
        {file: "movie_color_barcode_Kung Fu Panda 2.jpg", name: "Kung Fu Panda 2"},
        {file: "movie_color_barcode_Kung Fu Panda.jpg", name: "Kung Fu Panda"},
        {file: "movie_color_barcode_Life Of Pi 3D.jpg", name: "Life Of Pi"},
        {file: "movie_color_barcode_Locke.jpg", name: "Locke"},
        {file: "movie_color_barcode_Logan.jpg", name: "Logan"},
        {file: "movie_color_barcode_Mad Max Fury Road Black And Chrome Edition.jpg", name: "Mad Max Fury Road Black And Chrome Edition"},
        {file: "movie_color_barcode_Mad Max Fury Road.jpg", name: "Mad Max Fury Road"},
        {file: "movie_color_barcode_Man Of Steel.jpg", name: "Man Of Steel"},
        {file: "movie_color_barcode_Manjummel Boys Malayalam.jpg", name: "Manjummel Boys"},
        {file: "movie_color_barcode_Manjummel Boys Telugu.jpg", name: "Manjummel Boys"},
        {file: "movie_color_barcode_Mathu Vadalara 2.jpg", name: "Mathu Vadalara 2"},
        {file: "movie_color_barcode_MATHU VADALARA.jpg", name: "MATHU VADALARA"},
        {file: "movie_color_barcode_Maze Runner The Death Cure.jpg", name: "Maze Runner The Death Cure"},
        {file: "movie_color_barcode_Maze Runner The Scorch Trials.jpg", name: "Maze Runner The Scorch Trials"},
        {file: "movie_color_barcode_Megamind.jpg", name: "Megamind"},
        {file: "movie_color_barcode_Memento chronologically.jpg", name: "Memento chronologically"},
        {file: "movie_color_barcode_Memento.jpg", name: "Memento"},
        {file: "movie_color_barcode_Mission Impossible Fallout IMAX.jpg", name: "Mission Impossible Fallout IMAX"},
        {file: "movie_color_barcode_Mission Impossible Ghost Protocol.jpg", name: "Mission Impossible Ghost Protocol"},
        {file: "movie_color_barcode_Mission Impossible III.jpg", name: "Mission Impossible III"},
        {file: "movie_color_barcode_Mission Impossible Rogue Nation.jpg", name: "Mission Impossible Rogue Nation"},
        {file: "movie_color_barcode_Mission Impossible.jpg", name: "Mission Impossible"},
        {file: "movie_color_barcode_Mr Beans Holiday.jpg", name: "Mr Beans Holiday"},
        {file: "movie_color_barcode_My Octopus Teacher.jpg", name: "My Octopus Teacher"},
        {file: "movie_color_barcode_Nightcrawler.jpg", name: "Nightcrawler"},
        {file: "movie_color_barcode_No Time to Die.jpg", name: "No Time to Die"},
        {file: "movie_color_barcode_Pans Labyrinth.jpg", name: "Pans Labyrinth"},
        {file: "movie_color_barcode_Parasite.jpg", name: "Parasite"},
        {file: "movie_color_barcode_Pirates of the Caribbean At Worlds End.jpg", name: "Pirates of the Caribbean At Worlds End"},
        {file: "movie_color_barcode_Pirates of the Caribbean Dead Man's Chest.jpg", name: "Pirates of the Caribbean Dead Man's Chest"},
        {file: "movie_color_barcode_Pirates of the Caribbean The Curse of the Black Pearl.jpg", name: "Pirates of the Caribbean The Curse of the Black Pearl"},
        {file: "movie_color_barcode_Primal Fear.jpg", name: "Primal Fear"},
        {file: "movie_color_barcode_Pulp Fiction.jpg", name: "Pulp Fiction"},
        {file: "movie_color_barcode_Puss In Boots The Last Wish.jpg", name: "Puss In Boots The Last Wish"},
        {file: "movie_color_barcode_Rise of the Guardians.jpg", name: "Rise of the Guardians"},
        {file: "movie_color_barcode_Rise Of The Planet Of The Apes.jpg", name: "Rise Of The Planet Of The Apes"},
        {file: "movie_color_barcode_Rogue One.jpg", name: "Rogue One"},
        {file: "movie_color_barcode_Secret Superstar.jpg", name: "Secret Superstar"},
        {file: "movie_color_barcode_Shang-Chi And The Legend Of The Ten Rings.jpg", name: "Shang-Chi And The Legend Of The Ten Rings"},
        {file: "movie_color_barcode_Shazam!.jpg", name: "Shazam!"},
        {file: "movie_color_barcode_Sherlock Holmes A Game of Shadows.jpg", name: "Sherlock Holmes A Game of Shadows"},
        {file: "movie_color_barcode_Sherlock Holmes.jpg", name: "Sherlock Holmes"},
        {file: "movie_color_barcode_Shutter Island.jpg", name: "Shutter Island"},
        {file: "movie_color_barcode_Skyfall.jpg", name: "Skyfall"},
        {file: "movie_color_barcode_Snowpiercer.jpg", name: "Snowpiercer"},
        {file: "movie_color_barcode_Some Like It Hot.jpg", name: "Some Like It Hot"},
        {file: "movie_color_barcode_Spectre.jpg", name: "Spectre"},
        {file: "movie_color_barcode_Spider-Man 2 EXTENDED.jpg", name: "Spider-Man 2 EXTENDED"},
        {file: "movie_color_barcode_Spider-Man Far From Home.jpg", name: "Spider-Man Far From Home"},
        {file: "movie_color_barcode_Spider-Man Homecoming.jpg", name: "Spider-Man Homecoming"},
        {file: "movie_color_barcode_Spider-Man No Way Home.jpg", name: "Spider-Man No Way Home"},
        {file: "movie_color_barcode_Split.jpg", name: "Split"},
        {file: "movie_color_barcode_Stand By Me Doraemon.jpg", name: "Stand By Me Doraemon"},
        {file: "movie_color_barcode_Super 30.jpg", name: "Super 30"},
        {file: "movie_color_barcode_Tenet.jpg", name: "Tenet"},
        {file: "movie_color_barcode_The Amazing Spider-Man 2.jpg", name: "The Amazing Spider-Man 2"},
        {file: "movie_color_barcode_The Apartment.jpg", name: "The Apartment"},
        {file: "movie_color_barcode_The Avengers.jpg", name: "The Avengers"},
        {file: "movie_color_barcode_The Batman.jpg", name: "The Batman"},
        {file: "movie_color_barcode_The Dark Knight Rises.jpg", name: "The Dark Knight Rises"},
        {file: "movie_color_barcode_The Dark Knight.jpg", name: "The Dark Knight"},
        {file: "movie_color_barcode_The Disaster Artist.jpg", name: "The Disaster Artist"},
        {file: "movie_color_barcode_The Incredible Hulk.jpg", name: "The Incredible Hulk"},
        {file: "movie_color_barcode_The Lord of the Rings The Fellowship of the Ring.jpg", name: "The Lord of the Rings The Fellowship of the Ring"},
        {file: "movie_color_barcode_The Lord of the Rings The Return of the King.jpg", name: "The Lord of the Rings The Return of the King"},
        {file: "movie_color_barcode_The Lord of the Rings The Two Towers.jpg", name: "The Lord of the Rings The Two Towers"},
        {file: "movie_color_barcode_The Maze Runner.jpg", name: "The Maze Runner"},
        {file: "movie_color_barcode_The Prestige.jpg", name: "The Prestige"},
        {file: "movie_color_barcode_The Room.jpg", name: "The Room"},
        {file: "movie_color_barcode_The Sixth Sense.jpg", name: "The Sixth Sense"},
        {file: "movie_color_barcode_The Spectacular Now.jpg", name: "The Spectacular Now"},
        {file: "movie_color_barcode_Thirteen Lives.jpg", name: "Thirteen Lives"},
        {file: "movie_color_barcode_Thor Ragnarok.jpg", name: "Thor Ragnarok"},
        {file: "movie_color_barcode_Thor The Dark World.jpg", name: "Thor The Dark World"},
        {file: "movie_color_barcode_Thor.jpg", name: "Thor"},
        {file: "movie_color_barcode_Thoroughbreds.jpg", name: "Thoroughbreds"},
        {file: "movie_color_barcode_Titanic.jpg", name: "Titanic"},
        {file: "movie_color_barcode_Top Gun Maverick IMAX.jpg", name: "Top Gun Maverick IMAX"},
        {file: "movie_color_barcode_Toy Story 4.jpg", name: "Toy Story 4"},
        {file: "movie_color_barcode_TRON Legacy 3D.jpg", name: "TRON Legacy"},
        {file: "movie_color_barcode_Tron Legacy.jpg", name: "Tron Legacy"},
        {file: "movie_color_barcode_Tuesday.jpg", name: "Tuesday"},
        {file: "movie_color_barcode_Up.jpg", name: "Up"},
        {file: "movie_color_barcode_V For Vendetta.jpg", name: "V For Vendetta"},
        {file: "movie_color_barcode_Toy Story 3.jpg", name: "Toy Story 3"},
        {file: "movie_color_barcode_v1a7.jpg", name: "Daft Punk - Alive 2007"},
        {file: "movie_color_barcode_War For The Planet Of The Apes.jpg", name: "War For The Planet Of The Apes"},
        {file: "movie_color_barcode_What We Do in the Shadows.jpg", name: "What We Do in the Shadows"},
        {file: "movie_color_barcode_Wonder Woman.jpg", name: "Wonder Woman"},
        {file: "movie_color_barcode_Wreck-it Ralph.jpg", name: "Wreck-it Ralph"},
        {file: "movie_color_barcode_X-Men Days of Future Past.jpg", name: "X-Men Days of Future Past"},
        {file: "movie_color_barcode_Zootopia.jpg", name: "Zootopia"},
];

    movieFiles.forEach(file => {
        imgFiles.push(file.file);
        names.push(file.name);
        movieKeys[file.file] = file.name;
    });

    loadNextQuestion();
}

// Load a random question
function loadNextQuestion() {
    // Prevent showing the same movie twice
    let movie = getRandomMovie();
    movieImage.src = `${difficulty === "Easy" ? "Movie Color Barcodes Easy" : "Movie Color Barcodes Hard"}/${movie}`;
    
    document.getElementById("verdict").textContent = '';

    // Generate random options
    const correctAnswer = movieKeys[movie];
    let options = getRandomOptions(correctAnswer);
    
    optionsDiv.innerHTML = "";
    options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => checkAnswer(option, correctAnswer));
        optionsDiv.appendChild(btn);
    });
}

// Get a random movie that hasn't been used yet
function getRandomMovie() {
    const remainingMovies = imgFiles.filter(movie => !pastMovies.includes(movie));
    const randomIndex = Math.floor(Math.random() * remainingMovies.length);
    const movie = remainingMovies[randomIndex];
    pastMovies.push(movie);
    return movie;
}

// Generate options for the user
function getRandomOptions(correctAnswer) {
    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        const randomOption = names[Math.floor(Math.random() * names.length)];
        options.add(randomOption);
    }

    return Array.from(options);
}

// Check if the selected answer is correct
function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        document.getElementById("verdict").textContent = `Correct!`;
    } else {
        document.getElementById("verdict").textContent = `Wrong! The correct answer is: ${correctAnswer}`;
        wrongCount++;
        wrongCountDiv.textContent = `Wrongs: ${wrongCount}`;
        if (wrongCount >= maxWrongs) {
            endGame();
            return;
        }
    }
}

// End the game
function endGame() {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "block";
    finalScore.textContent = `Your score is ${score}`;
}
