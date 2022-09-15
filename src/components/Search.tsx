/*Import React*/
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormEvent, useEffect, useState, memo } from 'react';

/*Import Styles*/
import { bgColors, colors } from '../styles/variables';
import { Loader } from '../styles/Loader';

/*Import Images*/
import { ReactComponent as IconSearch } from '../assets/images/icon_search.svg';
import noLocation from '../assets/images/icon_nolocation.gif';

/*Import Helpers*/
import { getLocation } from '../api/getLocation';

/*Import Hooks*/
import { useDebounce } from '../hooks/useDebounce';

/*Import Types*/
import { CurrentLocationProps } from '../types/types';

const StyledLabel = styled.label`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${bgColors.bgInput};
  border-radius: 16px;
  padding: 0 16px;
  gap: 8px;
  margin-bottom: 20px;
  z-index: 1;
  transition: background-color 0.5s ease, box-shadow 0.5s ease;
  &:focus-within {
    background-color: #d8d8d8;
    box-shadow: 0px 0px 0px 2px rgba(34, 60, 80, 1);
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
  location: boolean;
  $loading: boolean;
}

const AutoComplite = styled.ul<AutoCompliteProps>`
  position: absolute;
  color: black;
  width: 100%;
  left: 0;
  top: 40px;
  background: ${bgColors.bgInput};
  border: ${({ search, location, $loading }) =>
    (search && location) || $loading ? '1px solid black' : 'none'};
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

const AutoCompliteMessage = styled.li<{ background?: string }>`
  background: url(${(props) => props.background});
  display: flex;
  color: ${colors.lightColor};
  font-weight: 600;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const AutoCompliteError = styled.li`
  display: flex;
  color: ${colors.darkColor};
  font-weight: 600;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

interface SearchProps {
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<CurrentLocationProps | null>
  >;
}

const SearchInner = React.forwardRef(
  (
    { setCurrentLocation }: SearchProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [search, setSearch] = useState<string>('');
    const [location, setLocation] = useState<CurrentLocationProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const debouncedSearch = useDebounce(search, 600);

    const handleChange = (e: FormEvent<HTMLInputElement>) =>
      setSearch(e.currentTarget.value);

    const handleClear = () => setSearch('');

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
        <AutoComplite
          search={!!debouncedSearch}
          location={location?.length !== 0}
          $loading={loading}
        >
          {loading && <Loader />}
          {!loading && location?.length === 0 && debouncedSearch && (
            <AutoCompliteMessage background={noLocation}>
              No such location
            </AutoCompliteMessage>
          )}
          {!loading && !location && debouncedSearch && (
            <AutoCompliteError>Try again later</AutoCompliteError>
          )}
          {!loading &&
            debouncedSearch &&
            location &&
            location.map((l: CurrentLocationProps, index: number) => (
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
export const Search = memo(SearchInner);
