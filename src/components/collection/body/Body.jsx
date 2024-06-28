import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, IconButton, InputBase, MenuItem, Paper, Select, Tab, Tabs, } from '@mui/material'
import './Body.scss'
import { useState } from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Like from '@mui/icons-material/FavoriteBorderOutlined';
import Share from '@mui/icons-material/IosShareOutlined';

import { collections } from '../../../data/collections';

function Body() {
  const [value, setValue] = useState(0);
  const [price, setPrice] = useState('lth');

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const myClass = (e) => {
    return 'collection-body' + e
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={myClass('')}>
      <div className={myClass('-top')}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: .5, borderColor: '#3D3D3F' }}>
            <Tabs sx={{ display: 'flex', justifyContent: 'space-between' }} TabIndicatorProps={{ sx: { background: '#E5E5EA' } }} value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='tab' label="Collection" {...a11yProps(0)} />
              <Tab className='tab' label="Item Two" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="top">
              <Button className='myBtn' variant="outlined"><KeyboardArrowLeftIcon className='icon' /> Filter</Button>
              <Paper
                component="form"
                className='myInp'
              >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchOutlinedIcon className='icon' />
                </IconButton>
                <InputBase
                  placeholder="Name or description"
                  inputProps={{ 'aria-label': 'Name or dexcription' }}
                />
              </Paper>
              <FormControl className='priceSelect'>
                <Select
                  defaultValue='lth'
                  className='select'
                  id="demo-simple-select"
                  value={price}
                  onChange={handleChangePrice}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#3d3d3f62', // Фон выпадающего списка
                        color: '#E5E5EA',   // Цвет текста в выпадающем списке
                      }
                    }
                  }}
                >
                  <MenuItem className='selectItem' value='lth'>Price: Low to High</MenuItem>
                  <MenuItem className='selectItem' value='htl'>Price: High to Low</MenuItem>
                  <MenuItem className='selectItem' value='mf'>Most Favourited</MenuItem>
                  <MenuItem className='selectItem' value='ra'>Recently Adder</MenuItem>
                  <MenuItem className='selectItem' value='Oldest'>Oldest</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="bottom">
              {
                collections?.map((e, i) => (
                  <Card className='card' key={i}>
                    <div className='myImg'>
                      <div className="imgBack">
                        <CardMedia
                          className='sum'
                          image={e.img}
                          title={e.title}
                        />
                      </div>
                      <div className="btnGroup">
                        <Button className='myBtn'><Like className='icon'/> {e.likes}</Button>
                        <Button className='myBtn'><Share className='icon'/> Share</Button>
                      </div>
                    </div>
                    <CardContent sx={{ p: 0 }}>
                      <p>
                        {e.title}
                      </p>
                    </CardContent>
                    <CardActions sx={{ p: 0 }}>
                      <p className='myPrice'>{e.price} $</p>
                    </CardActions>
                  </Card>
                ))
              }
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
        </Box>
      </div>
      <div className={myClass('-bottom')}>

      </div>
    </div>
  )
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, mt: '20px' }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default Body