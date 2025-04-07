const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Gambar watermark logo
const watermarkImage = new Image();
watermarkImage.src = 'wm.jpg'; // Pastikan logo ini ada di folder yang sama

upload.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      // Atur ukuran canvas sesuai gambar asli
      canvas.width = img.width;
      canvas.height = img.height;

      // Gambar utama
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const drawWatermark = () => {
        // === 1. Watermark Logo di kiri atas ===
        const wmWidth = img.width * 0.25;
        const wmHeight = (wmWidth / watermarkImage.width) * watermarkImage.height;
        ctx.globalAlpha = 0.9;
        ctx.drawImage(watermarkImage, 20, 20, wmWidth, wmHeight);
        ctx.globalAlpha = 1.0;

        // === 2. Watermark Teks di bawah tengah ===
        const fontSize = img.width * 0.02;
        ctx.font = `bold ${fontSize}px Arial`;

        ctx.shadowColor = 'black';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';

        const lines = [
          "CONTACT PERSON",
          "facebook.com/arrivacell",
          "WhatsApp: 081999586462"
        ];

        const lineHeight = fontSize * 1.4;
        const baseY = img.height - 40 - (lines.length - 1) * lineHeight;

        lines.forEach((line, index) => {
          ctx.fillText(line, img.width / 2, baseY + index * lineHeight);
        });

        // Reset efek shadow
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      };

      // Jalankan saat logo siap
      if (watermarkImage.complete) {
        drawWatermark();
      } else {
        watermarkImage.onload = drawWatermark;
      }
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});
