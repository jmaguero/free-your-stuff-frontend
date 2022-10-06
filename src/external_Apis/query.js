const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://amazon24.p.rapidapi.com/api/category',
  params: { country: 'US' },
  headers: {
    'X-RapidAPI-Key': 'f3e1d45fb1mshe20380395a3d645p1d156bjsn96295dcaadf0',
    'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});