$(document).ready(function () {

  // ===== Login or Auto-Register User =====
  $('#loginForm').submit(function (e) {
    e.preventDefault();
    const username = $('#loginUsername').val().trim();
    const password = $('#loginPassword').val().trim();

    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
      if (existingUser.password === password) {
        // Successful login
        localStorage.setItem('loggedInUser', username);
        window.location.href = '/Home/home.html';
      } else {
        alert("Incorrect password.");
      }
    } else {
      // New user: save and login
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', username);
      alert("Welcome! Account created and logged in.");
      window.location.href = '/Home/home.html';
    }
  });

  // ===== Home Page Access Protection =====
  if (window.location.pathname.includes('/Home/home.html')) {
    const user = localStorage.getItem('loggedInUser');

    if (!user) {
      alert("Please login first.");
      window.location.href = '/auth/login.html';
      return;
    }

    // Show username
    $('#usernameDisplay').text(user);

    // ===== Logout Functionality =====
    $('#logoutBtn').click(function () {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(u => u.username !== loggedInUser);
        localStorage.setItem('users', JSON.stringify(users));
      }

      localStorage.removeItem('loggedInUser');
      window.location.href = '/login.html';
    });
  }
});
