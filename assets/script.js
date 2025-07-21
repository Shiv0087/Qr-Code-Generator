const generateBtn = document.getElementById("generateBtn");
const qrCanvas = document.getElementById("qrCanvas");
const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

generateBtn.addEventListener("click", () => {
  const text = document.getElementById("qrText").value;
  if (!text.trim()) {
    alert("Please enter some text or URL.");
    return;
  }

  QRCode.toCanvas(qrCanvas, text, { width: 256 }, function (error) {
    if (error) console.error(error);
    else {
      const dataURL = qrCanvas.toDataURL();
      downloadBtn.href = dataURL;
    }
  });
});

shareBtn.addEventListener("click", async () => {
  const blob = await new Promise(resolve => qrCanvas.toBlob(resolve));
  const file = new File([blob], "qrcode.png", { type: blob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "QR Code",
      text: "Here is your QR code!",
    });
  } else {
    alert("Sharing not supported on this device.");
  }
});
