import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, FormControl, IconButton, MenuItem, Select, styled } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';

import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link, useNavigate } from 'react-router-dom';
import { avatar, users } from '../../data/fakeUser';

function Header() {
  const [open, setOpen] = useState(false);
  const [stepper, setStepper] = useState(1);
  const [changeProfile, setChangeProfile] = useState('default')

  // checking wallet password

  const [generatedWords, setGeneratedWords] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [randomWords, setRandomWords] = useState([]);
  const navigate = useNavigate()

  function generateAddress() {
    const prefix = 'LVJS';
    const length = 43; // 48 - 4 (длина префикса "LVJS") + 1 (для символа "-")
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = prefix;
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      if (i === 36) { // 36 + 4 (длина префикса "LVJS") = 40
        result += '-';
      }
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generateWalletPassFunc() {
    const words = ['table', 'school', 'bus', 'director', 'apple', 'cat', 'house', 'car', 'tree', 'computer', 'phone', 'city', 'game', 'movie', 'book', 'flower', 'dog', 'bird', 'river', 'mountain', 'night', 'day', 'city', 'football', 'good', 'mood', 'child', 'family', 'encourage', 'desk', 'laptop', 'tell', 'play', 'small', 'kind', 'point', 'world', 'near', 'build', 'work', 'part', 'place', 'live', 'round', 'show', 'help', 'learn', 'room', 'idea', 'rock', 'fire', 'pass', 'street', 'multiply', 'object', 'full', 'moon', 'island', 'system', 'town', 'certain', 'week', 'minute', 'fact', 'during', 'person', 'rule', 'notice', 'perhaps', 'sudden', 'settle', 'include', 'item', 'already'];
    const length = 16; // Количество слов

    if (length > words.length) {
      throw new Error('Not enough unique words in the array.');
    }

    const shuffledWords = words.sort(() => 0.5 - Math.random()); // Перемешиваем массив слов
    const selectedWords = shuffledWords.slice(0, length); // Берем первые 16 уникальных слов

    return selectedWords;
  }

  useEffect(() => {
    const walletPass = generateWalletPassFunc();
    setGeneratedWords(walletPass);
    updateRandomWords(walletPass);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateRandomWords = (walletPass) => {
    const randomWordIndices = getRandomIndices(walletPass.length, 3);
    setRandomWords(randomWordIndices.map(index => ({ word: walletPass[index], index })));
    setInputValues({}); // reset input values
  };

  const leftColumn = generatedWords.slice(0, 8);
  const rightColumn = generatedWords.slice(8);

  function getRandomIndices(arrayLength, count) {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * arrayLength);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  }

  const handleChange = (index, value) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [index]: value
    }));
  };

  const handleSubmit = () => {
    const correct = randomWords.every(({ index, word }) => inputValues[index] === word);
    if (correct) {
      setStepper(4)
    } else {
      alert("Incorrect. Please try again.");
    }
  };

  const [apply, setAplly] = useState('')
  const uniqueAddress = () => {
    const address = generateAddress()
    setAplly(address)
  }

  const handleAddUser = () => {
    setOpen(false);
    users.push({
      id: 21212121,
      avatar: avatar,
      wallet: apply,
      name: 'User bot',
      usdt: 10,
      collections: [],
      password: generatedWords,
    })
    setStepper(1)
    window.localStorage.setItem('key', 'secret123')
    window.localStorage.setItem('wallet', apply)
  }

  const handleContinue = (steps) => {
    setStepper(steps);
    updateRandomWords(generatedWords);
  };

  const wallet = window.localStorage.getItem('wallet')
  const handleChangeProfile = (value) => {
    const val = value.target.value
    setChangeProfile(val);
    if (val == 'profile') {
      navigate(`/user/${wallet}`)
    }
    else if (val == 'logout') {
      navigate('/')
      window.localStorage.removeItem('wallet')
      window.localStorage.removeItem('key')
    }
  }

  return (
    <div className='header'>
      <div className="left"></div>
      <div className="right">
        {
          !wallet
            ?
            <div>
              <Button onClick={handleClickOpen} variant='outlined' className='myBtn'>
                Create wallet
              </Button>
              <Link to='/login'>
                <Button variant='outlined' className='myBtn'>
                  Login
                </Button>
              </Link>
            </div>
            :
            <FormControl className='mySelect'>
              <Select
                defaultValue='default'
                className='select'
                id="demo-simple-select"
                value={changeProfile}
                onChange={handleChangeProfile}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#3d3d3f62', // Фон выпадающего списка
                      color: '#E5E5EA',   // Цвет текста в выпадающем списке
                      opacity: '1 !important',
                    }
                  }
                }}
              >
                <MenuItem className='selectItem' value='default'>
                  <img src={avatar} alt="avatar" />
                  <MenuIcon />
                </MenuItem>
                <MenuItem className='selectItem' value='profile'>Profile</MenuItem>
                <MenuItem className='selectItem' value='logout'>Log Out</MenuItem>
              </Select>
            </FormControl>
        }
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
          maxWidth='xs'
        >
          <DialogTitle sx={{ m: 0, p: 2, color: '#ffffff' }} id="customized-dialog-title">
            Create wallet
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent className='headerDialog' dividers>
            <div className={`write ${stepper === 1 ? 'appearWrite' : 'hideWrite'}`}>
              <BorderColorIcon className='icon' />
              <b>Grab a pen and a piece of paper</b>
              <p>We strongly recommend you write down the recovery phrase because it’s the only way to have access to and recover your wallet in case of losing your device. Do not send it to yourself via email or take a screenshot. It’s safer when kept offline.</p>
              <Button onClick={() => { handleContinue(2); uniqueAddress(); }} fullWidth variant='outlined' className='myBtn'>Continue</Button>
            </div>
            <div className={`cols ${stepper === 2 ? 'appearCols' : 'hideCols'}`}>
              <div className="columns">
                <div className="left">
                  {leftColumn.map((e, i) => (
                    <p key={i}>
                      {i + 1}. {e}
                    </p>
                  ))}
                </div>
                <div className="right">
                  {rightColumn.map((e, i) => (
                    <p key={i + 8}>
                      {i + 9}. {e}
                    </p>
                  ))}
                </div>
              </div>
              <Button onClick={() => setStepper(3)} fullWidth variant='outlined' className='myBtn'>Check</Button>
            </div>
            <div className={`input-fields ${stepper === 3 ? 'appearInput-fields' : 'hideInput-fields'}`}>
              <h2>Enter the following words:</h2>
              {
                randomWords.map(({ index }, i) => (
                  <div key={i}>
                    <label>{`Word ${index + 1}`}</label>
                    <input
                      type="text"
                      value={inputValues[index] || ''}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  </div>
                ))
              }
              <Button onClick={handleSubmit} fullWidth variant='outlined' className='myBtn'>Submit</Button>
              <Button onClick={() => handleContinue(2)} fullWidth variant='outlined' className='myBtn'>Back</Button>
            </div>
            <Link onClick={() => handleAddUser()} className={`myLink myBtn ${stepper === 4 ? 'appearLink' : 'hideLink'}`} to={`/user/${apply}`}>Go profile</Link>
          </DialogContent>
        </BootstrapDialog>
      </div>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default Header;
