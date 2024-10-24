import './App.css'
import QRgen from './components/QRgen';
import QRReader from './components/QRred';
function App() {
  return (
    <>
      <h1>QR Code Generator</h1>
      <QRgen />
      <h1>QR Code Reader</h1>
      <QRReader />
    </>
  )
}

export default App;
