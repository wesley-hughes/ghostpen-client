export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('URL copied to clipboard');
      })
      .catch(() => {
        alert('Failed to copy the URL');
      });
  }
  