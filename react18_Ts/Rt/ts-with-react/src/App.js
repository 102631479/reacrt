import './App.css';
import Hello from '../src/components/Hello.tsx'
import LikeButton from '../src/components/LikeButton.tsx'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello message='你好'></Hello>
        <LikeButton></LikeButton>
      </header>
    </div>
  );
}

export default App;
