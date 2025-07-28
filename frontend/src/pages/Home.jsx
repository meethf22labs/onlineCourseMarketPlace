import React, {useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import api_url from "../apiConfig";
import CourseCard from "../components/CourseCard";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


export default function Home() {
  const [value, setValue] = React.useState(0);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${api_url}/categories`);
            if (!response.ok) {
                console.log('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    fetchCategories();
}, []);

useEffect(() => {
    const fetchCourses = async() => {
        try {
           const response = await fetch(`${api_url}/courses`);
            if (!response.ok) {
                console.log('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setCourses(data); 
            setFilteredCourses(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    fetchCourses();
}, []);

  const handleSearch = () => {
  const lower = searchText.toLowerCase();
  const searchedCourse = filteredCourses.filter((c) => c.title.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower));
  setCourses(searchedCourse);
}; 

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <h1 className=" text-4xl font-bold">Achieve your career goals with </h1>
        <p className=" text-2xl font-light m-5">Online Course Marketplace</p>
        <label
          htmlFor="search"
          className="flex items-center border w-xl rounded-2xl searchInputLabel"
        >
          <input
            placeholder="Search Courses"
            type="text"
            name="search"
            className="border-none outline-none w-[100%] searchInput"
            value={searchText}
            onChange={(e) => {setSearchText(e.target.value)}}
          />
          <button onClick={handleSearch}>
            <SearchIcon className=" cursor-pointer text-blue-800" />
          </button>
        </label>
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="category tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
          <Tab label="All Categories" {...a11yProps(0)} />
          {categories.map((category, index) => (
              <Tab key={category.id} label={category.name} {...a11yProps(index)} />
          ))}
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <div className="flex flex-wrap">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                courseId={course.id}
                title={course.title}
                description={course.description}
                thumbnail_url={course.thumbnail_url}
                price={course.price}
              />
            ))}
          </div>
        </CustomTabPanel>
        
        {categories.map((category, index) => (
        <CustomTabPanel value={value} index={ index + 1 } key={category.id}>
            <div className="flex flex-wrap">
                {courses.filter((c) => category.id === c.category_id).map((course) => (
                <CourseCard
                  key={course.id}
                  courseId={course.id}
                  title={course.title}
                  description={course.description}
                  thumbnail_url={course.thumbnail_url}
                  price={course.price}
                />
                ))}
            </div>
        </CustomTabPanel>
        ))}
      </Box>
    </>
  );
}
