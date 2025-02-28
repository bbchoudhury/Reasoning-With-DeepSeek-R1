async function getReasoningResponse() {
    const inputText = document.getElementById("inputText").value;
    const responseContainer = document.getElementById("responseContainer");

    if (!inputText) {
        responseContainer.innerHTML = "<p style='color: red;'>Please enter a problem statement.</p>";
        return;
    }

    responseContainer.innerHTML = "<p>Processing...</p>";

    try {
        const response = await fetch("http://localhost:8000/reason", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: inputText })
        });

        const data = await response.json();
        const formattedResponse = formatResponse(data.response);
        responseContainer.innerHTML = `<p><strong>Answer:</strong></p> ${formattedResponse}`;
    } catch (error) {
        responseContainer.innerHTML = `<p style='color: red;'>Error fetching response.</p>`;
    }
}

// Function to format text into paragraphs with max 40 words per paragraph
function formatResponse(text) {
    const words = text.split(" ");
    let formattedText = "";
    let currentParagraph = [];

    words.forEach(word => {
        currentParagraph.push(word);
        if (currentParagraph.length >= 40) {
            formattedText += `<p>${currentParagraph.join(" ")}</p>`;
            currentParagraph = [];
        }
    });

    if (currentParagraph.length > 0) {
        formattedText += `<p>${currentParagraph.join(" ")}</p>`;
    }

    return formattedText;
}
