let copyText = document.querySelector(".result-content");
copyText.querySelector("button").addEventListener("click", function() {
  let input = copyText.querySelector("input"); 
  input.select();
  navigator.clipboard.writeText(input.value).then(() => {
    copyText.classList.add("active");
    window.getSelection().removeAllRanges();
    setTimeout(function() {
      copyText.classList.remove("active");    
    }, 2500);
  });
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('plainText').value = '';
    document.getElementById('encryptedMessage').value = '';
    document.getElementById('encryptedMessageContainer').style.display = 'none';
    document.getElementById('hashAlgorithm').value = '';
});


document.getElementById('encryptForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const plainText = document.getElementById('plainText').value;
    const algorithm = document.getElementById('hashAlgorithm').value;
    if (plainText === "") {
        alert("Please enter a message to encrypt.");
        return;
    }
    if (!algorithm) {
        alert('Please select an encryption algorithm.');
        return;
    }
    hashMessage(plainText, algorithm).then(hashedMessage => {
        document.getElementById('encryptedMessage').value = hashedMessage;
        document.getElementById('encryptedMessageContainer').style.display = 'block';
    });
});

async function hashMessage(message, algorithm) {
    const encodedMessage = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest(algorithm, encodedMessage);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
