const statusButton = document.getElementById("statusButton");
const result = document.getElementById("result");

const setLoadingState = () => {
  result.textContent = "Contacting server...";
};

const renderStatus = (data) => {
  result.innerHTML = `
    <strong>${data.message}</strong>
    <br>
    Environment: ${data.environment}
    <br>
    Server time: ${data.time}
  `;
};

const handleStatusError = (error) => {
  result.textContent = "Could not connect to the server.";
  console.error(error);
};

const fetchServerStatus = async () => {
  const response = await fetch("/api/status");

  if (!response.ok) {
    throw new Error("Server returned an error");
  }

  return response.json();
};

statusButton.addEventListener("click", async () => {
  setLoadingState();

  try {
    const data = await fetchServerStatus();
    renderStatus(data);
  } catch (error) {
    handleStatusError(error);
  }
});
