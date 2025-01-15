function toggleCheck(iconElement, sectionId) {
    const isChecked = iconElement.dataset.checked === "true";

    if (isChecked) {
        iconElement.src = "grey-check.png"; 
        iconElement.alt = "Check off";
        iconElement.dataset.checked = "false"; 
    } else {
        iconElement.src = "green-check.png"; 
        iconElement.alt = "Checked off";
        iconElement.dataset.checked = "true"; 
    }
    checkAllSectionsCompleted();
}

function checkAllSectionsCompleted() {
    const icons = document.querySelectorAll(".check-icon");
    const allChecked = Array.from(icons).every(icon => icon.dataset.checked === "true");

    if (allChecked) {
        alert("🎉 Congratulations! You've completed all sections. Your certificate has appeared at the bottom of the screen!");
        displayCertificate();
    }
}

function displayCertificate() {
    const certificate = document.getElementById("certificate");
    certificate.style.display = "block"; 
}


async function checkBreach() {
    const password = document.getElementById('breach-password').value;
    const resultDiv = document.getElementById('breach-result');

    if (!password) {
        resultDiv.textContent = "Please enter a password.";
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/check-breach', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        const result = await response.text();
        resultDiv.textContent = result;
    } catch (error) {
        resultDiv.textContent = "Error checking password. Please try again.";
        console.error(error);
    }
}


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
    passwordDisplay.textContent = "Password: "+password ;
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

  if (userPassword.length >= 12) score += 1; 
  if (/[A-Z]/.test(userPassword)) score += 1; 
  if (/[0-9]/.test(userPassword)) score += 1;
  if (/[!@#$%^&*]/.test(userPassword)) score += 1;

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
