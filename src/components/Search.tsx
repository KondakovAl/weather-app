import styled from 'styled-components';

/*Import Variables*/
import { bgColors, colors } from '../styles/variables';

/*Import Images*/
import { ReactComponent as IconSearch } from '../assets/images/icon_search.svg';

/*Import Styles*/
import { StyledFlex } from '../styles/StyledFlex';
import { FormEvent, useEffect, useState } from 'react';
import { getLocation } from '../api/getLocation';

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

const Search = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [location, setLocation] = useState<any>();

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    console.log(location);
    setLocation(getLocation(search!));
  }, [search]);

  return (
    <StyledLabel>
      <StyledIconWrapper>
        <IconSearch />
      </StyledIconWrapper>
      <StyledInput
        placeholder='Search Your City'
        type='text'
        onChange={changeHandler}
      />
      <AutoComplite>
        {/* {location &&
          location.map((l: any, index: number) => (
            <AutoCompliteItem key={index}>{l.label}</AutoCompliteItem>
          ))} */}
      </AutoComplite>
    </StyledLabel>
  );
};

export { Search };
