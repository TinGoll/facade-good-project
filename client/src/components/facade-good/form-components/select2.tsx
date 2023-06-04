import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from '../facade-good';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
}

interface SelectStylesProps {
  isOpen: boolean;
}

const SelectContainer = styled.div`
  position: relative;
`;

const SelectWrapper = styled.div<SelectStylesProps>`
  display: inline-block;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  background-color: #fff;
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: solid #999;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
    transform: rotate(${(props) => (props.isOpen ? '45deg' : '-45deg')});
  }
`;

const OptionItem = styled.div`
  padding: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  font-size: 12px;
  color: #999;
  cursor: pointer;
`;

const Select: React.FC<SelectProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClearSelection = (): void => {
    setSelectedOption(null);
    setIsOpen(false); // Close the dropdown after clearing the selection
  };

  return (
    <SelectContainer>
      <SelectWrapper isOpen={isOpen} onClick={handleToggle} ref={selectRef}>
        {selectedOption ? (
          <>
            {selectedOption.label}
            <ClearButton onClick={handleClearSelection}>Clear</ClearButton>
          </>
        ) : (
          'Select an option'
        )}
        {isOpen && (
          <Box
            css={css`
              position: absolute;
              top: 100%;
              left: 0;
              z-index: 999;
            `}
          >
            {options.map((option) => (
              <OptionItem
                key={option.value}
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </OptionItem>
            ))}
          </Box>
        )}
      </SelectWrapper>
    </SelectContainer>
  );
};

export default Select;
