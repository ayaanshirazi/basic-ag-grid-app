/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './form.css';
import { 
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Autocomplete,
  FormControl,
  Button,
  Box,
  Grid 
} from '@mui/material';

export const EditForm = (props) => {
  const { currentUser, updateUser } = props;
  const [selected, setSelected] = React.useState("");
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };
  const [showForm, setShowForm] = React.useState("");
  const onClickForm = () => setShowForm(!showForm);


  const assetType = ['Building', 'Park / Reserve'];
  /* const Building = [
    'Canning Bridge Community', 'George Humes Public Toilet (Wilagee)', 'John Conneil Playground Toilets', 'Point Walter Playground Toilets - Building Parent', 
  'Kadidjiny Gardeners Shed (CoM) - Building Parent', 'Canning Bridge Library (CBL)', 'Tivoli Theatre', 'Melville Recreation Centre A.H. Bracks Library'
  ]; */

  const Building = [
    'Canning Bridge Community', 'Canning Bridge Library (CBL)', 'George Humes Public Toilet (Wilagee)', 'John Conneil Playground Toilets', 
    'Kadidjiny Gardeners Shed (CoM) - Building Parent', 'Melville Recreation Centre A.H. Bracks Library', 'Point Walter Playground Toilets - Building Parent',
    'Tivoli Theatre'
  ]

  /* const park = [
    'Jules Court POS', 'Al Richardson Reserve', 'Alan Edwards Reserve', 'Alison Harris Park', 'Anthony Dodd Reserve', 'George Humes Park', 
    'Art Wright Reserve', 'Arthur Kay Reserve', 'Baal St Closure'
  ]; */

  const park = [
    'Al Richardson Reserve', 'Alan Edwards Reserve', 'Alison Harris Park', 'Anthony Dodd Reserve',
    'Art Wright Reserve', 'Arthur Kay Reserve', 'Baal St Closure', 'George Humes Park', 'Jules Court POS'
  ]

  const noOption = [
    'no options'
  ];

  const safetyOptions = [
    'Yes', 'No'
  ];

  let type = null;
  let options = null;

  if (selected === 'Building') {
    type = Building;
  } else if ( selected === 'Park / Reserve'){
    type = park;
  }

  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const initialFormState = {
    id: null,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    setUser(currentUser);
  }, [props]);

  const onSubmit = () => {
    updateUser(user.id, user);
  };

  return (
    <form className="data-form" onSubmit={handleSubmit(onSubmit)}>

      <Box
      /* component="form" */
      sx={{
        '& .MuiTextField-root': { m: 1, width: '55ch' },
      }}
   

    >
      <TextField sx={{ m: 1, width: '25ch' }} fullWidth label="Raised By" id="fullWidth" defaultValue="*User Name*" name="name" InputProps={{ readOnly: true, }} />
      <div>
      <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
         <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="assetType"
            options={assetType}
            onChange={((e,v) => setSelected(v))}
            renderInput={(params) => <TextField onChange={(e,v) => setShowForm(v)} {...params} label="Asset Type" required />}
          />

{selected == "Building" ? (<>
        <div>
        
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="bldgAssetName"
            options={Building}
            renderInput={(params) => <TextField {...params} label="Asset Name" required />}
          />
       
        {console.log(options, "options in this field")}
        <div style={{ color: 'red' }}>
          {errors.name?.type === 'maxLength' &&
            'Name is too long, choose a shorter one'}
        </div>
      </div>
      <br />
      </>
        
      ) : selected == "Park / Reserve" ? (
        <>
        <div>
        
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="parkAssetName"
            options={park}
            renderInput={(params) => <TextField {...params} label="Asset Name" required />}
          />
      
        {console.log(options, "options in this field")}
        <div style={{ color: 'red' }}>
          {errors.name?.type === 'maxLength' &&
            'Name is too long, choose a shorter one'}
        </div>
      </div>
      <br />
        </>
      ) : (
        <>
        <div>
       
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="disabledAssetName"
            disabled
            options={noOption}
            renderInput={(params) => <TextField {...params} label="Asset Name (Select Asset Type First)" required />}
          />
       
        {console.log(options, "options in this field")}
        <div style={{ color: 'red' }}>
          {errors.name?.type === 'maxLength' &&
            'Name is too long, choose a shorter one'}
        </div>
      </div>
        </>
      )}

      </Box>
      
        
        
      </div>

      <div>       
     
      <TextField  sx={{
        width: { sm: 100, md: 300 },
        "& .MuiInputBase-root": {
            height: 200, width: 962
        }
    }} fullWidth required label="Work Description" id="fullWidth" multiline rows={6} />
      {/* <TextField fullWidth label="WR Notes" id="fullWidth" /> */}
        
      </div>

      <div>
        {/* <TextField sx={{ m: 1, width: '25ch' }} fullWidth label="Name of Requester" id="fullWidth" defaultValue="*User Name*" name="name" InputProps={{ readOnly: true, }} /> */}
        {/* <TextField fullWidth label="Pathway Number" id="fullWidth" /> */}
        <TextField fullWidth label="Name of Requester" id="fullWidth" />
        <TextField fullWidth label="Email Address of Requester" type="email" id="fullWidth" />
        <TextField fullWidth label="Contact Number of Requester" id="fullWidth" />
        </div>
      
    
      <div>
      {/* <button className="button">
        Clear Form
      </button> */}
      <br />
      <button className="button">Submit</button>
      <br />
      </div>
      {/* <button className="button">
        Clear Form
      </button>
      <br />
      <button className="button">Submit</button>
      <br /> */}
      </Box>
    </form>
  );
};

export default EditForm;

