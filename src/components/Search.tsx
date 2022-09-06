import styled from 'styled-components';
import { Link } from 'react-router-dom';

/*Import Variables*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconSearch } from '../assets/images/icon_search.svg';

/*Import Styles*/

import { FormEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { getLocation } from '../api/getLocation';
import { useDebounce } from '../hooks/useDebounce';
import { Loader } from '../styles/Loader';
import React from 'react';

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
  margin-bottom: 20px;
  z-index: 0;
  transition: background-color 0.5s ease, border 0.5s ease;
  &:focus-within {
    background-color: #d8d8d8;
    border: 1px solid black;
    z-index: 1;
  }
`;

const StyledInput = styled.input`
  height: 32px;
  background: ${bgColors.bgInput};
  color: ${colors.inputColor};
  width: 100%;
  outline: none;
  border: none;
  transition: background-color 0.5s ease;
  &:focus {
    background-color: #d8d8d8;
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  z-index: 10;
`;

interface AutoCompliteProps {
  search: boolean;
}

const AutoComplite = styled.ul<AutoCompliteProps>`
  position: absolute;
  color: black;
  width: 100%;
  left: 0;
  top: 40px;
  background: ${bgColors.bgInput};
  border: ${(p) => (p.search ? '1px solid black;' : 'none')};
  z-index: -1;
  border-radius: 16px;
  overflow: hidden;
`;

const AutoCompliteItem = styled.li`
  padding: 15px;
  transition: background-color 0.3s ease-in;
  &:hover {
    background-color: #d8d8d8;
  }
`;

const AutoCompliteMessage = styled.div`
  padding: 15px;
`;

interface SearchProps {
  setCurrentLocation: (currentLocation: any) => void;
  // ref?: React.MutableRefObject<HTMLInputElement> | any;
}

const Search = React.forwardRef(
  (
    { setCurrentLocation }: SearchProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [search, setSearch] = useState<string | undefined | null>();
    const [location, setLocation] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | undefined>();

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
          ref={ref}
        />
        <AutoComplite search={debouncedSearch}>
          {loading && <Loader />}
          {!loading && location?.length == 0 && debouncedSearch && (
            <AutoCompliteMessage>No such location</AutoCompliteMessage>
          )}
          {!loading &&
            debouncedSearch &&
            location &&
            location.map((l: any, index: number) => (
              <Link to='/card' key={index}>
                <AutoCompliteItem
                  onClick={() => {
                    setCurrentLocation(l);
                    setLocation([]);
                    handleClear();
                  }}
                >
                  {l.label}
                </AutoCompliteItem>
              </Link>
            ))}
        </AutoComplite>
      </StyledLabel>
    );
  }
);
export { Search };
