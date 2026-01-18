async function init() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        const { images, settings } = data;
        const slideshow = document.getElementById('slideshow');
        const attribution = document.getElementById('attribution');
        const copyBtn = document.getElementById('copyBtn');
        const aboutBtn = document.getElementById('aboutBtn');
        const textArea = document.getElementById('myTextArea');
        
        let currentIndex = 0;
        const slideElements = [];

        // Build Slideshow
        images.forEach((img, i) => {
            const div = document.createElement('div');
            div.className = 'slide';
            div.style.backgroundImage = `url('${img.filename}')`;
            if (i === 0) div.classList.add('active');
            slideshow.appendChild(div);
            slideElements.push(div);
        });

        attribution.innerHTML = images[0].attribution;

        // fetch the .txt file and convert the response to .text()
        const textResponse = await fetch('prompt.txt');
        if (textResponse.ok) {
            const rawText = await textResponse.text();
            textArea.value = rawText; // Inject text into textarea
        } else {
            textArea.value = "Error: Could not load prompt.txt";
        }

        // Slide Logic
        setInterval(() => {
            slideElements[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slideElements.length;
            slideElements[currentIndex].classList.add('active');
            attribution.innerHTML = images[currentIndex].attribution;
        }, settings.speed);

        // Copy Button Logic
        copyBtn.addEventListener('click', () => {
            textArea.select();
            navigator.clipboard.writeText(textArea.value).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "COPIED!";
                setTimeout(() => copyBtn.innerText = originalText, 2000);
            });
        });


        aboutBtn.addEventListener('click', () => {
            window.location.href = 'about.html';
        });

    } catch (e) {
        console.error("Initialization failed:", e);
    }
}

window.addEventListener('DOMContentLoaded', init);