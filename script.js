// Modified version without preferredLanguage storage functionality

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1366003158681255987/w45jFB1OFOOBI4VjiZ2HPBjltU1Nip2H9q_t5jNisCMOHbegv2Yk86V1Y02cSOiaI5WN';
const IP_API = 'https://api.ipify.org?format=json';

// Toast notification system
function showToast(message, type = 'success', duration = 3000) {
  const toastContainer = document.querySelector('.toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' 
    ? '<i class="fas fa-check-circle"></i>' 
    : '<i class="fas fa-exclamation-circle"></i>';
  
  toast.innerHTML = `${icon} ${message}`;
  toastContainer.appendChild(toast);
  
  // Trigger reflow to ensure animation works
  toast.offsetHeight;
  
  setTimeout(() => toast.classList.add('show'), 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('languageModal');
  const select = document.getElementById('languageSelect');
  const confirmBtn = document.getElementById('langConfirmBtn');
  const welcome = document.getElementById('welcome');
  const about = document.getElementById('about');
  const welcomeText = document.getElementById('welcomeText');
  const welcomeAudio = document.getElementById('welcomeAudio');
  const welcomeImages = document.getElementById('welcomeImages');
  const musicRecBtn = document.getElementById('musicRecBtn');
  const musicListSection = document.getElementById('musicListSection');
  const qnaBtn = document.getElementById('qnaBtn');
  const qnaList = document.getElementById('qnaList');

  const defaultSongs = {
    en: [
      { title: 'Bohemian Rhapsody', artist: 'Queen' },
      { title: 'Hotel California', artist: 'The Eagles' },
      { title: 'Imagine', artist: 'John Lennon' },
      { title: 'Shape of You', artist: 'Ed Sheeran' }
    ],
    fr: [
      { title: 'La Vie en Rose', artist: 'Édith Piaf' },
      { title: 'Comme des Enfants', artist: 'Cœur de Pirate' },
      { title: 'Dernière danse', artist: 'Indila' },
      { title: 'Papaoutai', artist: 'Stromae' }
    ]
  };

  // Current language
  let currentLang = 'en';

  confirmBtn.addEventListener('click', () => {
    const lang = select.value;
    if (!lang) return alert('Please choose a language.');
    
    currentLang = lang;

    // Hide modal with fade out animation
    modal.style.opacity = '0';
    modal.style.backdropFilter = 'blur(0px)';
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.add('hidden');
    }, 500);

    // Setup welcome section
    welcomeImages.innerHTML = '';
    if (lang === 'fr') {
      welcomeText.textContent = 'Bienvenue en France!';
      welcomeAudio.src = 'audio/french.mp3';
      welcomeAudio.play().catch(e => console.log('Audio play failed:', e));
      welcomeImages.innerHTML = `
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" alt="Eiffel Tower" class="animate-float">
        <img src="https://images.pexels.com/photos/9061362/pexels-photo-9061362.jpeg" alt="louvre museum" class="animate-float">
        <img src="https://imgs.search.brave.com/9RhsuhNy2Np6nbVPUpcjSEZCGtq5QZC8tVkdbdcdA7w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LnBo/b3RvLXBheXNhZ2Uu/Y29tL2FsYnVtcy91/c2VycGljcy8xMDAw/MS9ub3JtYWxfTGUt/cGFydmlzLWRlLU5v/dHJlLURhbWUtYXBy/ZXMtbGEtcGx1aWUu/anBnP3Jlc2l6ZT01/MjUsNzg4" alt="Notre-Dame de Paris" class="animate-float" style="animation-delay: 0.5s">
      `;
      showToast('Bienvenue! Language set to French', 'success');
    } else {
      welcomeText.textContent = 'Welcome!';
      welcomeAudio.pause(); welcomeAudio.src = '';
      welcomeImages.innerHTML = `
        <img src="https://imgs.search.brave.com/jxvA6dDAWCWfslCxLEUkksnOMrt6OKIx-PTFSE-YSjY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzE4LzQxLzUw/LzM2MF9GXzkxODQx/NTA4N18xbklGMkxp/b0ZpRXVYVGxMZmpR/cXcxcnJSNjhwVE9S/Si5qcGc" alt="London" class="animate-float">
        <img src="https://imgs.search.brave.com/4YBsJ_lt5jsVSzn8GK2jBYGmvkVk3zi3eKS6V2X0UPE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjM2/MTQzNDU2L3Bob3Rv/L3Rhai1tYWhhbC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/Q0FYUzJ5Tk1UX1hX/OHFOQkdlT3BjZXcy/SGpHaG9hLTRGU0gz/dlJVMzBzMD0" alt="Taj Mahal" class="animate-float">
        <img src="https://imgs.search.brave.com/miCqhJ1II6yP9RecTKP-2N_9Q43mHWVO2ul_LnsRqmM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8w/OS8wNS8yMC80My9z/dGF0dWUtb2YtbGli/ZXJ0eS05MjUxOTVf/NjQwLmpwZw" alt="Statue Of Liberty" class="animate-float" style="animation-delay: 0.5s">
      `;
      showToast('Welcome! Language set to English', 'success');
    }
    
    // Show welcome with animation
    welcome.classList.remove('hidden');
    requestAnimationFrame(() => welcome.classList.add('visible'));

    // After 5s, hide welcome and show about with proper animations
    setTimeout(() => {
      welcome.classList.remove('visible');
      
      // Stop the audio when transitioning to About Me section
      welcomeAudio.pause();
      welcomeAudio.currentTime = 0;
      
      setTimeout(() => {
        welcome.classList.add('hidden');
        about.classList.remove('hidden');
        requestAnimationFrame(() => about.classList.add('visible'));
      }, 600);
    }, 5000);
  });

  musicRecBtn.addEventListener('click', async () => {
    // If music section is already shown, just focus on the input field
    if (!musicListSection.classList.contains('hidden')) {
      const input = musicListSection.querySelector('input');
      if (input) {
        input.focus();
        return;
      }
    }
    
    // Show music recommendations with animation
    musicListSection.classList.remove('hidden');
    
    // Get songs for current language
    const songs = defaultSongs[currentLang] || defaultSongs.en;
    
    // Populate music section with enhanced design
    musicListSection.innerHTML = `
      <h3><i class="fas fa-headphones-alt"></i> Recommended Music</h3>
      <ul>
        ${songs.map(song => `
          <li class="animate-fade" style="animation-delay: ${songs.indexOf(song) * 0.15}s">
            <strong>${song.title}</strong> by ${song.artist}
          </li>
        `).join('')}
      </ul>
      
      <div class="music-form animate-up" style="animation-delay: 0.5s">
        <h4><i class="fas fa-plus-circle"></i> Share Your Recommendation</h4>
        <div class="input-group">
          <input type="text" id="songInput" placeholder="Song title - Artist" />
          <button id="submitSong"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    `;
    
    // Add event listener to the submit button
    const submitBtn = musicListSection.querySelector('#submitSong');
    const songInput = musicListSection.querySelector('#songInput');
    
    submitBtn.addEventListener('click', async () => {
      const userSong = songInput.value.trim();
      if (!userSong) {
        showToast('Please enter a song recommendation', 'error');
        return;
      }
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      try {
        // Get user's IP
        const res = await fetch(IP_API);
        const { ip } = await res.json();
        
        // Prepare webhook payload
        const payload = {
          embeds: [{
            title: 'New Music Recommendation',
            fields: [
              { name: 'Sent by', value: ip },
              { name: 'Recommendation', value: userSong }
            ],
            color: 0x5cb85c,
            timestamp: new Date().toISOString()
          }]
        };
        
        // Send to Discord webhook
        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (webhookResponse.ok) {
          // Add the song to the list with nice animation
          const ul = musicListSection.querySelector('ul');
          const li = document.createElement('li');
          li.textContent = `${userSong} (Your recommendation)`;
          li.classList.add('animate-fade');
          li.style.borderLeft = '3px solid var(--primary)';
          li.style.paddingLeft = '27px';
          ul.appendChild(li);
          
          // Clear input
          songInput.value = '';
          
          showToast('Thank you for your recommendation!', 'success');
        } else {
          showToast('Error sending recommendation', 'error');
        }
      } catch (e) {
        console.error(e);
        showToast('Network error. Please try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
      }
    });
    
    // Allow pressing Enter to submit
    songInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submitBtn.click();
      }
    });
    
    // Focus on input
    setTimeout(() => songInput.focus(), 600);
  });

  qnaBtn.addEventListener('click', () => {
    // If qnaList is not hidden, show dialog directly
    if (!qnaList.classList.contains('hidden')) {
      showAskDialog();
      return;
    }
    
    // Show QnA section if it's hidden
    qnaList.innerHTML = '<h3><i class="fas fa-question-circle"></i> Your Questions</h3>';
    qnaList.classList.remove('hidden');
    
    // Show ask dialog
    showAskDialog();
  });
  
  function showAskDialog() {
    // Create a modal for better UX
    const askModal = document.createElement('div');
    askModal.className = 'modal animate-fade';
    askModal.style.zIndex = '1001';
    
    askModal.innerHTML = `
      <div class="modal-content animate-scale question-dialog">
        <h2>Ask Me Anything</h2>
        <textarea id="questionInput" placeholder="Type your question here..."></textarea>
        <div class="dialog-buttons">
          <button id="cancelQuestion" class="cancel">Cancel</button>
          <button id="submitQuestion">Send Question</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(askModal);
    
    // Get form elements
    const questionInput = askModal.querySelector('#questionInput');
    const cancelBtn = askModal.querySelector('#cancelQuestion');
    const submitBtn = askModal.querySelector('#submitQuestion');
    
    // Focus on input
    setTimeout(() => questionInput.focus(), 100);
    
    // Add event listeners
    cancelBtn.addEventListener('click', () => {
      askModal.style.opacity = '0';
      setTimeout(() => askModal.remove(), 500);
    });
    
    submitBtn.addEventListener('click', async () => {
      const question = questionInput.value.trim();
      if (!question) {
        showToast('Please enter a question', 'error');
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      try {
        // Get user's IP
        const res = await fetch(IP_API);
        const { ip } = await res.json();
        
        // Prepare webhook payload
        const payload = {
          embeds: [{
            title: 'New Question',
            fields: [
              { name: 'Sent by', value: ip },
              { name: 'Question', value: question }
            ],
            color: 0x17a2b8,
            timestamp: new Date().toISOString()
          }]
        };
        
        // Send to Discord webhook
        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (webhookResponse.ok) {
          // Close the modal
          askModal.remove();
          
          // Add the question to the QnA list
          const qnaElement = document.createElement('p');
          qnaElement.classList.add('animate-fade');
          qnaElement.innerHTML = `
            <strong><i class="fas fa-question"></i> Your Question:</strong>
            ${question}
            <br>
            <strong><i class="fas fa-comment-dots"></i> Answer:</strong>
            Thank you for your question! I'll respond to you soon.
          `;
          
          qnaList.appendChild(qnaElement);
          showToast('Question received! I\'ll respond soon.', 'success');
        } else {
          showToast('Error sending question', 'error');
        }
      } catch (e) {
        console.error(e);
        showToast('Network error. Please try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Question';
      }
    });
    
    // Allow pressing Enter to submit (Shift+Enter for new line)
    questionInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitBtn.click();
      }
    });
  }

  // Add escape key functionality to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal:not(.hidden)');
      openModals.forEach(modal => {
        if (modal.id === 'languageModal' && !welcome.classList.contains('visible')) {
          modal.style.opacity = '0';
          setTimeout(() => modal.classList.add('hidden'), 500);
        } else if (modal !== document.getElementById('languageModal')) {
          modal.style.opacity = '0';
          setTimeout(() => modal.remove(), 500);
        }
      });
    }
  });

  // Optional: Add animation to sections when they come into view
  function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    sections.forEach(section => observer.observe(section));
  }
  
  // Initialize animations if supported
  if ('IntersectionObserver' in window) {
    animateSectionsOnScroll();
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('visible');
    });
  }
});
