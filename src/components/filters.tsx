import React, { useEffect, useState } from "react";
import "../filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

type FilterProps = {
  setFilter: (filter: string, category: string) => void;
};

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  const [selectedFilters, setSelectedFilters] = useState("");

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
  const [filterVisible, setFilterVisible] = useState(true);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Enhanced media query check using window.matchMedia
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Adjust breakpoint as needed
    setIsMobileDevice(mediaQuery.matches);

    // Add event listener for responsive behavior on window resize
    const listener = () => setIsMobileDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    // Set filter visibility based on initial device type and potential window resize
    setFilterVisible(!isMobileDevice);
  }, [isMobileDevice]); // Dependency on isMobileDevice

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isMobileDevice) {
      setFilterVisible(false);
    }
    setSelectedFilters(event.target.value);
    setFilter(event.target.value, event.target.name);
  };

  return (
    <>
      {isMobileDevice && (
        <button type="button" onClick={toggleFilter} className="filter-button">
          <FontAwesomeIcon icon={faFilter} />
          <p>Fiters</p>
        </button>
      )}

      {filterVisible && (
        <ul className="filter">
          <li>
            <label htmlFor="">Gender</label>

            <div>
              <label>
                Male
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  checked={selectedFilters === "male"}
                  onChange={handleChange}
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
