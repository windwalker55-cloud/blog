 const loginForm = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  loginForm.addEventListener('submit', (e) => {
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {
      emailError.style.display = 'block';
      email.style.borderColor = 'var(--error)';
      valid = false;
    } else {
      emailError.style.display = 'none';
      email.style.borderColor = 'var(--rule)';
    }

    if (password.value.length === 0) {
      passwordError.style.display = 'block';
      password.style.borderColor = 'var(--error)';
      valid = false;
    } else {
      passwordError.style.display = 'none';
      password.style.borderColor = 'var(--rule)';
    }

    if (!valid) {
      e.preventDefault();
    }
  });