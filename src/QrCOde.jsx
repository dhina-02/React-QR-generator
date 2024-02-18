import { useState } from "react";
import "./CSS/Qrcode.css";
export const QrCOde = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("https://www.google.com/");
  const [qrSize, setQrSize] = useState("200");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url)
    } catch (error) {
      console.error("Error : ", error);
    } finally {
       
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
    .then((response)=> response.blob())
    .then((blob)=>{
        const link  =document.createElement("a")
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }).catch((error) =>{
        console.log("Erro", error)
    })
  }
  return (
    <div className="app-container">
      <h1>QR Code Generator</h1>
      {loading && <p>loading... </p>}
      <img src={img} alt="" />
      <label htmlFor="dataInput" className="input-label">
        Data for Qr code:
      </label>
      <input
        type="text"
        id="dataInput"
        placeholder="Enter data for QR code"
        value={qrData}
        onChange={(e) => setQrData(e.target.value)}
      />
      <label htmlFor="sizeInput" className="input-label">
        Image size (e.g., 150):
      </label>
      <input
        type="text"
        id="sizeInput"
        placeholder="Enter Image size"
        value={qrSize}
        onChange={(e) => setQrSize(e.target.value)}
      />
      <div className="btn-box">
        <button className="generate-button" onClick={() => generateQR()} disabled={loading}>
          Generate QR Code
        </button>
        <button className="download-button" onClick={() => downloadQR()} >
          Download QR Code
        </button>
      </div>
      <p className="footer">
        Designed by <a href="/">Dhinagaran</a>
      </p>
    </div>
  );
};
