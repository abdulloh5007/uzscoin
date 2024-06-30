import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardMedia, Drawer, FormControl, FormControlLabel, IconButton, InputBase, MenuItem, Paper, Radio, RadioGroup, Select, Tab, Tabs, TextField, } from '@mui/material'
import './Body.scss'
import { useState } from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Like from '@mui/icons-material/FavoriteBorderOutlined';
import Share from '@mui/icons-material/IosShareOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Filter from '@mui/icons-material/FilterListOutlined';
import Settings from '@mui/icons-material/SettingsOutlined';

import { collections } from '../../../data/collections';
import Chart from 'react-google-charts';

function Body() {
  const [value, setValue] = useState(0);
  const [price, setPrice] = useState('lth');
  const [hovered, setHovered] = useState(null);
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  // LIKES
  // const [likes, setLikes] = useState(collections.map(item => item.likes));

  // FILTER FROM AND TO
  // const [fromValue, setFromValue] = useState('');
  // const [toValue, setToValue] = useState('');

  // LIKES
  // const handleLike = (index) => {
  //   const newLikes = [...likes];
  //   newLikes[index] += 1;
  //   setLikes(newLikes);
  // };

  // FILTER FROM AND TO
  // const handleApply = () => {
  //   const from = parseFloat(fromValue) || 0;
  //   const to = parseFloat(toValue) || Infinity;

  //   const filtered = filteredCollections.filter(
  //     (item) => item.price >= from && item.price <= to
  //   );
  // };

  const countByAmountAndName = collections.reduce((acc, { title }) => {
    if (!acc[title]) {
      acc[title] = 0;
    }
    acc[title]++;
    return acc;
  }, {});

  // Преобразуем объект в массив данных для графика
  const chartData = [['Name', 'Have']];
  Object.entries(countByAmountAndName).forEach(([name, count]) => {
    chartData.push([name, count]);
  });

  // Определяем количество ticks для оси Y
  const numTicks = Object.values(countByAmountAndName).reduce((max, count) => {
    return Math.max(max, count);
  }, 0) + 1; // +1 чтобы учесть 0

  const options = {
    title: 'We have this',
    hAxis: { title: 'Name' },
    vAxis: {
      title: 'Quantity',
      minValue: 0,
      ticks: Array.from({ length: numTicks }).map((_, index) => index),
    },
    legend: 'none',
  };

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const toggleDrawer2 = (open2) => () => {
    setIsOpen2(open2);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const myClass = (e) => {
    return 'collection-body' + e
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Функция для сортировки коллекций на основе выбранного значения
  const sortedCollections = collections?.slice().sort((a, b) => {
    switch (price) {
      case 'lth':
        return a.price - b.price;
      case 'htl':
        return b.price - a.price;
      case 'mf':
        return b.likes - a.likes;
      case 'ra':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'Oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  const filteredCollections = sortedCollections.filter((collection) =>
    collection.title.toLowerCase().includes(search.toLowerCase())
  );

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
              <Button onClick={() => setFilterOpen(!filterOpen)} className='myBtn' variant="outlined"><KeyboardArrowLeftIcon className='icon' /> Filter</Button>
              <Paper
                component="form"
                className='myInp'
              >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchOutlinedIcon className='icon' />
                </IconButton>
                <InputBase
                  fullWidth
                  placeholder="Name or description"
                  inputProps={{ 'aria-label': 'Name or description' }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Paper>
              <Button hidden onClick={toggleDrawer(true)} variant='outlined' className='myBtn2'><Filter /></Button>
              <Button hidden onClick={toggleDrawer2(true)} variant='outlined' className='myBtn2'><Settings /></Button>
              <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={toggleDrawer(false)}
              >
                <div
                  className='drawer'
                  role="presentation"
                  // onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <div>
                    <b>Filters</b>
                  </div>
                  <Accordion defaultExpanded className='filter'>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className='icon' />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <b>Sale type</b>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl fullWidth>
                        <RadioGroup
                          className='radioGroup'
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="fs"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel value="fs" control={<Radio className='radio' />} label="For sale" />
                          <FormControlLabel value="fa" control={<Radio className='radio' />} label="For auction" />
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded className='filter'>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className='icon' />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <b>Price range</b>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="inpGroup">
                        <TextField className='myInp' id="outlined-basic" label="From" variant="outlined" />
                        <TextField className='myInp' id="outlined-basic" label="To" variant="outlined" />
                      </div>
                      <Button className='myBtn' fullWidth>Apply</Button>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Drawer>
              <Drawer
                anchor="bottom"
                open={isOpen2}
                onClose={toggleDrawer2(false)}
              >
                <div
                  className='drawer2'
                  role="presentation"
                  // onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer2(false)}
                >
                  <Button onClick={() => setPrice('lth')} fullWidth className='myBtn' variant='outlined'>Price: Low to High</Button>
                  <Button onClick={() => setPrice('htl')} fullWidth className='myBtn' variant='outlined'>Price: High to Low</Button>
                  <Button onClick={() => setPrice('mf')} fullWidth className='myBtn' variant='outlined'>Most Favourited</Button>
                  <Button onClick={() => setPrice('ra')} fullWidth className='myBtn' variant='outlined'>Recently Adder</Button>
                  <Button onClick={() => setPrice('Oldest')} fullWidth className='myBtn' variant='outlined'>Oldest</Button>
                </div>
              </Drawer>
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
                        opacity: '1 !important',
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
              <div className="left" hidden={filterOpen === false}>
                <Accordion defaultExpanded className='filter'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='icon' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <b>Sale type</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl fullWidth>
                      <RadioGroup
                        className='radioGroup'
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="fs"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="fs" control={<Radio className='radio' />} label="For sale" />
                        <FormControlLabel value="fa" control={<Radio className='radio' />} label="For auction" />
                      </RadioGroup>
                    </FormControl>
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded className='filter'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='icon' />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <b>Price range</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="inpGroup">
                      <TextField className='myInp' id="outlined-basic" label="From" variant="outlined" />
                      <TextField className='myInp' id="outlined-basic" label="To" variant="outlined" />
                    </div>
                    <Button className='myBtn' fullWidth>Apply</Button>
                  </AccordionDetails>
                </Accordion>
              </div>
              <div className="right">
                {
                  filteredCollections?.map((e, i) => (
                    <Card className='card' key={i}>
                      <div className='myImg'>
                        <div className="imgBack" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered()}>
                          <CardMedia
                            className={`sum ${hovered === i ? 'hover' : ''}`}
                            image={e.img}
                            title={e.title}
                          />
                        </div>
                        <div className="btnGroup">
                          <Button className='myBtn'><Like className='icon' /> {e.likes}</Button>
                          <Button className='myBtn'><Share className='icon' /></Button>
                        </div>
                      </div>
                      <CardContent sx={{ p: 0 }}>
                        <p>
                          {e.title}
                        </p>
                      </CardContent>
                      <CardActions sx={{ p: 0 }}>
                        <p className='myPrice'>$ {e.price}</p>
                      </CardActions>
                    </Card>
                  ))
                }
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={chartData}
              options={options}
              style={{backgroundColor: 'red', zIndex: 111111}}
            />
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