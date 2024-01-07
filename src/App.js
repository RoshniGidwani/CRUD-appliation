import React, { useState } from 'react';
import {
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import './styles.css'; // Importing the CSS file
const navItems = ['Home', 'About', 'Contact'];

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  //  for making the app bar at top
    flexDirection: 'column',
    minHeight: '100vh'
  },
  paper: {
    flex: 1,
    width: '80%',
    padding: '20px',
    borderRadius: '8px',
    transition: 'background 0.3s, color 0.3s',
      margin: 'auto',},
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    transition: 'background 0.3s',
  },
  table: {
    minWidth: 600,
  },
  
 
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
   margin: '50px'
  },
  title: {
    flexGrow: 1,
  },
});

const App = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (editingId !== null) {
      // Editing existing entry
      setData((prevData) =>
        prevData.map((item) => (item.id === editingId ? formData : item))
      );
      setEditingId(null);
    } else {
      // Adding new entry
      setData([...data, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: '', age: '' });
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setFormData({ name: itemToEdit.name, age: itemToEdit.age });
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setEditingId(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${classes.root} ${darkMode ? 'dark-mode' : ''}`}>
      <AppBar position="static" className={`app-bar ${classes.appBar}`}>
        <Toolbar>
          <Typography variant="h6" className={`app-bar-title ${classes.title}`}>
            CRUD App
          </Typography>
           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            className={`app-bar-icon`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Paper
       className={classes.paper}
      >
         <form className={classes.form}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant={darkMode ? 'filled' : 'outlined'}
            color={darkMode ? 'secondary' : 'primary'}
          />
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            variant={darkMode ? 'filled' : 'outlined'}
            color={darkMode ? 'secondary' : 'primary'}
          />
          <Button
            variant="contained"
            color={darkMode ? 'secondary' : 'primary'}
            onClick={handleAdd}
          >
            {editingId !== null ? 'Edit' : 'Add'}
          </Button>
        </form>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color={darkMode ? 'primary' : 'secondary'}
                      onClick={() => handleEdit(row.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color={darkMode ? 'primary' : 'secondary'}
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.tableActions}>
          <Button
            variant="outlined"
            onClick={toggleDarkMode}
            className={classes.tableActionsButton}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default App;
