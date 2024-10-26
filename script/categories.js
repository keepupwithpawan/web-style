const home = document.getElementById('logo');
const about = document.getElementById('about');
const contact = document.getElementById('contact');
const buttons = document.getElementById('buttons');
const cards = document.getElementById('cards');
const carousels = document.getElementById('carousels');
const navbars = document.getElementById('navbars');
const loaders = document.getElementById('loaders');
const footers = document.getElementById('footers');

home.addEventListener('click', () => {
    location.href = 'index.html';
});

about.addEventListener('click', () => {
    location.href = 'about.html';
});

contact.addEventListener('click', () => {
    location.href = 'contact.html';
});

buttons.addEventListener('click', () => {
    location.href = 'buttons.html';
});

cards.addEventListener('click', () => {
    location.href = 'cards.html';
});

carousels.addEventListener('click', () => {
    location.href = 'carousels.html';
});

navbars.addEventListener('click', () => {
    location.href = 'navbars.html';
});

loaders.addEventListener('click', () => {
    location.href = 'loaders.html';
});

footers.addEventListener('click', () => {
    location.href = 'footers.html';
});

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

