export const copyToClipboard = (text) => {
  const input = document.createElement("input");
  input.style.position = "fixed";
  input.style.opacity = 0;
  input.value = text;
  document.body.appendChild(input);

  input.select();
  input.setSelectionRange(0, text.length);

  let success = false;
  try {
    success = document.execCommand("copy");
  } catch (err) {
    console.error("Error copying to clipboard:", err);
  }

  document.body.removeChild(input);

  return success;
};
