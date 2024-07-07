import { Link, useParams } from 'react-router-dom';
import { collections } from '../../../data/collections';
import './CardDetails.scss';
import { useState } from 'react';

import tick from '../../../assets/tick.svg';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SellIcon from '@mui/icons-material/Sell';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, styled } from '@mui/material';
import { users } from '../../../data/fakeUser';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function CardDetails() {
  const [hovered, setHovered] = useState(null);
  const [updatedCollections, setUpdatedCollections] = useState(collections); // Состояние для обновленной коллекции
  const [user, setUser] = useState(users); // Состояние для текущего пользователя
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0)

  const { uid } = useParams();
  const card = updatedCollections.find(c => c.uid === uid);
  const userWallet = window.localStorage.getItem('wallet');

  if (!card) {
    return <div>Card not found</div>;
  }

  const CardDetails = (e) => {
    return `cardDetails` + e;
  };

  const typeInfo = {
    'for sale': { color: '#269efafe', label: 'FOR SALE' },
    'not for sale': { color: 'brown', label: 'NOT FOR SALE' },
    'for auction': { color: 'green', label: 'FOR AUCTION' },
  };

  // Функция для добавления коллекции к пользователю
  const addToUserCollections = (collectionId) => {
    // Найти пользователя по userWallet
    const foundUser = users.find(user => user.wallet === userWallet);
    if (!foundUser) {
      alert(`User not found`);
      return;
    }
  
    // Проверить баланс пользователя
    if (foundUser.usdt < card.price) {
      alert(`You have not enough USDT for this card`);
      return;
    }
  
    // Уменьшить баланс пользователя на стоимость коллекции
    foundUser.usdt -= card.price;
  
    // Добавить collectionId к коллекциям пользователя
    foundUser.collections.push({ id: collectionId });
  
    // Обновить состояние пользователя
    const updatedUsers = users.map(user => {
      if (user.wallet === userWallet) {
        return { ...user, usdt: foundUser.usdt, collections: foundUser.collections };
      }
      return user;
    });
  
    setUser(updatedUsers);
  
    // Обновить коллекцию в состоянии компонента
    const updatedCard = { ...card, type: 'not for sale', owner: userWallet };
    const updated = updatedCollections.map(c => c.uid === uid ? updatedCard : c);
    setUpdatedCollections(updated);
    console.log(user);
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSell = (price) => {
    if (price <= 1) {
      return alert('Minimum price is $1');
    }
  
    // Обновить тип карточки на 'for sale'
    const updatedCard = { ...card, type: 'for sale', owner: '', price: price };
  
    const updated = updatedCollections.map(c => c.uid === uid ? updatedCard : c);
    setUpdatedCollections(updated);
  
    handleClose();
  };
  
  return (
    <div className={CardDetails('')}>
      <div className={CardDetails('-left')}>
        <div className="imgBack" onMouseEnter={() => setHovered(card.id)} onMouseLeave={() => setHovered()}>
          <img
            className={`sum ${hovered === card.id ? 'hover' : ''}`}
            src={card.img}
            alt={card.title}
          />
        </div>
      </div>
      <div className={CardDetails('-right')}>
        <b className='type' style={{ color: typeInfo[card.type].color, border: `1px solid ${typeInfo[card.type].color}` }}>{typeInfo[card.type].label}</b>
        <h2>{card.title}</h2>
        <Link to='/'><h4>Uzscoin Pre-Market <img src={tick} alt="tick" /></h4></Link>
        <p className='p'>You will be able to exchange this collectible for $UZS token after a token generation event.
        </p>
        <div className='priceList'>
          <b>PRICE: <span><AttachMoneyIcon />{card.price}</span></b>
          <p>Plus a network fee of 0.2<AttachMoneyIcon /></p>
          {
            card.type === 'not for sale' && card.owner === userWallet && (
              <Button className='myBtn' variant='outlined' onClick={handleClickOpen}>
                <SellIcon /> Sell
              </Button>
            )
          }
          {
            card.type === 'not for sale' ? null : (
              <Button className='myBtn' variant='outlined' onClick={() => addToUserCollections(card.id)}>
                <AddCircleOutlineIcon /> Buy now
              </Button>
            )
          }
          <Button href='/' target='_blank' className='myBtn myBtn2' variant='outlined'>Open Pre-Market</Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2, color: 'white' }} id="customized-dialog-title">
              Sell menu
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
            <DialogContent dividers>
              <Input sx={{color: 'white',}} className='myInp' onChange={(e) => setPrice(e.target.value)} type='number' fullWidth placeholder='Enter price'/>
            </DialogContent>
            <DialogActions>
              <Button fullWidth className='myBtn' autoFocus onClick={() => handleSell(price)}>
                Sell
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
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

export default CardDetails;
