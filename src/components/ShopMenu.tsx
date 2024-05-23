import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../shop-menu.css";

const ShopMenu = () => {
  const [gender, setGender] = useState("");

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const [category, setCategory] = useState<{ [key: string]: boolean }>({
    kindergarten: false,
    lowerSchool: false,
    middleSchool: false,
    juniorHigh: false,
    highSchool: false,
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [event.target.value]: event.target.checked });
  };

  const [productType, setProductType] = useState<{ [key: string]: boolean }>({
    shirt: false,
    pants: false,
    skirt: false,
    tie: false,
    belt: false,
    socks: false,
    shoes: false,
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductType({
      ...productType,
      [event.target.value]: event.target.checked,
    });
  };

  const [size, setSize] = useState("");

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const [color, setColor] = useState("");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "brown",
    "orange",
    "purple",
    "pink",
    "grey",
    "turquoise",
    "navy",
    "indigo",
    "violet",
    "beige",
    "navy",
    "maroon",
  ];

  const [genderVisible, setGenderVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [sizeVisible, setSizeVisible] = useState(false);
  const [colorVisible, setColorVisible] = useState(false);
  const [schoolVisible, setSchoolVisible] = useState(false);

  const toggleIsGenderVIsible = () => {
    setGenderVisible(!genderVisible);
  };

  const toggleIsCategoryVisible = () => {
    setCategoryVisible(!categoryVisible);
  };

  const toggleIsTypeVisible = () => {
    setTypeVisible(!typeVisible);
  };

  const toggleIsSizeVisible = () => {
    setSizeVisible(!sizeVisible);
  };

  const toggleIsColorVisible = () => {
    setColorVisible(!colorVisible);
  };

  const toggleIsSchoolVisible = () => {
    setSchoolVisible(!schoolVisible);
  };
  return (
    <ul className="shop">
      <li>
        <label htmlFor="" onClick={toggleIsGenderVIsible}>
          Gender <FontAwesomeIcon icon={faCaretDown} />
        </label>
        {genderVisible && (
          <div>
            <label>
              Male
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
              />
            </label>
            <label>
              Female
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
              />
            </label>
          </div>
        )}
      </li>
      <li>
        <label htmlFor="" onClick={toggleIsCategoryVisible}>
          Category <FontAwesomeIcon icon={faCaretDown} />
        </label>
        {categoryVisible && (
          <div>
            {Object.entries(category).map(([key, value]) => (
              <label key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                {/* Capitalize the first letter of the category key */}
                <input
                  type="checkbox"
                  value={key}
                  checked={value}
                  onChange={handleCategoryChange}
                />
              </label>
            ))}
          </div>
        )}
      </li>
      <li>
        <label htmlFor="" onClick={toggleIsTypeVisible}>
          Type <FontAwesomeIcon icon={faCaretDown} />
        </label>
        {typeVisible && (
          <div>
            {Object.entries(productType).map(([key, value]) => (
              <label key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                {/* Capitalize the first letter of the category key */}
                <input
                  type="checkbox"
                  value={key}
                  checked={value}
                  onChange={handleTypeChange}
                />
              </label>
            ))}
          </div>
        )}
      </li>
      <li>
        <label htmlFor="" onClick={toggleIsSizeVisible}>
          Size <FontAwesomeIcon icon={faCaretDown} />
        </label>
        {sizeVisible && (
          <div>
            <label>
              Small
              <input
                type="radio"
                value="small"
                checked={size === "small"}
                onChange={handleSizeChange}
              />
            </label>
            <label>
              Medium
              <input
                type="radio"
                value="medium"
                checked={size === "medium"}
                onChange={handleSizeChange}
              />
            </label>
            <label>
              Large
              <input
                type="radio"
                value="large"
                checked={size === "large"}
                onChange={handleSizeChange}
              />
            </label>
            <label>
              Extra Large
              <input
                type="radio"
                value="extraLarge"
                checked={size === "extraLarge"}
                onChange={handleSizeChange}
              />
            </label>
          </div>
        )}
      </li>
      <li>
        <label htmlFor="" onClick={toggleIsColorVisible}>
          Color <FontAwesomeIcon icon={faCaretDown} />
        </label>
        {colorVisible && (
          <div>
            {colors.map((mycolor) => (
              <label key={mycolor}>
                {mycolor.charAt(0).toUpperCase() + mycolor.slice(1)}{" "}
                <input
                  type="radio"
                  value={mycolor}
                  checked={color === mycolor}
                  onChange={handleColorChange}
                />
              </label>
            ))}
          </div>
        )}
      </li>

      <li>
        <label htmlFor="" onClick={toggleIsSchoolVisible}>
          School <FontAwesomeIcon icon={faCaretDown} />
        </label>
        {schoolVisible && <div></div>}
      </li>
    </ul>
  );
};

export default ShopMenu;
