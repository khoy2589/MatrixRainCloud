// Array of colors for animation
const colors = ["#ffaa00", "#55aaff", "#55ff55", "#ff5555"];
let colorIndex = 0;

// Function to update the color
function updateColor() {
  // Get the current color
  const currentColor = colors[colorIndex];
  // Update the --clr1 variable
  document.documentElement.style.setProperty("--clr1", currentColor);
  // Update the cloud's background
  const cloud = document.querySelector(".cloud");
  cloud.style.backgroundColor = currentColor;
  cloud.style.filter = `drop-shadow(0 0 35px ${currentColor})`;
  // Update the text color inside the cloud
  const cloudText = cloud.querySelector("h2");
  cloudText.style.backgroundColor = currentColor;
  // All symbols' color is updated dynamically via CSS transition
  const drops = document.querySelectorAll(".drop");
  drops.forEach((drop) => {
    drop.style.color = currentColor;
  });
  // Move to the next color
  colorIndex = (colorIndex + 1) % colors.length;
}

// Initial color change
updateColor();

// Start updating the color every 1 second
setInterval(updateColor, 1000); // Interval of 1 second

// Function to create a falling symbol with delay
function createFallingDropWithDelay(content) {
  const drop = document.createElement("div");
  drop.classList.add("drop");
  drop.textContent = content;

  // Set a random initial position
  const randomLeft = Math.random() * 100; // Position from 0% to 100%
  drop.style.left = `${randomLeft}%`;

  // Generate random horizontal spread
  const horizontalSpread = (Math.random() - 0.5) * 260; // Spread between -130px and +130px
  drop.style.setProperty("--horizontalSpread", `${horizontalSpread}px`);

  // Add the symbol to the falling stream
  document.getElementById("drops").appendChild(drop);

  // Delay before the drop starts falling
  setTimeout(() => {
    drop.style.animation = "drop-fall 3s linear forwards";
  }, 100); // Delay before starting to fall

  // Remove the symbol after a delay
  setTimeout(() => {
    drop.remove();
  }, 3200); // 200 ms delay + 3 seconds of falling
}

// Generate symbols
function generateSourceDrop() {
  const symbolsPerTick = 2; // Number of symbols per tick
  for (let i = 0; i < symbolsPerTick; i++) {
    // const content = ["@", "#", "$", "%", "&", "*"] /* Defalut Rain text */
    const content = ["K", "L", "U", "A", "I"][Math.floor(Math.random() * 6)];
    createFallingDropWithDelay(content);
  }
}

// Interval for symbol appearance
setInterval(generateSourceDrop, 1); // Interval of 1 millisecond
