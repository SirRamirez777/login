document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const email = document.getElementById('email').value;
    
    // Validate email
    if (!validateEmail(email)) {
        showOutput('Please enter a valid email address', 'error');
        return;
    }

        if (email !== confirmEmail) {
        showOutput('Email addresses do not match', 'error');
        return;
    }
    
    // Check if confirmation email was typed (not pasted)
    if (wasFieldPasted('confirmEmail')) {
        showOutput('Please type your email confirmation instead of pasting', 'error');
        return;
    }
    
    // Display the collected data
    const output = `
        <h3>Registration Successful!</h3>
        <p><strong>Name:</strong> ${name} ${surname}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;
    
    showOutput(output, 'success');
});
// New function to detect pasting
function wasFieldPasted(fieldId) {
    const field = document.getElementById(fieldId);
    return field.getAttribute('data-pasted') === 'true';
}

// Add event listeners to detect pasting
document.getElementById('confirmEmail').addEventListener('paste', function(e) {
    this.setAttribute('data-pasted', 'true');
    // Still prevent the actual paste
    e.preventDefault();
    return false;
});

// Reset the paste flag on typing
document.getElementById('confirmEmail').addEventListener('keydown', function() {
    this.setAttribute('data-pasted', 'false');
});



function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showOutput(message, type) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = message;
    outputDiv.style.display = 'block';
    outputDiv.style.backgroundColor = type === 'error' ? '#ffebee' : '#e8f5e9';
    outputDiv.style.color = type === 'error' ? '#c62828' : '#2e7d32';
}