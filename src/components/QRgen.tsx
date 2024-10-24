import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import "./QRgen.css"
const QRgen = () => {
    const [inputText, setInputText] = useState('');
    const qrRef = useRef(null); // Reference to the QR code div

    // Function to save the QR code as an image
    const handleDownloadQR = () => {
        const svg = qrRef.current.querySelector('svg'); // Get the SVG element
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        // Set canvas size to match QR code size
        canvas.width = svg.clientWidth;
        canvas.height = svg.clientHeight;

        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const pngUrl = canvas.toDataURL('image/png'); // Convert to PNG format

            // Create a link element to download the image
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qr-code.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink); // Clean up
        };

        // Convert SVG to base64 image
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="qr-generator-container">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text or URL"
                className="input-text"
            />
            <div className="qr-code-container" ref={qrRef}>
                {inputText && (
                    <QRCode
                        value={inputText}
                        size={256}    // You can adjust the size as needed
                        level="H"     // Error correction level: Low (L), Medium (M), High (H)
                    />
                )}
            </div>
            {inputText && (
                <button onClick={handleDownloadQR} className="download-button">
                    Save QR Code
                </button>
            )}
        </div>
    );
};

export default QRgen;
