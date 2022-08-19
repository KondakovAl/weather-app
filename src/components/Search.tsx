import styled from 'styled-components';
import { Link } from 'react-router-dom';

/*Import Variables*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconSearch } from '../assets/images/icon_search.svg';

/*Import Styles*/

import { FormEvent, useEffect, useRef, useState } from 'react';
import { getLocation } from '../api/getLocation';
import { useDebounce } from '../hooks/useDebounce';
import { Loader } from '../styles/Loader';

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
  overflow: hidden;
`;

const AutoCompliteItem = styled.li`
  padding: 15px;
  transition: background 0.3s ease-in;
  &:hover {
    background: ${bgColors.bgGreyColor};
  }
`;

interface SearchProps {
  setCurrentLocation: (currentLocation: string) => void;
}

const Search = ({ setCurrentLocation }: SearchProps) => {
  const [search, setSearch] = useState<string | undefined | null>();
  const [location, setLocation] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const debouncedSearch = useDebounce(search, 600);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleClear = () => {
    setSearch('');
  };

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      getLocation(debouncedSearch).then((res) => {
        setLoading(false);
        setLocation(res);
      });
    }
    console.log(loading);
  }, [debouncedSearch]);

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
            <Link to='/card'>
              <AutoCompliteItem
                key={index}
                onClick={() => {
                  setCurrentLocation(l);
                  setLocation([]);
                  handleClear();
                }}
              >
                {l.label}
              </AutoCompliteItem>
            </Link>
          ))
        )}
      </AutoComplite>
    </StyledLabel>
  );
};

export { Search };
