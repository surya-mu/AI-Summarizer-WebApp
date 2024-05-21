const axios = require("axios");

async function summarizeText(text) {
  const data = JSON.stringify({
    inputs: text,
    parameters: {
      max_length: 100,
      min_length: 30
    }
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEN
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    return response.data[0].summary_text;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = summarizeText;
