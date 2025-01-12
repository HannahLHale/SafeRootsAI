function checkPasswordStrength() {
  const password = document.getElementById("password-input").value;
  const resultDiv = document.getElementById("strength-result");

  // Clear previous result
  resultDiv.innerHTML = "";

  // Check password strength
  let score = 0;
  let tips = [];

  if (password.length >= 16) {
    score++;
  } else {
    tips.push("Use at least 16 characters for better security.");
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    tips.push("Add uppercase letters to make your password stronger.");
  }

  if (/[a-z]/.test(password)) {
    score++;
  } else {
    tips.push("Include lowercase letters for a balanced password.");
  }

  if (/\d/.test(password)) {
    score++;
  } else {
    tips.push("Add numbers to make your password harder to guess.");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  } else {
    tips.push("Special characters (like @, #, or !) improve security.");
  }

  if (!/password|1234|qwerty|abcd/.test(password.toLowerCase())) {
    score++;
  } else {
    tips.push("Avoid common passwords or patterns.");
  }

  // Display strength result
  if (score === 6) {
    resultDiv.innerHTML = `<span style="color: green;">✅ Strong Password! Great job! 🌟</span>`;
  } else if (score >= 4) {
    resultDiv.innerHTML = `<span style="color: orange;">🟠 Decent Password! Here's how to improve:</span><ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  } else {
    resultDiv.innerHTML = `<span style="color: red;">🔴 Weak Password! Consider these tips:</span><ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  }
}
function generatePassword() {
  const length = 16; // Desired password length
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}<>?";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  const passwordDiv = document.getElementById("generated-password");
  passwordDiv.innerHTML = `<span style="color: green;">Your Strong Password: </span> <code id="password-text">${password}</code>`;
}

function showGame() {
  const learnSection = document.getElementById("learn");
  const gameSection = document.getElementById("interactive-game");
  const infographicArea = document.getElementById("infographic-area");

  if (learnSection && gameSection && infographicArea) {
    learnSection.style.display = "none";


    gameSection.style.display = "block";
    setTimeout(() => {
      gameSection.classList.add("show");
    }, 50); 
    infographicArea.style.display = "block";
  }
}

function checkPassword() {
  const userPassword = document.getElementById("user-password").value;
  const feedback = document.getElementById("feedback");
  const strengthBar = document.getElementById("strength-bar");
  const encouragement = document.getElementById("encouragement");

  let score = 0;

  if (userPassword.length >= 12) score += 1; // Length
  if (/[A-Z]/.test(userPassword)) score += 1; // Uppercase
  if (/[0-9]/.test(userPassword)) score += 1; // Numbers
  if (/[!@#$%^&*]/.test(userPassword)) score += 1; // Symbols

 
  if (score === 4) {
    feedback.textContent = "🌟 Strong password! The user's information is secure. You're a Password Hero!";
    feedback.style.color = "green";
    encouragement.style.display = "block"; // Show encouragement
  } else {
    feedback.textContent = "❌ Keep improving! Add more security elements.";
    feedback.style.color = "red";
    encouragement.style.display = "none"; // Hide encouragement
  }

  // Update strength bar
  strengthBar.style.width = (score / 4) * 100 + "%";
  strengthBar.style.backgroundColor = score === 4 ? "green" : "orange";
}
