import React, {useEffect, useState, useRef} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Avatar,TextField, Typography, Button, Divider,FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material"
import "./SidebarStyle.css";
import {SidebarElements} from "./SidebarElements.js";
import { deepOrange } from '@mui/material/colors';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


 
// useQuery to access parameters in URL 
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Sidebar() {
    
    const locationRef = useRef();
    const navigate = useNavigate();
    const query = useQuery();
    const [start, setStart] = useState(0);
    const [category, setCategory] = useState();


    const mapAPI = process.env.REACT_APP_MAPS_API_KEY
    const libraries = ['places']

    // initialize google maps api for autocomplete
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: mapAPI,
        libraries,
    });
    
     
    
    // handle submit for location filtering
    const handleSubmit = async (e) => {
        e.preventDefault();

        const geocoder = new window.google.maps.Geocoder();
        const geocode = await geocoder.geocode({
            address: locationRef.current.value
        }).then((result) => {
            const { results } = result;
            console.log(results[0]);
            return results[0];
        });

        const coordinates = JSON.stringify(geocode.geometry.location);
        console.log(coordinates);

        const coordinateQuery = JSON.parse(coordinates);
        setStart(0);

        if (query.get('category')) {
            const catQuery = query.get('category');
            navigate(`/search?lng=${coordinateQuery.lng}&lat=${coordinateQuery.lat}&category=${catQuery}`);
        } else {
            navigate(`/search?lng=${coordinateQuery.lng}&lat=${coordinateQuery.lat}`);
        }

    }
    const handleCategory = async (e) => {
        e.preventDefault();

        setCategory(e.target.value);
        setStart(0);

        if (query.get('lng')) {
            const lng = query.get('lng');
            const lat = query.get('lat');
            navigate(`/search?lng=${lng}&lat=${lat}&category=${e.target.value}`);
        } else {
            navigate(`/search?category=${e.target.value}`);
        }
    }

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); // Get user data from browser's local storage
    // Initialize letter used for avatar
    let avatarLetter;
    let avatarName;

    // field name will be different depending on whether google login or auth login
    if (user?.username) {
   //console.log(user?.username.charAt(0));
    avatarLetter = user?.username.charAt(0);
    avatarName = user?.username;
    } else {
   avatarLetter = user?.name.charAt(0);
   avatarName = user?.name;
    }
    const[Sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!Sidebar)

    
   
    return (
       <> 
            <div className= 'Menu'>
              <Link to= '#' className= 'menu-bars'>
                   <MenuIcon onClick= {showSidebar} />
              </Link>
            </div>
            <div className = {Sidebar ? "SidebarActive" : "Sidebar"}>
                <ul className= "SidebarList">
                     <CloseIcon onClick= {showSidebar}/>
                    {user && (
                     <Avatar className= "Avatar" sx={{ bgcolor: deepOrange[300] }}>{avatarLetter}</Avatar>
                    )}
                    {user && (<div className= "AvatarName"> {avatarName} </div>)}
                  
                    
                        <Typography variant="h6" component="h2" sx={{ ml: 2 }}>Show Posts Near You</Typography>
                        <Autocomplete>
                            <TextField
                                className= 'Text'
                                margin='normal'
                                id='location'
                                label='Location'
                                name='location'
                                autoComplete='location'
                                sx={{ m: 2 }}
                                inputRef={locationRef}
                            />
                        </Autocomplete>
                        <Button
                            type='submit'
                            onClick={handleSubmit}
                            variant='contained'
                            sx={{ ml: 3, mr: 2, mb: 2 }}
                        >
                            Submit
                        </Button>
                        <Divider sx={{ mt: 2, mb: 2 }} role='presentation'></Divider>
                    <div className= "Category">
                        Categories
                    </div>
                    <FormControl component="fieldset" sx={{ m: 2 }}>
                        <RadioGroup
                                aria-label="category"
                                name="category"
                                value={category}
                                onChange={(e) => handleCategory(e)}
                         >
                            {SidebarElements.map((val,key) => {
                                return (
                                    <li 
                                    key= {key} 
                                    className= "row"
                                    >
                                        <FormControlLabel value={val.value} control={<Radio />} label={val.tittle} />    
                                    </li>
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                </ul>
            </div>
       </> 
    );
};

export default Sidebar;