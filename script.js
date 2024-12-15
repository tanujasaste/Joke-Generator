// Set default category to "Any"
let selectedCategory = "Any";

// Function to set the category based on user's mood selection
function setCategory(category) {
  selectedCategory = category;
  document.querySelector('.joke-text').textContent = `Fetching a ${category} joke...`;
  generateJoke();
}

// Function to fetch and display a joke from the JokeAPI
async function generateJoke() {
  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/${selectedCategory}`);
    const data = await response.json();

    let jokeText;
    if (data.type === 'single') {
      // Single-part joke
      jokeText = data.joke;
    } else if (data.type === 'twopart') {
      // Two-part joke
      jokeText = `${data.setup} - ${data.delivery}`;
    } else {
      jokeText = "Oops! Couldn't fetch a joke. Try again!";
    }
    
    // Display the joke
    document.querySelector('.joke-text').textContent = jokeText;
  } catch (error) {
    console.error("Error fetching joke:", error);
    document.querySelector('.joke-text').textContent = "Sorry, couldn't load a joke right now!";
  }
}