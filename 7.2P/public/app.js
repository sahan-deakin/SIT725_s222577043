let socket = io();
let selectedRating = 0;

// Receive updated feedback list from server
socket.on('feedback-list', function(feedbacks) {
    console.log('Feedback update:', feedbacks.length, 'responses');

    // Update stats
    let total = feedbacks.length;
    let avg = total > 0
        ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
        : '-';

    document.getElementById('total').textContent = total;
    document.getElementById('avg').textContent = avg;

    // Update list
    let list = document.getElementById('feedback-list');
    if (total === 0) {
        list.innerHTML = '<p class="grey">No feedback yet.</p>';
        return;
    }

    list.innerHTML = '';
    feedbacks.slice().reverse().forEach(function(f) {
        let stars = '★'.repeat(f.rating) + '☆'.repeat(5 - f.rating);
        let comment = f.comment ? '<p>' + f.comment + '</p>' : '';
        list.innerHTML += '<div class="feedback-item">' +
            '<span style="color:orange">' + stars + '</span>' +
            comment +
            '<span class="grey">' + f.time + '</span>' +
        '</div>';
    });
});

// Set star rating
function setRating(n) {
    selectedRating = n;
    let stars = document.querySelectorAll('.stars span');
    stars.forEach(function(s, i) {
        s.classList.toggle('selected', i < n);
    });
}

// Submit feedback
function submitFeedback() {
    if (selectedRating === 0) {
        alert('Please select a rating!');
        return;
    }
    let comment = document.getElementById('comment').value;
    socket.emit('submit-feedback', { rating: selectedRating, comment: comment });
    document.getElementById('thanks').style.display = 'block';
    document.getElementById('comment').value = '';
}

// Reset feedback
function resetFeedback() {
    socket.emit('reset');
}

// Toggle views
function showView(view) {
    document.getElementById('student-view').style.display = view === 'student' ? 'block' : 'none';
    document.getElementById('teacher-view').style.display = view === 'teacher' ? 'block' : 'none';
}
