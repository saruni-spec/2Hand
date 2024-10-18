// Importing the CSS for the filter styling
// Importing FontAwesomeIcon for filter icon
// Importing the filter icon
import React, { useEffect, useState } from "react";
import "../filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

// Type definition for the props that the Filter component accepts
type FilterProps = {
  // Function to update the selected filter and category
  setFilter: (filter: string, category: string) => void;
};

// Filter component
const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  // State to track the currently selected filter value
  const [selectedFilters, setSelectedFilters] = useState("");

  // List of available color options for filtering
  const colors = [
    "red",
    "blue",
    "green",
    "black",
    "white",
    "brown",
    "orange",
    "purple",
    "pink",
    "grey",
    "navy",
    "beige",
    "maroon",
  ];

  // State to toggle the visibility of the filter UI
  const [filterVisible, setFilterVisible] = useState(true);

  // Function to toggle filter visibility (used for mobile views)
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  // State to track if the device is a mobile device
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // useEffect to check if the user is on a mobile device using window.matchMedia
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Set a breakpoint of 768px for mobile devices
    setIsMobileDevice(mediaQuery.matches); // Update the state based on whether the device matches the mobile width

    // Listener to update state when the window is resized and the device switches between mobile and desktop
    const listener = () => setIsMobileDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);

    // Cleanup the event listener on component unmount
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // useEffect to control the visibility of the filter menu based on the device type (mobile/desktop)
  useEffect(() => {
    // If the user is on a mobile device, the filter will initially be hidden
    setFilterVisible(!isMobileDevice);
  }, [isMobileDevice]); // Runs whenever `isMobileDevice` changes

  // Function to handle changes in the filter options (called when a radio button is selected)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isMobileDevice) {
      setFilterVisible(false); // Automatically close the filter on mobile devices after selection
    }
    // Update the selectedFilters state with the new value
    setSelectedFilters(event.target.value);

    // Call the parent component's setFilter function, passing the selected filter and its category (e.g., gender, size)
    setFilter(event.target.value, event.target.name);
  };

  return (
    <>
      {/* Render filter button for mobile devices */}
      {isMobileDevice && (
        <button type="button" onClick={toggleFilter} className="filter-button">
          {/* FontAwesome filter icon */}
          <FontAwesomeIcon icon={faFilter} />
          <p>Filters</p>
        </button>
      )}

      {/* Render the filter menu if it's visible */}
      {filterVisible && (
        <ul className="filter">
          {/* Filter option for Gender */}
          <li>
            <label htmlFor="">Gender</label>
            <div>
              <label>
                Male
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  checked={selectedFilters === "male"} // Mark as checked if currently selected
                  onChange={handleChange} // Handle filter changes
                />
              </label>
              <label>
                Female
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={selectedFilters === "female"}
                  onChange={handleChange}
                />
              </label>
            </div>
          </li>

          {/* Filter option for Category (e.g., Kindergarten, High School) */}
          <li>
            <label htmlFor="">Category</label>
            <div>
              {[
                "kindergarten",
                "lowerSchool",
                "middleSchool",
                "juniorHigh",
                "highSchool",
              ].map((key) => (
                <label key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                  <input
                    type="radio"
                    name="category"
                    value={key}
                    checked={selectedFilters === key}
                    onChange={handleChange}
                  />
                </label>
              ))}
            </div>
          </li>

          {/* Filter option for Type (e.g., Shirt, Pants) */}
          <li>
            <label htmlFor="">Type</label>
            <div>
              {["shirt", "pants", "skirt", "tie", "belt", "socks", "shoes"].map(
                (key) => (
                  <label key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                    <input
                      type="radio"
                      name="type"
                      value={key}
                      checked={selectedFilters === key}
                      onChange={handleChange}
                    />
                  </label>
                )
              )}
            </div>
          </li>

          {/* Filter option for Size (e.g., Small, Medium) */}
          <li>
            <label htmlFor="">Size</label>
            <div>
              <label>
                Small
                <input
                  type="radio"
                  name="size"
                  value="small"
                  checked={selectedFilters === "small"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Medium
                <input
                  type="radio"
                  name="size"
                  value="medium"
                  checked={selectedFilters === "medium"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Large
                <input
                  type="radio"
                  name="size"
                  value="large"
                  checked={selectedFilters === "large"}
                  onChange={handleChange}
                />
              </label>
              <label>
                Extra Large
                <input
                  type="radio"
                  name="size"
                  value="extraLarge"
                  checked={selectedFilters === "extraLarge"}
                  onChange={handleChange}
                />
              </label>
            </div>
          </li>

          {/* Filter option for Color */}
          <li>
            <label htmlFor="">Color</label>
            <div>
              {colors.map((mycolor) => (
                <label key={mycolor}>
                  {mycolor.charAt(0).toUpperCase() + mycolor.slice(1)}{" "}
                  <input
                    type="radio"
                    name="color"
                    value={mycolor}
                    checked={selectedFilters === mycolor}
                    onChange={handleChange}
                  />
                </label>
              ))}
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default Filter;
