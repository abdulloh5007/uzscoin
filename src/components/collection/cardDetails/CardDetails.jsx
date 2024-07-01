import { Link, useParams } from 'react-router-dom';
import { collections } from '../../../data/collections';
import './CardDetails.scss';
import { useState } from 'react';

import tick from '../../../assets/tick.svg'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';

function CardDetails() {
  const [hovered, setHovered] = useState(null);

  const { id } = useParams();
  const card = collections.find(c => c.id === parseInt(id, 10));

  if (!card) {
    return <div>Card not found</div>;
  }

  const CardDetails = (e) => {
    return `cardDetails` + e
  }

  const typeInfo = {
    'for sale': { color: '#269efafe', label: 'FOR SALE' },
    'not for sale': { color: 'brown', label: 'NOT FOR SALE' },
    'for auction': { color: 'green', label: 'FOR AUCTION' },
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
            card.type !== 'not for sale' && (
              <Button className='myBtn' variant='outlined'><AddCircleOutlineIcon /> Buy Now</Button>
            )
          }
          <Button href='/' target='_blank' className='myBtn myBtn2' variant='outlined'>Open Pre-Market</Button>
        </div>
      </div>
    </div>
  );
}

export default CardDetails