import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { users } from '../../data/fakeUser';

const LoginPage = () => {
  const [inputWords, setInputWords] = useState(Array(16).fill(''));
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const newWords = [...inputWords];
    newWords[index] = value;
    setInputWords(newWords);
  };

  const handleSubmit = () => {
    const user = users.find(user => user.password.every((word, i) => word === inputWords[i]));
    if (user) {
      navigate(`/user/${user.wallet}`);
      window.localStorage.setItem('key', 'secret123');
      window.localStorage.setItem('wallet', user.wallet);
    } else {
      alert('Incorrect wallet words');
    }
  };

  const leftColumn = inputWords.slice(0, 8);
  const rightColumn = inputWords.slice(8);

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div className="word-inputs">
        <div className="left">
          {leftColumn.map((word, i) => (
            <input
              key={i}
              type="text"
              value={word}
              onChange={(e) => handleInputChange(i, e.target.value)}
              placeholder={`Word ${i + 1}`}
            />
          ))}
        </div>
        <div className="right">
          {rightColumn.map((word, i) => (
            <input
              key={i + 8}
              type="text"
              value={word}
              onChange={(e) => handleInputChange(i + 8, e.target.value)}
              placeholder={`Word ${i + 9}`}
            />
          ))}
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <a href="/">Back to Home</a>
    </div>
  );
};

export default LoginPage;
