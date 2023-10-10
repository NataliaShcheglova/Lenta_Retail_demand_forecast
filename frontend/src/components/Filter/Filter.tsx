import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllCities,
  selectAllVenues,
  toggleCity,
  toggleVenue,
  resetFilters,
  toggleGroup,
  toggleCategory,
  toggleSubcategory,
  toggleSku,
  reset
} from '../../services/redux/slices/filter/filter';
import { RootState } from '../../services/redux/store';
import styles from './Filter.module.scss';
import { storesData } from '../../utils/stores';
import { categoriesData } from '../../utils/categories';
import caret from '../../images/arrow.svg'
import FilterButton from '../ui/FilterButton/FilterButton';

const Filter: React.FC = () => {
  const [openFilters, setOpenFilters] = React.useState<string[]>([]);

  const toggleFilter = (filterName: string) => {
    if (openFilters.includes(filterName)) {
      setOpenFilters(openFilters.filter((name) => name !== filterName));
    } else {
      setOpenFilters([...openFilters, filterName]);
    }
  };
	
  const dispatch = useDispatch();

  const { selectedCities, selectedVenues, selectedGroups, selectedCategories, selectedSubcategories, selectedSku } = useSelector(
    (state: RootState) => state.filter
  );
  const cities = storesData.data.map((item)=>item.city);
  const filteredCities = Array.from(new Set(cities));

  const stores = storesData.data.map((item)=>item.store);
  const filteredStores = Array.from(new Set(stores));

  const groups = categoriesData.data.map((item)=>item.group);
  const filteredGroups = Array.from(new Set(groups));

  const handleCityToggle = (city: string) => {
    dispatch(toggleCity({ city }));
  };

  const handleVenueToggle = (venue: string) => {
    dispatch(toggleVenue({ venue }));
  };

  const handleSelectAllCities = () => {
    const allCities = filteredCities.map((item) => item);
    dispatch(selectAllCities({ cities: allCities }));
    setOpenFilters(allCities);
  };

  const handleSelectAllVenues = () => {
    const allVenues = filteredStores.map((item) => item);
    dispatch(selectAllVenues({ venues: allVenues }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleGroupToggle = (group: string) => {
    dispatch(toggleGroup({ group }));
  };

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategory({ category }));
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    dispatch(toggleSubcategory({ subcategory }));
  };

  const handleSkuToggle = (sku: string) => {
    dispatch(toggleSku({ sku }));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div className={styles.filter}>
      {/* Фильтр для выбора города */} 
      <div className={styles.subtitleWrapper}>
        <h3 className={styles.subtitle}>Выберите ТК</h3>
        <button type="reset" className={styles.button} onClick={handleResetFilters}>Сбросить</button>
      </div>
      <ul className={styles.list}>
        {filteredCities.map((item, index) => (
          <li key={index}>
              <label className={styles.dropdown}>
              <input className={styles.checkbox}
                type="checkbox"
                checked={selectedCities.includes(item)}
                onChange={() => handleCityToggle(item)}
              />
              <span className={styles.checkmark}></span>
              <span className={styles.text}>{item}</span>
              <button type="button" className={styles.arrow} onClick={() => toggleFilter(item)}>
                <img
                  className={`${styles.caret} ${
                    openFilters.includes(item) && styles.caretActive
                  }`}
						      src={caret}
						      alt="Стрелка вниз"
                />
              </button>
              </label>

            {/* Фильтр для выбора ТК */}

            {openFilters.includes(item) && (
              <ul className={`${styles.list} 
                              ${styles.listMargin} 
                              ${storesData.data
                                .filter((storeItem) => storeItem.city === item).length>6 && styles.listScroll }`}>
                {storesData.data
                  .filter((storeItem) => storeItem.city === item)
                  .map((storeItem, storeIndex) => (
                    <li key={storeIndex}>
                      <label 
                        className={`${styles.dropdown} ${
                          selectedVenues.includes(storeItem.store) && styles.dropdownActive
                        }`}
                      >
                        <input
                          className={styles.checkbox}
                          type="checkbox"
                          checked={selectedVenues.includes(storeItem.store)}
                          onChange={() => handleVenueToggle(storeItem.store)}
                        />
                        <span className={styles.checkmark}></span>
                        {storeItem.store}
                      </label>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={handleSelectAllCities}>Смотреть все города</button>
      <button className={styles.button} onClick={handleSelectAllVenues}>Выбрать все ТК</button>
      <div className={styles.line}></div>

      {/* Фильтр для выбора группы товара */} 

      <div className={styles.subtitleWrapper}>
        <h3 className={styles.subtitle}>Выберите товар</h3>
        <button type="reset" className={styles.button} onClick={handleReset}>Сбросить</button>
      </div>
      <ul className={styles.list}>
        {filteredGroups.map((item, index) => (
          <li key={index}>
            <label className={styles.dropdown}>
            <input className={styles.checkbox}
              type="checkbox"
              checked={selectedGroups.includes(item)}
              onChange={() => handleGroupToggle(item)}
            />
              <span className={styles.checkmark}></span>
              <span className={styles.text}>{item}</span>
              <button type="button" className={styles.arrow} onClick={() => toggleFilter(item)}>
                <img
                  className={`${styles.caret} ${
                    openFilters.includes(item) && styles.caretActive}`}
						      src={caret}
						      alt="Стрелка вниз"
                />
              </button>
            </label>

            {/* Фильтр для выбора категории */} 

            {openFilters.includes(item) && (
            <ul className={`${styles.list} 
                            ${styles.listMargin} 
                            ${categoriesData.data
                            .filter((categoryItem) => categoryItem.group === item).length>6 && styles.listScroll }`}>
              {Array.from(new Set(categoriesData.data
                .filter((categoryItem) => categoryItem.group === item) 
                .map((item)=>item.category)))
                .map((categoryItem, categoryIndex) => (
                  <li key={categoryIndex}>
                    <label 
                      className={`${styles.dropdown} ${
                      selectedCategories.includes(categoryItem) && styles.dropdownActive}`}
                    >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={selectedCategories.includes(categoryItem)}
                      onChange={() => handleCategoryToggle(categoryItem)}
                    />
                      <span className={styles.checkmark}></span>
                      <span className={styles.text}>{categoryItem}</span>
                      <button type="button" className={styles.arrow} onClick={() => toggleFilter(categoryItem)}>
                        <img
                          className={`${styles.caret} ${
                            openFilters.includes(categoryItem) && styles.caretActive}`}
						              src={caret}
						              alt="Стрелка вниз"
                        />
                      </button>
                    </label>

            {/* Фильтр для выбора подкатегории */} 

            {openFilters.includes(categoryItem) && (
              <ul className={`${styles.list} 
                              ${styles.listMargin} 
                              ${categoriesData.data
                              .filter((subcategoryItem) => subcategoryItem.category === categoryItem).length>6 && styles.listScroll }`}>
                {Array.from(new Set(categoriesData.data
                  .filter((subcategoryItem) => subcategoryItem.category === categoryItem) 
                  .map((item)=>item.subcategory)))
                  .map((subcategoryItem, subcategoryIndex) => (
                    <li key={subcategoryIndex}>
                      <label 
                        className={`${styles.dropdown} ${
                        selectedSubcategories.includes(subcategoryItem) && styles.dropdownActive}`}
                      >
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={selectedSubcategories.includes(subcategoryItem)}
                        onChange={() => handleSubcategoryToggle(subcategoryItem)}
                      />
                        <span className={styles.checkmark}></span>
                        <span className={styles.text}>{subcategoryItem}</span>
                        <button type="button" className={styles.arrow} onClick={() => toggleFilter(subcategoryItem)}>
                          <img
                            className={`${styles.caret} ${
                              openFilters.includes(subcategoryItem) && styles.caretActive}`}
						                src={caret}
						                alt="Стрелка вниз"
                          />
                        </button>
                      </label>

            {/* Фильтр для выбора товара */} 

            {openFilters.includes(subcategoryItem) && (
              <ul className={`${styles.list} 
                              ${styles.listMargin} 
                              ${categoriesData.data
                                .filter((skuItem) => skuItem.subcategory === subcategoryItem).length>6 && styles.listScroll }`}>
                {Array.from(new Set(categoriesData.data
                  .filter((skuItem) => skuItem.subcategory === subcategoryItem) 
                  .map((item)=>item.sku)))
                  .map((skuItem, skuIndex) => (
                    <li key={skuIndex}>
                      <label 
                        className={`${styles.dropdown} ${
                        selectedSubcategories.includes(skuItem) && styles.dropdownActive}`}
                      >
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={selectedSku.includes(skuItem)}
                        onChange={() => handleSkuToggle(skuItem)}
                      />
                        <span className={styles.checkmark}></span>
                        <span className={styles.text}>{skuItem}</span>
                      </label>
                    </li>
                    ))}
                  </ul>
                  )}
                </li>
                ))}
              </ul>
              )}
              </li>
              ))}
            </ul>
            )}
            </li>
          ))}
      </ul>
      <FilterButton text='Применить фильтр'></FilterButton>
    </div>
  );
};

export default Filter;
