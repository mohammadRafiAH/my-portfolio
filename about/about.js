
const apiKey = '3e9de597e24d5aabf80fc403c14f11f9';
const cityName = 'Kerala';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

// Function to update the weather content
function updateWeatherContent(temperature) {
  const weatherSpan = document.querySelector('.weather');
  weatherSpan.textContent = `${temperature}°C`;
}

// Fetch weather data and update content
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.main && data.main.temp) {
      const temperatureCelsius = data.main.temp;
      updateWeatherContent(temperatureCelsius);
    } else {
      updateWeatherContent('30');
    }
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    updateWeatherContent('Error fetching weather data');
  });

 
  const speakButton = document.getElementById("speakButton");
  const textToSpeak = document.getElementById("textToSpeak");
  const speakButtonIcon = document.querySelector(".fa-volume-high");
  
  // Check if SpeechSynthesis is supported in the browser
  if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
  
      // Get the list of available voices
      const voices = synthesis.getVoices();
      const maleVoice = voices.find(voice => {
        return voice.name.includes("Male") && !voice.name.includes("Female");
    });
  
      speakButton.addEventListener("click", () => {
          const text = textToSpeak.textContent;
          const utterance = new SpeechSynthesisUtterance(text);

               
               // Add animation using JavaScript
               const animationDuration = 1500; // Animation duration in milliseconds
               const scaleFactor = 1.1; // Scale factor for zoom
               const opacityFactor = 0.5; // Opacity factor

               let startTime = null;

               function animateZoom(timestamp) {
                   if (!startTime) startTime = timestamp;

                   const elapsedTime = timestamp - startTime;
                   const progress = elapsedTime / animationDuration;

                   const scale = 1 + (scaleFactor - 1) * Math.sin(progress * Math.PI);
                   const opacity = 1 - (1 - opacityFactor) * Math.sin(progress * Math.PI);

                   speakButton.style.transform = `scale(${scale})`;
                   speakButton.style.opacity = opacity;

                   if (progress < 1) {
                       requestAnimationFrame(animateZoom);
                   } else {
                       startTime = null;
                       requestAnimationFrame(animateZoom);
                   }
               }

               animateZoom(); // Start the animation loop
                 // Listen for the end of speech
                    utterance.onend = () => {
                    speakButton.style.transform = "none"; // Reset scale
                    speakButton.style.opacity = "none"; // Reset opacity
                    };
               
        
          // Set the selected female voice
        /*  utterance.voice = femaleVoice;*/
  
          // Optional: Set speech rate and pitch
          utterance.rate = 1; // Speech rate, 1 = normal
          utterance.pitch = 1.2; // Speech pitch, 1 = normal
          utterance.volume = 1; // Half volume
  
          synthesis.speak(utterance);

           // Stop speech when the page is switched or refreshed
           window.addEventListener("beforeunload", () => {
            if (utterance && synthesis.speaking) {
                synthesis.cancel();
            }
        });

        // Stop speech when the page becomes hidden
        document.addEventListener("visibilitychange", () => {
            if (document.hidden && utterance && synthesis.speaking) {
                synthesis.cancel();
            }
        });
      });
  } else {
      // Speech synthesis not supported
      speakButton.disabled = true;
      speakButton.textContent = "Speech Not Supported";
  }