const home = document.getElementById('logo');
const about = document.getElementById('about');
const contact = document.getElementById('contact');
const explore = document.getElementById('explore');

home.addEventListener('click', () => {
    location.href = 'index.html';
});

about.addEventListener('click', () => {
    location.href = 'about.html';
});

contact.addEventListener('click', () => {
    location.href = 'contact.html';
});

explore.addEventListener('click', () => {
    location.href = 'categories.html';
});

// Particles
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 80 // Mouse interaction radius
};

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle mouse movement
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle class
class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.color = color;
        this.density = Math.random() * 30 + 1;

        // Add velocity for subtle floating effect
        this.velocityX = (Math.random() * 1 - 0.5) * 0.3; // Small random velocity (horizontal)
        this.velocityY = (Math.random() * 1 - 0.5) * 0.3; // Small random velocity (vertical)
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15; // Slight glow effect
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Subtle floating effect by altering x and y positions continuously
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Boundary check to keep particles within the canvas
        if (this.x < 0 || this.x > canvas.width) this.velocityX = -this.velocityX;
        if (this.y < 0 || this.y > canvas.height) this.velocityY = -this.velocityY;

        // Handle interaction with mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;

            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
        }

        // // Ensure particles don't return too fast to their base positions
        // if (this.x !== this.baseX) {
        //     let dx = this.x - this.baseX;
        //     this.x -= dx / 40; // Slower return to original position
        // }
        // if (this.y !== this.baseY) {
        //     let dy = this.y - this.baseY;
        //     this.y -= dy / 40;
        // }
    }
}

// Initialize particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 5000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 0.5;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = 'rgba(255, 255, 255, ' + Math.random() * 0.7 + ')'; // Subtle glittering effect
        particlesArray.push(new Particle(x, y, size, color));
    }
}

// Animate the particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}

init();
animate();


// Cursor Animation
const cursor = document.getElementById("cursor");
const dotCount = 7;  // Number of trailing dots
const dotSize = 5;   // Size of the dots
let mousePosition = { x: 0, y: 0 };  // Mouse coordinates
let dots = [];  // Array to store dot instances
let isMouseInside = true; // Flag to track if the mouse is inside the window

// Dot class to create and manage individual dots
class Dot {
  constructor(index = 0) {
    this.index = index;
    this.x = 0;
    this.y = 0;
    this.element = document.createElement("span"); // Create a dot element
    this.element.style.width = `${dotSize}px`;
    this.element.style.height = `${dotSize}px`;
    this.element.style.position = 'absolute';
    this.element.style.borderRadius = '50%';
    this.element.style.backgroundColor = '#EFEFF0';
    this.element.style.opacity = 1;  // Initially visible
    cursor.appendChild(this.element);  // Append each dot to the cursor div
  }

  // Update the position of each dot
  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    TweenMax.set(this.element, { x: this.x, y: this.y });
  }

  // Method to hide the dot
  hide() {
    TweenMax.to(this.element, 0.2, { opacity: 0 });
  }

  // Method to show the dot
  show() {
    TweenMax.to(this.element, 0.2, { opacity: 1 });
  }
}

// Function to create the dots and store them in the dots array
function createDots() {
  for (let i = 0; i < dotCount; i++) {
    let dot = new Dot(i);
    dots.push(dot);
  }
}

// Function to update the cursor trail with smooth transitions
function updateDots() {
  // We iterate through each dot and make it follow the next one smoothly
  dots.forEach((dot, index, dots) => {
    let nextDot = dots[index - 1] || mousePosition;  // Get the next dot or mouse position for the first dot
    dot.x += (nextDot.x - dot.x) * 0.8;  // Smooth movement for first dot
    dot.y += (nextDot.y - dot.y) * 0.8;
    dot.updatePosition(dot.x, dot.y);
  });
}

// Mousemove event to track and update cursor position
window.addEventListener("mousemove", (event) => {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;

  // Ensure dots are visible when the cursor is inside the window
  if (!isMouseInside) {
    dots.forEach(dot => dot.show());
    isMouseInside = true;
  }
});

// Mouseleave event to hide the cursor dots when the mouse leaves the window
window.addEventListener("mouseleave", () => {
  isMouseInside = false;
  dots.forEach(dot => dot.hide());  // Hide all dots when the cursor leaves the window
});

// Mouseenter event to show the cursor dots when the mouse re-enters the window
window.addEventListener("mouseenter", () => {
  if (!isMouseInside) {
    dots.forEach(dot => dot.show());  // Show all dots when the cursor re-enters the window
    isMouseInside = true;
  }
});

// Animation loop for smooth trailing effect
function animateDots() {
  updateDots();
  requestAnimationFrame(animateDots);
}

// Initialize the cursor trail effect
createDots();
animateDots();

