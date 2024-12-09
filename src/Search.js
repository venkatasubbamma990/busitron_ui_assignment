import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Paper, TextField, Typography } from '@mui/material';
export default function Search() {
   const [searchTerm, setSearchTerm] = useState("");
   const [searchData, setSearchData] = useState([])
  const [suggestions , setSuggestions] = useState([])

  useEffect(() => {
    fetchSuggestions();
  },[searchTerm])
  const fetchSuggestions = () => {
    fetch("https://busitron-api-assignment.onrender.com/author_suggestions")
     .then((response) => response.json())
     .then((data) => {
        setSuggestions(data?.result);
      }).catch((err) => {
        console.log("Error fetching suggestions: ", err);
      })
  }

  const SearchResult = async (searchValue) => {
    try{
      const response = await fetch(`https://busitron-api-assignment.onrender.com/search/${searchValue}`);
      const resultData = await response.json();
      setSearchData(resultData?.result);
      
    }catch(err){
      console.log("Error fetching search results: ", err);
    }
    
  };

  return (
    <>
      <Paper
        sx={{
          m: 2,
          width: "50%",
          height: window.innerHeight,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column", 
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Autocomplete
          options={suggestions}
          name="suggestion"
          getOptionLabel={(option) => option}
          onChange={(e ,  value) => {
            console.log("value" , value)
            SearchResult(value)
            setSearchTerm(value);
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search Here..." />
          )}
          fullWidth
        />
 <Box sx={{mt:3}}>
      {
          searchData?.length > 0 && searchData.map((data) => {
            return (
              <Box key={data.id}>
                <Typography> Name Of Person : {data.Author}</Typography>
                <Typography> Location : {data.Location}</Typography>
                <Typography> Description : {data.Description}</Typography>
              </Box>

            )
          })
        }
      </Box>
        
      </Paper>

     


    </>
  );
}
