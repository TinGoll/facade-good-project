import React, { FC, ReactNode, useEffect, useState } from "react";
import { Grid } from "../facade-good/form-components/grid";
import Select, { SelectOption } from "../facade-good/form-components/select";
import { Box, EmotionProps } from "../facade-good/facade-good";
import useOrderForm from "./use-order-form";
import { Order } from "./order-form-provider";

import ReactSelect from "react-select";

import "./select.css";

const yesNoOptions: SelectOption[] = [
  { label: "Да", value: "Да" },
  { label: "Нет", value: "Нет" },
];

const formatOptionLabel = ({ label, value }: { label: string; value: any }) => (
  <div>
    <span>{label}: </span>
    <span>{value}</span>
  </div>
);

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "rgba(57, 76, 96, 0.04)" : "white",
    color: "rgba(57, 76, 96, 1)",
    ":hover": {
      backgroundColor: "rgba(57, 76, 96, 0.04)",
    },
  }),
  control: (baseStyles: any, state: any) => {
    baseStyles["&:hover"] = {
      borderColor: "none",
    };
    return {
      ...baseStyles,
      outline: state.isFocused
        ? `2px solid #FFB421 !important`
        : "0 !important",
      borderColor: state.isFocused ? "hsl(0, 0%, 90%)" : "hsl(0, 0%, 80%)",
      backgroundColor: state.isFocused ? "rgba(57, 76, 96, 0.02)" : "white",
      height: "100%",
    };
  },
  dropdownIndicator: (provided: any) => ({
    ...provided,
    transform: "translate(0, 25%)",
  }),
};

const Arrow = () => (
  <Box
    css={{
      translate: "0 25%",
      border: "0.25em solid transparent",
      borderTopColor: "#777",
      marginRight: "10px", // Отступ справа
      marginLeft: "10px", // Отступ слева
    }}
  />
);

interface Props extends EmotionProps<HTMLDivElement> {
  children?: ReactNode;
  massiv: SelectOption<Order.Material>[];
  models: SelectOption<Order.Model>[];
  colors: SelectOption[];
  patinas: SelectOption[];
  glossiness: SelectOption[];
}

const OrderFormHeader: FC<Props> = ({
  children,
  massiv,
  models,
  colors,
  patinas,
  glossiness,
  ...props
}) => {
  const [enabled, setEnabled] = useState(false);
  const { state, dispatch } = useOrderForm();

  const [filtredModel, setFiltredModel] = useState<SelectOption<Order.Model>[]>(
    []
  );

  function updateHeader(payload: Partial<Order.Header> = {}) {
    dispatch({ type: "UPDATE_HEADER", payload });
  }

  useEffect(() => {
    if (state.header.material?.type === "Массив") {
      setEnabled(true);
    } else {
      setEnabled(false);
      if (state.header.roll || state.header.thermalseam) {
        updateHeader({ thermalseam: undefined, roll: undefined });
      }
    }
  }, [state.header]);

  useEffect(() => {
    if (massiv.length && models.length && state.header.material) {
      setFiltredModel(
        models.filter((m) => {
          const matrialTypes = m.materials || [];
          if (!matrialTypes.length) {
            return true;
          }
          return matrialTypes.includes(state.header.material?.type || "");
        })
      );
    } else {
      setFiltredModel([]);
    }
  }, [massiv, models, state.header]);

  return (
    <Box {...props}>
      <Grid columns={3} gap={16}>
        <ReactSelect
          options={massiv}
          placeholder="Материал"
          value={state.header.material}
          onChange={(value: any) => updateHeader({ material: value })}
          styles={customStyles}
          isClearable
          components={{
            DropdownIndicator: Arrow,
          }}
          noOptionsMessage={() => "Список пуст"}
        />

        {/* <Select
          value={state.header.material}
          onChange={(value) => updateHeader({ material: value })}
          outline
          options={massiv}
          placeholder="Материал"
        /> */}
        <ReactSelect
          options={filtredModel}
          placeholder="Модель"
          value={state.header.model}
          onChange={(value: any) => updateHeader({ model: value })}
          styles={customStyles}
          isSearchable
          isClearable
          components={{
            DropdownIndicator: Arrow,
          }}
          noOptionsMessage={() => "Выберите материал"}
        />
        {/* <Select
          value={state.header.model}
          onChange={(value) => updateHeader({ model: value })}
          outline
          options={filtredModel}
          placeholder="Модель"
        /> */}
        <ReactSelect
          options={colors}
          placeholder="Цвет"
          value={state.header.color}
          onChange={(e: any) => {
            updateHeader({ color: e });
          }}
          styles={customStyles}
          isSearchable
          isClearable
          components={{
            DropdownIndicator: Arrow,
          }}
          noOptionsMessage={() => "Список пуст"}
        />

        <ReactSelect
          options={glossiness}
          placeholder="Блеск"
          value={state.header.glossiness}
          onChange={(value: any) => updateHeader({ glossiness: value })}
          styles={customStyles}
          isClearable
          components={{
            DropdownIndicator: Arrow,
          }}
          noOptionsMessage={() => "Список пуст"}
        />

        {/* <Select
          value={state.header.glossiness}
          onChange={(value) => updateHeader({ glossiness: value })}
          outline
          options={glossiness}
          placeholder="Блеск"
        /> */}
        <ReactSelect
          options={yesNoOptions}
          placeholder="Присадка"
          value={state.header.drill}
          onChange={(value: any) => updateHeader({ drill: value })}
          styles={customStyles}
          isClearable
          components={{
            DropdownIndicator: Arrow,
          }}
          noOptionsMessage={() => "Список пуст"}
        />
        {/* <Select
          value={state.header.drill}
          onChange={(value) => updateHeader({ drill: value })}
          outline
          options={yesNoOptions}
          placeholder="Присадка"
        /> */}
        <ReactSelect
          options={patinas}
          placeholder="Патина"
          value={state.header.patina}
          onChange={(value: any) => updateHeader({ patina: value })}
          styles={customStyles}
          isSearchable
          isClearable
          components={{
            DropdownIndicator: Arrow,
          }}
          noOptionsMessage={() => "Список пуст"}
        />
        {/* <Select
          value={state.header.patina}
          onChange={(value) => updateHeader({ patina: value })}
          outline
          options={patinas}
          placeholder="Патина"
        /> */}
        {enabled && (
          <React.Fragment>
            <ReactSelect
              options={yesNoOptions}
              placeholder="Термошов"
              value={state.header.thermalseam}
              onChange={(value: any) => updateHeader({ thermalseam: value })}
              styles={customStyles}
              isClearable
              components={{
                DropdownIndicator: Arrow,
              }}
              noOptionsMessage={() => "Список пуст"}
            />
            {/* <Select
              value={state.header.thermalseam}
              onChange={(value) => updateHeader({ thermalseam: value })}
              outline
              options={yesNoOptions}
              placeholder="Термошов"
            /> */}
            <ReactSelect
              options={yesNoOptions}
              placeholder="Накат"
              value={state.header.roll}
              onChange={(value: any) => updateHeader({ roll: value })}
              styles={customStyles}
              isClearable
              components={{
                DropdownIndicator: Arrow,
              }}
              noOptionsMessage={() => "Список пуст"}
            />
            {/* <Select
              value={state.header.roll}
              onChange={(value) => updateHeader({ roll: value })}
              outline
              options={yesNoOptions}
              placeholder="Накат"
            /> */}
          </React.Fragment>
        )}
      </Grid>
    </Box>
  );
};

export default OrderFormHeader;
