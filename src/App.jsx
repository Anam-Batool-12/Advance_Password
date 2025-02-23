import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useCharacters, setUseCharacters] = useState(false);
  const [password, setPassword] = useState('');



  const paaswordRef = useRef(null);

  

  const pwdGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (useNumbers) str += '0123456789';
    if (useCharacters) str += '!@#$%^&*()_+=-';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, useNumbers, useCharacters]);

const copyToClipboard =useCallback( () => {
  paaswordRef.current?.Select();
    window.navigator.clipboard.writeText(password);
},[password])


  
useEffect(() => {
  pwdGenerator();
}, [length, useNumbers, useCharacters, pwdGenerator])





  
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-lg text-white mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Password Generator</h1>
      <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 text-black rounded-l-lg"
          placeholder="Generated Password"
          readOnly
          reff={paaswordRef}
        />
        <button  onClick={copyToClipboard} className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-r-lg">Copy</button>
      </div>

      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer w-full"
            onChange={(e) => setLength(e.target.value)}
          />
          <span className="text-lg font-medium">Length:{length}</span>
        </div>

        <div className="flex items-center space-x-2">
          <input 
            type='checkbox'
            checked={useNumbers}
            id='numberinput'
            className="w-5 h-5"
            onChange={() => setUseNumbers((prev) => !prev)}
          />
          <label htmlFor="numberinput" className="text-lg">Include Numbers</label>
        </div>

        <div className="flex items-center space-x-2">
          <input 
            type='checkbox'
            checked={useCharacters}
            id='characterinput'
            className="w-5 h-5"
            onChange={() => setUseCharacters((prev) => !prev)}
          />
          <label htmlFor="characterinput" className="text-lg">Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
