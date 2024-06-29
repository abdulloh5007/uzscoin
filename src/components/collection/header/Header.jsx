import './Header.scss';
import panel from '../../../assets/200k.png'
import tick from '../../../assets/tick.svg'
import { useRef, useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TelegramIcon from '@mui/icons-material/Telegram';
// import LinkIcon from '@mui/icons-material/Link';

import { Box, Button, Snackbar } from '@mui/material';
import { collections } from '../../../data/collections';

function Header() {
  const myClass = (e) => {
    return 'collection-head' + e
  }

  const textAreaRef = useRef(null);

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
    if (textAreaRef.current) {
      navigator.clipboard.writeText(textAreaRef.current.value)
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // Функция для нахождения минимальной цены
  const getFloorPrice = (collections) => {
    return Math.min(...collections.map(item => item.price));
  };

  const getTotalVolume = (collections) => {
    return collections.reduce((total, item) => total + item.price, 0);
  };

  const floorPrice = getFloorPrice(collections);
  const totalVolume = getTotalVolume(collections)

  // UQDmO3JOb8qIEyF6PEcqfhUL0AYTDLMEnR1kgc-kFejYpzjz
  return (
    <div className={myClass('')}>
      <div className={myClass('-panel')}>
        <div className='pimg'>
          <img src={panel} alt='panel' />
          <b className='avatar'>
            UZS COIN
          </b>
        </div>
        <div className="stats">
          <div className="left">
            <h4>Uzscoin Pre-Market <img src={tick} alt="tick" /></h4>
            <h6>@uzscoin_market</h6>
            <p>Uzscoin Pre-Market vouchers represent the in-game Uzscoin currency, which can be exchanged for $UZS after a token generation event.</p>
            <h6>
              created by: <span>UQDmO3...pzjz</span> <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })} variant='text'><ContentCopyIcon className='icon'/></Button>
              <textarea
                ref={textAreaRef}
                rows="4"
                cols="50"
                hidden
                defaultValue="UQDmO3JOb8qIEyF6PEcqfhUL0AYTDLMEnR1kgc-kFejYpzjz"
              />
            </h6>
            <div className="btnGroup">
              <Button className='mybtn' href="https://t.me/uzscoin_market" variant='outlined'><TelegramIcon className='icon'/> @uzscoin_market</Button>
              <Button className='mybtn' href="https://t.me/uzscoin_fam" variant='outlined'><TelegramIcon className='icon'/> @uzscoin_fam</Button>
            </div>
          </div>
          <div className="center"></div>
          <div className="right">
            <h6>Items <span>{collections.length}</span></h6>
            <h6>Floor price <span>{floorPrice}$</span></h6>
            <h6>Total volume <span>{totalVolume}</span></h6>
          </div>
        </div>
      </div>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={<span className='addressCopy'><img src={tick} alt="tick" /> <b>Copied</b></span>}
          key={vertical + horizontal}
        />
      </Box>
    </div>
  )
}

export default Header