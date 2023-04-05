/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../form/form.css';
import { 
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Autocomplete,
  Stack,
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
  const Building = [
    'Canning Bridge Community', 'George Humes Public Toilet (Wilagee)', 'John Conneil Playground Toilets', 'Point Walter Playground Toilets - Building Parent', 
  'Kadidjiny Gardeners Shed (CoM) - Building Parent', 'Canning Bridge Library (CBL)', 'Tivoli Theatre', 'Melville Recreation Centre A.H. Bracks Library'
  ];

  const park = [
    'Jules Court POS', 'Al Richardson Reserve', 'Alan Edwards Reserve', 'Alison Harris Park', 'Anthony Dodd Reserve', 'George Humes Park', 
    'Art Wright Reserve', 'Arthur Kay Reserve', ' Baal St Closure'
  ];

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
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
      }}
   

    >
      <div>
      <TextField sx={{ m: 1, width: '25ch' }} fullWidth label="Requested By" id="fullWidth" defaultValue="*User Name*" name="name" InputProps={{ readOnly: true, }} />
      <Stack>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        name="assetType"
        options={assetType}
        onChange={((e,v) => setSelected(v))}
        renderInput={(params) => <TextField onChange={(e,v) => setShowForm(v)} {...params} label="Asset Type" />}
      />

{selected == "Building" ? (<>
        <div>
        
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="bldgAssetName"
            options={Building}
            required
            renderInput={(params) => <TextField {...params} label="Asset Name" />}
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
            renderInput={(params) => <TextField {...params} label="Asset Name" />}
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
            renderInput={(params) => <TextField {...params} label="Asset Name (Select Asset Type First)" />}
          />
       
        {console.log(options, "options in this field")}
        <div style={{ color: 'red' }}>
          {errors.name?.type === 'maxLength' &&
            'Name is too long, choose a shorter one'}
        </div>
      </div>
      <br />
        </>
      )}

      </Stack>

      <TextField  
        sx={{
          width: { sm: 100, md: 300 },  
          "& .MuiInputBase-root": {
              height: 200
          }
        }} fullWidth label="Work Description" id="fullWidth" multiline rows={6} 
      />
      <TextField fullWidth label="Requestor's Phone #" id="fullWidth" name="requestorPhone" />
     {/*  <TextField fullWidth label="Problem Type" id="fullWidth" name="problemType" /> */}
      <Box sx={{display: 'flex', flexWrap: 'wrap'}}>

      <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={safetyOptions}
            renderInput={(params) => <TextField {...params} label="Safety / Compliance Related" name="safety" />}
          />
         

      </Box>
      
       
        
      </div>
      <div>
        <div>
        <TextField fullWidth label="Pathway Number" id="fullWidth" />
        <TextField fullWidth label="Building (Asset) Id" id="fullWidth" />
        </div>
     
      
      <TextField fullWidth label="WR Notes" id="fullWidth" />
        
        
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

