const crypto = require('crypto');
const fetch = require('node-fetch');

async function checkPasswordBreach(password) {
    // Step 1: Hash the password with SHA-1
    const sha1Hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
    const prefix = sha1Hash.slice(0, 5);
    const suffix = sha1Hash.slice(5);

    // Step 2: Query the HIBP API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) {
        return `Error: Unable to connect to HIBP API. Status code: ${response.status}`;
    }

    const data = await response.text();

    // Step 3: Check if the suffix exists in the response
    const breaches = data.split('\n').map(line => line.split(':'));
    for (const [hashSuffix, count] of breaches) {
        if (hashSuffix === suffix) {
            return `Your password has been exposed ${count} times in data breaches! Please change it.`;
        }
    }

    return "Your password is safe and has not been found in any known data breaches.";
}

// Example Usage
checkPasswordBreach("123456").then(console.log);

function checkPasswordStrength() {
  const password = document.getElementById("password-input").value;
  const resultDiv = document.getElementById("strength-result");


  resultDiv.innerHTML = "";

  
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


  if (score === 6) {
    resultDiv.innerHTML = `<span style="color: green;">✅ Strong Password! Great job! 🌟</span>`;
  } else if (score >= 4) {
    resultDiv.innerHTML = `<span style="color: orange;">🟠 Decent Password! Here's how to improve:</span><ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  } else {
    resultDiv.innerHTML = `<span style="color: red;">🔴 Weak Password! Consider these tips:</span><ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  }
}
function generateStrongPassword() {
    const length = 16; 
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

    
    const allChars = uppercaseChars + lowercaseChars + numbers + specialChars;

    
    function getRandomChar(charSet) {
        return charSet[Math.floor(Math.random() * charSet.length)];
    }

    let password = "";

    
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(numbers);
    password += getRandomChar(specialChars);

    
    for (let i = password.length; i < length; i++) {
        password += getRandomChar(allChars);
    }

    
    password = password.split("").sort(() => Math.random() - 0.5).join("");

    return password;
}


function generatePassword() {
    const password = generateStrongPassword();
    const passwordDisplay = document.getElementById("generated-password");
    passwordDisplay.textContent = password;
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
    feedback.textContent = "🌟 Strong password! The user's information is secure. You're a Password Hero!🌟";
    feedback.style.color = "green";
    encouragement.style.display = "block"; 
  } else {
    feedback.textContent = "❌ Keep improving! Add more security elements.";
    feedback.style.color = "red";
    encouragement.style.display = "none"; 
  }
  strengthBar.style.width = (score / 4) * 100 + "%";
  strengthBar.style.backgroundColor = score === 4 ? "green" : "orange";
}
