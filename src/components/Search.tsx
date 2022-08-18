import styled from 'styled-components';

/*Import Variables*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconSearch } from '../assets/images/icon_search.svg';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { getLocation } from '../api/getLocation';
import { useDebounce } from '../hooks/useDebounce';
import { Loader } from '../styles/Loader';
import { setConstantValue } from 'typescript';
import { getWeatherData } from '../api/getWeatherData';

const StyledLabel = styled.label`
  /*Change to maxWidth!!*/
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${bgColors.bgInput};
  border-radius: 16px;
  padding: 0 16px;
  gap: 8px;
  margin-bottom: 32px;
  z-index: 1;
`;

const StyledInput = styled.input`
  height: 32px;
  background: ${bgColors.bgInput};
  color: ${colors.inputColor};
  width: 100%;
  outline: none;
  border: none;
`;

const StyledIconWrapper = styled.div`
  display: flex;
`;

const AutoComplite = styled.ul`
  /* display: none; */
  position: absolute;
  padding-top: 15px;
  color: black;
  width: 100%;
  left: 0;
  top: 20px;
  background: ${bgColors.bgInput};
  z-index: -1;
  border-radius: 0 0 16px 16px;
`;

const AutoCompliteItem = styled.li`
  padding: 15px;
`;

const AutoCompliteLoader = styled.li`
  padding: 15px;
`;

const Search = () => {
  const [search, setSearch] = useState<string | undefined | null>();
  const [location, setLocation] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const [currentLocation, setCurrentLocation] = useState<any | undefined>();

  const ref = useRef<any>();
  const debouncedSearch = useDebounce(search, 1000);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleClear = () => {
    setSearch('');
  };

  useEffect(() => {
    setLoading(true);
    getLocation(debouncedSearch).then((res) => {
      setLoading(false);
      setLocation(res);
    });
    console.log(loading);
  }, [debouncedSearch]);

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]);

  getWeatherData(24.451111111, 54.396944444);

  return (
    <StyledLabel>
      <StyledIconWrapper>
        <IconSearch />
      </StyledIconWrapper>
      <StyledInput
        placeholder='Search Your City'
        type='text'
        onChange={handleChange}
      />
      <AutoComplite>
        {loading ? (
          <Loader />
        ) : (
          location &&
          location.map((l: any, index: number) => (
            <AutoCompliteItem
              key={index}
              onClick={() => {
                setCurrentLocation(l.value);
                setLocation([]);
                handleClear();
              }}
            >
              {l.label}
            </AutoCompliteItem>
          ))
        )}
      </AutoComplite>
    </StyledLabel>
  );
};

export { Search };
