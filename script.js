document.querySelectorAll('input[name="type"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const textInput = document.getElementById('text-input');
        if (this.value === 'text') {
            textInput.placeholder = 'Enter text';
        } else if (this.value === 'url') {
            textInput.placeholder = 'Enter URL';
        }
    });
});

document.getElementById('generate-btn').addEventListener('click', function() {
    const textInput = document.getElementById('text-input').value.trim();
    const qrCodeContainer = document.getElementById('qrcode');
    const size = parseInt(document.getElementById('size-select').value);
    const downloadBtn = document.getElementById('download-btn');
    const type = document.querySelector('input[name="type"]:checked').value;

    // Clear previous QR code
    qrCodeContainer.innerHTML = '';
    downloadBtn.style.display = 'none';

    // Generate new QR code
    if (textInput) {
        let input = textInput;

        // Validate and prepare URL if selected
        if (type === 'url') {
            if (!/^https?:\/\//i.test(textInput)) {
                input = 'http://' + textInput;
            }
        }

        const qrCode = new QRCode(qrCodeContainer, {
            text: input,
            width: size,
            height: size,
        });

        // Show download button after QR code is generated
        setTimeout(() => {
            const qrCanvas = qrCodeContainer.querySelector('canvas');
            if (qrCanvas) {
                downloadBtn.style.display = 'inline-block';
                downloadBtn.onclick = () => {
                    const link = document.createElement('a');
                    link.href = qrCanvas.toDataURL();
                    link.download = 'qrcode.png';
                    link.click();
                };
            }
        }, 100);
    } else {
        alert('Please enter some text or URL to generate a QR code.');
    }
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('text-input').value = '';
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('download-btn').style.display = 'none';
});
