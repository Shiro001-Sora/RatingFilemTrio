// data.js - Movie data management

// Sample movie data
let movies = [
    {
        id: 1,
        title: "F1:The Movie",
        director: "Joseph Kosinski",
        year: 2025,
        genre: "Sports, Action",
        rating: 4.6,
        description: "In the 1990s, Sonny Hayes was Formula 1's most promising driver until an accident on the track nearly ended his career. Thirty years later, the owner of a struggling Formula 1 team convinces Sonny to return to racing and become the best in the world. Driving alongside the team's hotshot rookie, Sonny soon learns that the road to redemption is not something you can travel alone.",
        poster: "https://www.tanweer.gr/wp-content/uploads/2025/06/F1%E2%93%87-THE-MOVIE-70X100-REV-HR-1-scaled.jpg"
    },
    {
        id: 2,
        title: "Ejen Ali:The Movie 2",
        director: "Muhammad Usamah Zaid Yasin",
        year: 2025,
        genre: "Action,Science Fiction",
        rating: 4.9,
        description: "Ejen Ali tests out a new suit powered by artificial intellgience to help MATA agents and make their lives easier in the field.",
        poster: "https://m.media-amazon.com/images/M/MV5BZjhiNDkyODItZDc2Ni00YTcwLWFhMWMtZmRlYmQ5MDRmMmMyXkEyXkFqcGc@._V1_.jpg"
    },
    {
        id: 3,
        title: "Blood Brothers",
        director: " Abhilash Chandra, Syafiq Yusof",
        year: 2025,
        genre: "Action, Crime, Drama",
        rating: 4.9,
        description: "A group of close-knit men working in an elite security organisation providing protection for powerful men and organised crime leaders is tested when betrayal lurks within the brotherhood.",
        poster: "https://themalaysianreserve.com/wp-content/uploads/2025/07/Blood-Brothers.jpg"
    },
    {
        id: 4,
        title: "Jurassic World Rebirth",
        director: "Gareth Edwards",
        year: 2025,
        genre: "Adventure, Drama, Science Fiction",
        rating: 2.7,
        description: "Zora Bennett leads a team of skilled operatives to the most dangerous place on Earth, an island research facility for the original Jurassic Park. Their mission is to secure genetic material from dinosaurs whose DNA can provide life-saving benefits to mankind. As the top-secret expedition becomes more and more risky, they soon make a sinister, shocking discovery that's been hidden from the world for decades.",
        poster: "https://comicbook.com/wp-content/uploads/sites/4/2024/08/f42939cd-cc4e-4f1c-b57d-e975721f3219.jpg?w=1024"
    },
	{
        id: 5,
        title: "Demon Slayer: Infinity Castle",
        director: "Haruo Sotozaki",
        year: 2025,
        genre: "Adventure, Drama",
        rating: 4.7,
        description: "Tanjiro Kamado and other members of the Demon Slayer Corps find themselves in an epic battle at Infinity Castle.",
        poster: "https://cosmicvaults.com/wp-content/uploads/2025/03/gw-Blogs.jpg"
    },
	{
        id: 6,
        title: "The Fantastic Four: First Steps",
        director: "Matt Shakman",
        year: 2025,
        genre: "Action, Science Fiction",
        rating: 3.9,
        description: "Mister Fantastic, Invisible Woman, Human Torch and the Thing face their most daunting challenge yet as they defend Earth from Galactus and Silver Surfer.",
        poster: "https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 7,
        title: "A Minecraft Movie",
        director: "Jared Hess",
        year: 2025,
        genre: "Action, Adventure",
        rating: 4.2,
        description: "A mysterious portal pulls four misfits into the Overworld, a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master the terrain while embarking on a magical quest with an unexpected crafter named Steve.",
        poster: "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/1d5a78ef-34bd-4c10-bf0a-4ac7f7cb8886/212cb475-ef6d-4d5b-b411-8515a08578bb?host=wbd-images.prod-vod.h264.io&partner=beamcom"
    },
    {
        id: 8,
        title: "How to Train Your Dragon",
        director: "Dean DeBlois",
        year: 2025,
        genre: "Fantasy, Adventure",
        rating: 4.7,
        description: "On the rugged isle of Berk, a Viking boy named Hiccup defies centuries of tradition by befriending a dragon named Toothless. However, when an ancient threat emerges that endangers both species, Hiccup's friendship with Toothless becomes the key to forging a new future. Together, they must navigate the delicate path toward peace, soaring beyond the boundaries of their worlds and redefining what it means to be a hero and a leader.",
        poster: "https://thecollision.org/wp-content/uploads/2025/06/how-to-train.png"
    },
    {
        id: 9,
        title: "Superman",
        director: "James Gunn",
        year: 2025,
        genre: "Action , Science Fiction",
        rating: 3.8,
        description: "When Superman gets drawn into conflicts at home and abroad, his actions are questioned, giving tech billionaire Lex Luthor the opportunity to get the Man of Steel out of the way for good. Will intrepid reporter Lois Lane and Superman's four-legged companion, Krypto, be able to help him before it's too late?",
        poster: "https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_.jpg"
    }
];

// Check if movies exist in localStorage, if not, initialize with sample data
if (!localStorage.getItem('movies')) {
    localStorage.setItem('movies', JSON.stringify(movies));
}