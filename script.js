// Three.js 3D Background
const container = document.getElementById('canvas-container');
let scene, camera, renderer, particles;

function initThreeJS() {
  // Scene
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  
  // Particles
  const particleCount = 100;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    
    colors[i * 3] = 0.4 + Math.random() * 0.6; // R
    colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G
    colors[i * 3 + 2] = 0.6 + Math.random() * 0.4; // B
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  
  // Animation
  animate();
  
  // Handle resize
  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);
  
  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.001;
  
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Create floating particles for header
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 5px and 15px
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    particlesContainer.appendChild(particle);
  }
}

// Parallax effect
function setupParallax() {
  const elements = document.querySelectorAll('.profile-section, .experience-item, .contact-card, section h2');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    elements.forEach(element => {
      const elementPosition = element.offsetTop;
      const distance = (scrollPosition - elementPosition) * 0.1;
      
      if (Math.abs(distance) < 100) {
        element.style.transform = `translateZ(${distance}px)`;
      }
    });
  });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
  initThreeJS();
  createParticles();
  setupParallax();
  
  // Initialize tilt.js on elements
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 5,
    speed: 400,
    glare: true,
    'max-glare': 0.2,
  });
  function animateProjectsOnScroll() {
  const projectCards = document.querySelectorAll('.project-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  projectCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
}

// Initialize skill tags animation
function initSkillTags() {
  const tags = document.querySelectorAll('.skill-tag');
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'scale(1.1)';
      tag.style.boxShadow = '0 5px 15px rgba(110, 72, 170, 0.3)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'scale(1)';
      tag.style.boxShadow = 'none';
    });
  });
}

// Update your load event listener
window.addEventListener('load', () => {
  initThreeJS();
  createParticles();
  setupParallax();
  animateProjectsOnScroll();
  initSkillTags();
  
  // Rest of your existing load code...
});
  
  // Smooth scrolling for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });
});