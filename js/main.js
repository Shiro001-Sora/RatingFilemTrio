// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Load featured movies on homepage
    if (document.getElementById('featured-movies')) {
        loadFeaturedMovies();
    }
    
    // Load all movies on browse page
    if (document.getElementById('all-movies')) {
        loadAllMovies();
    }
    
    // Load movie details if on details page
    if (document.getElementById('movie-details')) {
        loadMovieDetails();
    }
    
    // Setup admin login form if on admin login page
    if (document.getElementById('admin-login-form')) {
        setupAdminLogin();
    }
    
    // Setup admin dashboard if on admin page
    if (document.getElementById('admin-movies-list')) {
        // Check if admin is logged in
        if (!isAdminLoggedIn()) {
            window.location.href = 'admin-login.html';
            return;
        }
        
        loadAdminMovies();
        setupAdminLogout();
    }
});

// Load featured movies (first 6 movies)
function loadFeaturedMovies() {
    const moviesGrid = document.getElementById('featured-movies');
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    // Get first 6 movies
    const featuredMovies = movies.slice(0, 6);
    
    moviesGrid.innerHTML = '';
    
    featuredMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Load all movies
function loadAllMovies() {
    const moviesGrid = document.getElementById('all-movies');
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    moviesGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Create movie card element
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-rating">${movie.rating}</p>
            <p class="movie-year">${movie.year}</p>
            <p class="movie-genre">${movie.genre}</p>
            <div class="view-details">
            <a href="/html/details.html?id=${movie.id}" class="view-details btn">View Details</a>
            </div>
        </div>
    `;
    
    return card;
}

// Load movie details
function loadMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) {
        document.getElementById('movie-details').innerHTML = '<p>Movie not found.</p>';
        return;
    }
    
    document.getElementById('movie-details').innerHTML = `
        <div class="movie-detail">
            <div class="movie-detail-poster">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>
            <div class="movie-detail-info">
                <h1>${movie.title}</h1>
                <p class="movie-rating"> ${movie.rating}/5</p>
                <p><strong>Director:</strong> ${movie.director}</p>
                <p><strong>Year:</strong> ${movie.year}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Description:</strong> ${movie.description}</p>
                <a href="browse.html" class="btn">Back to Browse</a>
            </div>
        </div>
    `;
}

// Setup admin login form
function setupAdminLogin() {
    const loginForm = document.getElementById('admin-login-form');
    
    // Redirect if already logged in
    if (redirectIfLoggedIn()) {
        return;
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (verifyAdminCredentials(username, password)) {
            setAdminLoginStatus(true);
            window.location.href = 'admin-dashboard.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
}

// Load movies in admin dashboard
function loadAdminMovies() {
    const moviesList = document.getElementById('admin-movies-list');
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    moviesList.innerHTML = '';
    
    movies.forEach(movie => {
        const movieItem = document.createElement('tr');
        movieItem.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.year}</td>
            <td>${movie.rating}</td>
            <td>
                <button class="btn edit-btn" data-id="${movie.id}">Edit</button>
                <button class="btn delete-btn" data-id="${movie.id}">Delete</button>
            </td>
        `;
        
        moviesList.appendChild(movieItem);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const movieId = parseInt(this.getAttribute('data-id'));
            editMovie(movieId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const movieId = parseInt(this.getAttribute('data-id'));
            deleteMovie(movieId);
        });
    });
}

// Setup admin logout
function setupAdminLogout() {
    const logoutBtn = document.getElementById('admin-logout');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            setAdminLoginStatus(false);
            window.location.href = '../index.html';
        });
    }
}

// Edit movie function
function editMovie(movieId) {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) return;
    
    // In a real application, you would show a modal or form
    const newRating = prompt(`Enter new rating for ${movie.title} (0-5):`, movie.rating);
    
    if (newRating !== null && !isNaN(newRating) && newRating >= 0 && newRating <= 5) {
        movie.rating = parseFloat(newRating);
        localStorage.setItem('movies', JSON.stringify(movies));
        loadAdminMovies(); // Refresh the list
    }
}

// Delete movie function
function deleteMovie(movieId) {
    if (!confirm('Are you sure you want to delete this movie?')) return;
    
    let movies = JSON.parse(localStorage.getItem('movies') || '[]');
    movies = movies.filter(m => m.id !== movieId);
    localStorage.setItem('movies', JSON.stringify(movies));
    loadAdminMovies(); // Refresh the list
}

// Search and display movies
function filterMovies(searchTerm) {
    const moviesGrid = document.getElementById('all-movies');
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    moviesGrid.innerHTML = '';
    filtered.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Setup search bar event
if (document.getElementById('movie-search')) {
    document.getElementById('movie-search').addEventListener('input', function(e) {
        filterMovies(e.target.value);
    });
    // Show all movies initially
    filterMovies('');
}

// Show Add Movie Button and Modal only for admin
if (localStorage.getItem('isAdmin') === 'true') {
    const addBtn = document.getElementById('add-movie-btn');
    const modal = document.getElementById('add-movie-modal');
    if (addBtn) addBtn.style.display = 'inline-block';
    if (modal) modal.style.display = 'none';

    // Show Add Movie Modal
    if (addBtn) {
        const closeBtn = document.getElementById('close-add-movie');
        addBtn.onclick = () => { modal.style.display = 'block'; };
        closeBtn.onclick = () => { modal.style.display = 'none'; };
        window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    }

    // Handle Add Movie Form Submission
    if (document.getElementById('add-movie-form')) {
        document.getElementById('add-movie-form').onsubmit = function(e) {
            e.preventDefault();
            const form = e.target;
            const movies = JSON.parse(localStorage.getItem('movies') || '[]');
            const newMovie = {
                id: movies.length ? movies[movies.length - 1].id + 1 : 1,
                title: form.title.value,
                director: form.director.value,
                year: parseInt(form.year.value),
                genre: form.genre.value,
                rating: parseFloat(form.rating.value),
                description: form.description.value,
                poster: form.poster.value
            };
            movies.push(newMovie);
            localStorage.setItem('movies', JSON.stringify(movies));
            modal.style.display = 'none';
            form.reset();
            filterMovies(document.getElementById('movie-search').value); // Refresh grid
        };
    }
}

//# sourceMappingURL=script.js.map