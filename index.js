const KEY = ENV["GOOGLE_API_KEY"]
const URL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${KEY}`;



// Status Management
const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportError = (message, errors) => {
  let content = `<p>${message}</p><ul>`;
  for (const field in errors) {
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += "</ul>";
  reportStatus(content);
};


// Load Wonders
const loadWonders = () => {
  reportStatus('Loading Wonders...');

  const wonderList = $('#wonder-list');
  wonderList.empty();

  axios.get(URL)
    .then((response) => {
      reportStatus(`Successfully loaded ${response.data.length} wonders`);
      response.data.forEach((wonder) => {
        wonderList.append(`<li>${wonder.name}</li>`);
      });
    })
    .catch((error) => {
      reportStatus(`Encountered an error while loading pets: ${error.message}`);
      console.log(error);
    });
};
