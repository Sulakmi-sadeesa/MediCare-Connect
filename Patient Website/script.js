document.addEventListener('DOMContentLoaded', () => {
  
  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // --- Active Navigation Highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // --- Hero Slider (Only on Home Page) ---
  const heroContent = document.getElementById('heroContent');
  if (heroContent) {
    const slides = [
      {
        title: "Your Health, Our Priority",
        text: "Delivering safe, personalized healthcare through dedicated professionals and advanced medical services.",
        btnText: "View Our Doctor Panel",
        btnLink: "doctors.html"
      },
      {
        title: "Specialized Care for Every Need",
        text: "From routine consultations to advanced treatments, our departments are committed to delivering exceptional patient care.",
        btnText: "View Our Departments",
        btnLink: "services.html"
      },
      {
        title: "Caring for Our Community",
        text: "For years, Wadduwa Clinic has been committed to providing trusted, high-quality healthcare through experienced professionals.",
        btnText: "Learn More About Us",
        btnLink: "about.html"
      }
    ];

    let currentSlide = 0;
    const dots = document.querySelectorAll('.slider-dots span');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    function updateSlide(index) {
      // Fade out
      heroContent.style.opacity = '0';
      
      setTimeout(() => {
        const slide = slides[index];
        heroContent.innerHTML = `
          <h1>${slide.title}</h1>
          <p>${slide.text}</p>
          <a href="${slide.btnLink}" class="btn">${slide.btnText}</a>
        `;
        // Fade in
        heroContent.style.opacity = '1';
      }, 300);

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
      });

      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
      });

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          currentSlide = index;
          updateSlide(currentSlide);
        });
      });

      // Auto slide every 6 seconds
      setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
      }, 6000);
    }
  }

  // --- Doctor Details Logic (Only on doctor-details.html) ---
  const docDetailName = document.getElementById('docDetailName');
  if (docDetailName) {
    // Get doctor ID from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('id') || 'default';

    const doctorData = {
      'nalaka': {
        name: 'Dr. Nalaka Fernando',
        specialty: 'General Physician',
        exp: '15+ Years Experience',
        bio: 'Compassionate and dedicated doctor with extensive experience in treating a wide range of general health issues.',
        about: 'Dr. Nalaka Fernando is a highly experienced General Physician committed to providing quality healthcare to patients of all ages. He specializes in the diagnosis, treatment and prevention of general medical conditions.',
        quals: ['MBBS-University of Colombo', 'MD in General Medicine', 'Diploma in Family Medicine']
      },
      'priyantha': {
        name: 'Dr. Priyantha Silva',
        specialty: 'Cardiologist',
        exp: '20+ Years Experience',
        bio: 'Expert in cardiovascular diseases with a focus on preventive cardiology and advanced treatments.',
        about: 'Dr. Priyantha Silva has been a leading Cardiologist for over two decades. He is dedicated to improving heart health through innovative treatments and patient education.',
        quals: ['MBBS-University of Colombo', 'MD in Cardiology', 'Fellowship in Interventional Cardiology']
      },
      'chamari': {
        name: 'Dr. Chamari Perera',
        specialty: 'Orthopedic Surgeon',
        exp: '12+ Years Experience',
        bio: 'Specializes in joint replacement, sports injuries, and minimally invasive orthopedic procedures.',
        about: 'Dr. Chamari Perera is a skilled Orthopedic Surgeon committed to helping patients regain mobility and live pain-free lives through advanced surgical and non-surgical treatments.',
        quals: ['MBBS-University of Peradeniya', 'MS in Orthopedics', 'Fellowship in Arthroplasty']
      },
      'dinithi': {
        name: 'Dr. Dinithi Bandara',
        specialty: 'Dermatologist',
        exp: '8+ Years Experience',
        bio: 'Provides comprehensive care for skin, hair, and nail conditions with a patient-centric approach.',
        about: 'Dr. Dinithi Bandara is a dedicated Dermatologist offering a wide range of treatments from acne management to advanced cosmetic dermatology.',
        quals: ['MBBS-University of Colombo', 'MD in Dermatology', 'Diploma in Aesthetic Medicine']
      },
      'kavinda': {
        name: 'Dr. Kavinda Jayawardena',
        specialty: 'Pediatrician',
        exp: '10+ Years Experience',
        bio: 'Dedicated to the health and well-being of infants, children, and adolescents.',
        about: 'Dr. Kavinda Jayawardena is a compassionate Pediatrician who focuses on preventive care and the treatment of childhood illnesses in a friendly environment.',
        quals: ['MBBS-University of Ruhuna', 'MD in Pediatrics', 'Diploma in Child Health']
      },
      'nishani': {
        name: 'Dr. Nishani Weerasinghe',
        specialty: 'Gynecologist',
        exp: '14+ Years Experience',
        bio: 'Expert in women\'s health, prenatal care, and reproductive medicine.',
        about: 'Dr. Nishani Weerasinghe provides comprehensive obstetric and gynecological care, supporting women through all stages of life with empathy and expertise.',
        quals: ['MBBS-University of Colombo', 'MS in Obstetrics & Gynecology', 'Fellowship in Reproductive Medicine']
      }
    };

    const data = doctorData[docId] || doctorData['nalaka'];

    docDetailName.textContent = data.name;
    document.getElementById('docDetailSpecialty').textContent = data.specialty;
    document.getElementById('docDetailExp').textContent = data.exp;
    document.getElementById('docDetailBio').textContent = data.bio;
    document.getElementById('docDetailAbout').textContent = data.about;

    const qualList = document.getElementById('docDetailQuals');
    qualList.innerHTML = data.quals.map(q => `<li>${q}</li>`).join('');
  }

  // --- AI Assistant Logic (Only on ai-assistant.html) ---
  const aiInput = document.getElementById('aiInput');
  const aiSendBtn = document.getElementById('aiSendBtn');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');

  if (aiInput && aiSendBtn) {
    function handleAiSubmit() {
      const query = aiInput.value.trim();
      if (query) {
        // Simulate a bot response
        alert(`Medi AI Assistant:\n\nThank you for your question: "${query}".\n\nI am currently a frontend demo. In a full version, I would provide medical information here. Please consult a doctor for professional advice.`);
        aiInput.value = '';
      }
    }

    aiSendBtn.addEventListener('click', handleAiSubmit);
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleAiSubmit();
      }
    });

    suggestionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        aiInput.value = btn.textContent.replace('💬 ', '').trim();
        handleAiSubmit();
      });
    });
  }

});