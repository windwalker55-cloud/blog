  const signupForm = document.getElementById('signupForm');
  const email = document.getElementById('email');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const terms = document.getElementById('terms');
  const emailError = document.getElementById('emailError');
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  const confirmError = document.getElementById('confirmError');

  signupForm.addEventListener('submit', (e) => {
    let valid = true;

    if (!email.value.includes('@') || email.value.trim() === '') {
      emailError.style.display = 'block';
      email.style.borderColor = 'var(--error)';
      valid = false;
    } else {
      emailError.style.display = 'none';
      email.style.borderColor = 'var(--rule)';
    }

    if (username.value.trim() === '') {
      usernameError.style.display = 'block';
      username.style.borderColor = 'var(--error)';
      valid = false;
    } else {
      usernameError.style.display = 'none';
      username.style.borderColor = 'var(--rule)';
    }

    if (password.value.length < 6) {
      passwordError.style.display = 'block';
      password.style.borderColor = 'var(--error)';
      valid = false;
    } else {
      passwordError.style.display = 'none';
      password.style.borderColor = 'var(--rule)';
    }

    if (confirmPassword.value !== password.value || confirmPassword.value === '') {
      confirmError.style.display = 'block';
      confirmPassword.style.borderColor = 'var(--error)';
      valid = false;
    } else {
      confirmError.style.display = 'none';
      confirmPassword.style.borderColor = 'var(--rule)';
    }

    if (!terms.checked) {
      terms.style.outline = '2px solid var(--error)';
      valid = false;
    } else {
      terms.style.outline = 'none';
    }

    if (!valid) {
      e.preventDefault();
    }
  });
