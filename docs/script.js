const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength() {
  if (textArea.value.length > 200 && textArea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

async function submitData() {
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  try {
    const response = await fetch("https://ai-summarizer-webapp.onrender.com", { // update this URL
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text_to_summarize })
    });

    const data = await response.json();
    summarizedTextArea.value = data.summary;
    submitButton.classList.remove("submit-button--loading");
  } catch (error) {
    console.error(error.message);
    submitButton.classList.remove("submit-button--loading");
  }
}
