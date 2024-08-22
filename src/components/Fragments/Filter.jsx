import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';

const categories = [
  'SmartPhone',
  'TV',
  'Notebook',
  'Parlante Inalámbrico',
  'Consola',
  'Smart Watch',
  'Headphones',
  'Tablet',
  'Motherboard',
  'Smart Tv'
];

const Filter = ({ onCategorySelect }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleCategoryClickAction = (category) => {
    onCategorySelect(category); // Notifica la categoría seleccionada al componente padre
  };

  return (
    <div className="filter-container ">
      <button className="filter-button" onClick={toggleFilter}>
        <BsFilter className="filter-icon" />
      </button>
      {showFilter && (
        <div className="filter-overlay">
          <div className="category-filter">
            {categories.map((category, index) => (
              <div
                className={`category ${selectedCategories.includes(category) ? 'selected' : ''}`}
                key={index}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
