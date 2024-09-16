// Modal for "How to Play"
const howToPlayModal = document.getElementById('modal-howtoplay');
const howToPlayBtn = document.getElementById('howToPlayBtn');
const playOptionsModal = document.getElementById('modal-playoptions');
const playBtn = document.getElementById('playBtn');
const closeButtons = document.querySelectorAll('.close');

// Event listener for "How to Play" button
howToPlayBtn.onclick = function() {
    howToPlayModal.style.display = 'block';
};

// Event listener for "Play" button to show game options
playBtn.onclick = function() {
    playOptionsModal.style.display = 'block';
};

// Close modals when clicking on "X" (close button)
closeButtons.forEach(btn => {
    btn.onclick = function() {
        howToPlayModal.style.display = 'none';
        playOptionsModal.style.display = 'none';
    };
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === howToPlayModal || event.target === playOptionsModal) {
        howToPlayModal.style.display = 'none';
        playOptionsModal.style.display = 'none';
    }
};

// Redirect or set up game mode when choosing an option
document.getElementById('playComputer').onclick = function() {
    window.location.href = 'game_computer.html'; // Redirect to the computer AI game
};

document.getElementById('playFriend').onclick = function() {
    window.location.href = 'game_friend.html'; // Redirect to the game with a friend
};
