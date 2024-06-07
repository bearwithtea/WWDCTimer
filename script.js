// Set the date we're counting down to
var countDownDate = new Date("Jun 10, 2024 10:00:00").getTime();

var countdownFunction;

function updateCountdown() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="countdown"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "WWDC2024 is now!";
    }
}

// Call the function once immediately when the page loads
updateCountdown();

// Then update the countdown every second thereafter
countdownFunction = setInterval(updateCountdown, 1000);

// Fetch the vote results from the server
// Fetch the vote results from the server
fetch('/results')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching results');
    }
    return response.json();
  }) // Parse the JSON from the response
  .then(votes => {
    // Now `votes` is an object with the vote counts
    // You can use this data to update the DOM

    // Call the updateGraph function with the vote data
    updateGraph(votes);
  })
  .catch(error => console.error('Error:', error));

// public/client.js
document.getElementById('vote-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the selected vote option
    var vote = document.querySelector('input[name="vote"]:checked').value;
  
    console.log('Submitting vote:', vote); // Debugging line

fetch('/submit-vote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    vote: vote, // Replace this with the actual vote
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error submitting vote');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    // `data` is already a JavaScript object, no need to parse
    var votes = data;

    // Create a string to hold the HTML
    var html = '';

    // Loop through each vote and add it to the HTML string

    var optionNames = {
      "option1": "AI",
      "option2": "Siri",
      "option3": "AirPods",
      "option4": "OS"
    };

    // Loop through each vote and add it to the HTML string
    for (var vote in votes) {
      var height = votes[vote] * 5; // Adjust the multiplier to scale the bars appropriately
      html += '<div class="bar-container">';
      html += '<div class="bar" style="height: ' + height + 'px"></div>';
      html += '<div class="option">' + optionNames[vote] + ': ' + votes[vote] + '</div>';
      html += '</div>';
    }

    // Insert the HTML into the page
    document.getElementById('results').innerHTML = html;
  })
  .catch((error) => {
    console.error('Error:', error); // Debugging line
    document.getElementById('error-message').textContent = error.message;
  });

  // Function to update the graph
function updateGraph(votes) {
  // Create a string to hold the HTML
  var html = '';

  var optionNames = {
    "option1": "AI",
    "option2": "Siri",
    "option3": "AirPods",
    "option4": "OS"
  };

  // Loop through each vote and add it to the HTML string
  for (var vote in votes) {
    var height = votes[vote] * 5; // Adjust the multiplier to scale the bars appropriately
    html += '<div class="bar-container">';
    html += '<div class="bar" style="height: ' + height + 'px"></div>';
    html += '<div class="option">' + optionNames[vote] + ': ' + votes[vote] + '</div>';
    html += '</div>';
  }

  // Insert the HTML into the page
  document.getElementById('results').innerHTML = html;
}

// Fetch the current vote counts when the page is first loaded
fetch('/current-votes') // Replace this with the actual URL
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error fetching vote counts');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    updateGraph(data);
  })
  .catch((error) => {
    console.error('Error:', error); // Debugging line
    document.getElementById('error-message').textContent = error.message;
  });

// Submit a vote
function submitVote(vote) {
  fetch('/submit-vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      vote: vote, // Replace this with the actual vote
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error submitting vote');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      updateGraph(data);
    })
    .catch((error) => {
      console.error('Error:', error); // Debugging line
      document.getElementById('error-message').textContent = error.message;
    });
}

});