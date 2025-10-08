// admin.js - Admin-specific functionality

// DOM Content Loaded event for admin pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on an admin page
    if (document.querySelector('.admin-page')) {
        // Verify admin is logged in
        if (!isAdminLoggedIn()) {
            window.location.href = 'admin-login.html';
            return;
        }
        
        // Setup admin functionality
        setupAdminDashboard();
    }
});

// Setup admin dashboard
function setupAdminDashboard() {
    loadAdminMovies();
    setupAdminLogout();
    setupAddMovieForm();
    setupSearchFunctionality();
}

// Load movies in admin dashboard
function loadAdminMovies() {
    const moviesList = document.getElementById('admin-movies-list');
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    moviesList.innerHTML = '';
    
    if (movies.length === 0) {
        moviesList.innerHTML = '<tr><td colspan="6" class="no-movies">No movies found. Add some movies to get started.</td></tr>';
        return;
    }
    
    movies.forEach(movie => {
        const movieItem = document.createElement('tr');
        movieItem.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.year}</td>
            <td>${movie.genre}</td>
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

// Setup add movie form
function setupAddMovieForm() {
    const addMovieForm = document.getElementById('add-movie-form');
    
    if (addMovieForm) {
        addMovieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('movie-title').value;
            const director = document.getElementById('movie-director').value;
            const year = parseInt(document.getElementById('movie-year').value);
            const genre = document.getElementById('movie-genre').value;
            const rating = parseFloat(document.getElementById('movie-rating').value);
            const description = document.getElementById('movie-description').value;
            const poster = document.getElementById('movie-poster').value || `https://via.placeholder.com/300x450/3498db/ffffff?text=${encodeURIComponent(title)}`;
            
            if (title && director && year && genre && rating && description) {
                addNewMovie(title, director, year, genre, rating, description, poster);
                addMovieForm.reset();
                
                // Show success message
                showNotification('Movie added successfully!', 'success');
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }
}

// Add new movie
function addNewMovie(title, director, year, genre, rating, description, poster) {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    // Generate a unique ID
    const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    
    const newMovie = {
        id: newId,
        title,
        director,
        year,
        genre,
        rating,
        description,
        poster
    };
    
    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));
    
    // Reload the movie list
    loadAdminMovies();
}

// Edit movie function
function editMovie(movieId) {
    const movies = JSON.parse(localStorage.getItem('movies') || '[]');
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) return;
    
    // Create edit form
    const editForm = document.createElement('div');
    editForm.className = 'edit-form';
    editForm.innerHTML = `
        <h3>Edit Movie: ${movie.title}</h3>
        <form id="edit-movie-form-${movie.id}">
            <div class="form-group">
                <label for="edit-title-${movie.id}">Title</label>
                <input type="text" id="edit-title-${movie.id}" value="${movie.title}" required>
            </div>
            <div class="form-group">
                <label for="edit-director-${movie.id}">Director</label>
                <input type="text" id="edit-director-${movie.id}" value="${movie.director}" required>
            </div>
            <div class="form-group">
                <label for="edit-year-${movie.id}">Year</label>
                <input type="number" id="edit-year-${movie.id}" value="${movie.year}" required>
            </div>
            <div class="form-group">
                <label for="edit-genre-${movie.id}">Genre</label>
                <input type="text" id="edit-genre-${movie.id}" value="${movie.genre}" required>
            </div>
            <div class="form-group">
                <label for="edit-rating-${movie.id}">Rating (0-5)</label>
                <input type="number" id="edit-rating-${movie.id}" step="0.1" min="0" max="5" value="${movie.rating}" required>
            </div>
            <div class="form-group">
                <label for="edit-description-${movie.id}">Description</label>
                <textarea id="edit-description-${movie.id}" required>${movie.description}</textarea>
            </div>
            <div class="form-group">
                <label for="edit-poster-${movie.id}">Poster URL</label>
                <input type="url" id="edit-poster-${movie.id}" value="${movie.poster}">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn">Save Changes</button>
                <button type="button" class="btn cancel-btn">Cancel</button>
            </div>
        </form>
    `;
    
    // Show modal with edit form
    showModal(editForm);
    
    // Handle form submission
    document.getElementById(`edit-movie-form-${movie.id}`).addEventListener('submit', function(e) {
        e.preventDefault();
        
        const updatedMovie = {
            ...movie,
            title: document.getElementById(`edit-title-${movie.id}`).value,
            director: document.getElementById(`edit-director-${movie.id}`).value,
            year: parseInt(document.getElementById(`edit-year-${movie.id}`).value),
            genre: document.getElementById(`edit-genre-${movie.id}`).value,
            rating: parseFloat(document.getElementById(`edit-rating-${movie.id}`).value),
            description: document.getElementById(`edit-description-${movie.id}`).value,
            poster: document.getElementById(`edit-poster-${movie.id}`).value || movie.poster
        };
        
        updateMovie(updatedMovie);
        closeModal();
    });
    
    // Handle cancel button
    document.querySelector('.cancel-btn').addEventListener('click', closeModal);
}

// Update movie in storage
function updateMovie(updatedMovie) {
    let movies = JSON.parse(localStorage.getItem('movies') || '[]');
    movies = movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie);
    localStorage.setItem('movies', JSON.stringify(movies));
    
    // Reload the movie list
    loadAdminMovies();
    
    // Show success message
    showNotification('Movie updated successfully!', 'success');
}

// Delete movie function
function deleteMovie(movieId) {
    if (!confirm('Are you sure you want to delete this movie? This action cannot be undone.')) return;
    
    let movies = JSON.parse(localStorage.getItem('movies') || '[]');
    const movieToDelete = movies.find(m => m.id === movieId);
    
    movies = movies.filter(m => m.id !== movieId);
    localStorage.setItem('movies', JSON.stringify(movies));
    
    // Reload the movie list
    loadAdminMovies();
    
    // Show success message
    showNotification(`"${movieToDelete.title}" has been deleted.`, 'success');
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('admin-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const movies = JSON.parse(localStorage.getItem('movies') || '[]');
            
            if (searchTerm === '') {
                loadAdminMovies();
                return;
            }
            
            const filteredMovies = movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.director.toLowerCase().includes(searchTerm) ||
                movie.genre.toLowerCase().includes(searchTerm) ||
                movie.year.toString().includes(searchTerm)
            );
            
            renderFilteredMovies(filteredMovies);
        });
    }
}

// Render filtered movies
function renderFilteredMovies(movies) {
    const moviesList = document.getElementById('admin-movies-list');
    
    moviesList.innerHTML = '';
    
    if (movies.length === 0) {
        moviesList.innerHTML = '<tr><td colspan="6" class="no-movies">No movies found matching your search.</td></tr>';
        return;
    }
    
    movies.forEach(movie => {
        const movieItem = document.createElement('tr');
        movieItem.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.year}</td>
            <td>${movie.genre}</td>
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

// Show modal function
function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body"></div>
        </div>
    `;
    
    modal.querySelector('.modal-body').appendChild(content);
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('add-movie-btn');
    const modal = document.getElementById('add-movie-modal');
    const closeBtn = document.getElementById('close-add-movie');

    if (addBtn && modal && closeBtn) {
        addBtn.onclick = () => { modal.style.display = 'block'; };
        closeBtn.onclick = () => { modal.style.display = 'none'; };
        window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    }

    // Handle Add Movie Form Submission
    const addForm = document.getElementById('add-movie-form');
    if (addForm) {
        addForm.onsubmit = function(e) {
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
            // Reload movies table if you have a function for it
            if (typeof loadAdminMovies === 'function') loadAdminMovies();
        };
    }
});