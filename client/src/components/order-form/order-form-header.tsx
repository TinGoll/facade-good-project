import React, { FC, ReactNode, useEffect, useState } from "react";
import { Grid } from "../facade-good/form-components/grid";
import { FacadeGood } from "../../app-types";
import Select, { SelectOption } from "../facade-good/form-components/select";
import { Box, EmotionProps } from "../facade-good/facade-good";
import useOrderForm from "./use-order-form";
import { Order } from "./order-form-provider";

import ReactSelect from "react-select";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import "./select.css";

const yesNoOptions: SelectOption[] = [
  { label: "Да", value: "Да" },
  { label: "Нет", value: "Нет" },
];

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

const customNoOptionsMessage = () => "Нет доступных вариантов";

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
        <Select
          value={state.header.material}
          onChange={(value) => updateHeader({ material: value })}
          outline
          options={massiv}
          placeholder="Материал"
        />
        <Select
          value={state.header.model}
          onChange={(value) => updateHeader({ model: value })}
          outline
          options={filtredModel}
          placeholder="Модель"
        />

        <Select
          value={state.header.color}
          onChange={(value) => updateHeader({ color: value })}
          outline
          options={colors}
          placeholder="Цвет"
        />

        <ReactSelect
          isSearchable
          options={colors}
          styles={customStyles}
          noOptionsMessage={customNoOptionsMessage}
          placeholder="Цвет"
          components={{
            DropdownIndicator: () => (
              <Box
                css={{
                  translate: "0 25%",
                  border: "0.25em solid transparent",
                  borderTopColor: "#777",
                  marginRight: "10px", // Отступ справа
                  marginLeft: "10px", // Отступ слева
                }}
              />
            ),
          }}
        />

        <Select
          value={state.header.glossiness}
          onChange={(value) => updateHeader({ glossiness: value })}
          outline
          options={glossiness}
          placeholder="Блеск"
        />
        <Select
          value={state.header.drill}
          onChange={(value) => updateHeader({ drill: value })}
          outline
          options={yesNoOptions}
          placeholder="Присадка"
        />
        <Select
          value={state.header.patina}
          onChange={(value) => updateHeader({ patina: value })}
          outline
          options={patinas}
          placeholder="Патина"
        />
        {enabled && (
          <React.Fragment>
            <Select
              value={state.header.thermalseam}
              onChange={(value) => updateHeader({ thermalseam: value })}
              outline
              options={yesNoOptions}
              placeholder="Термошов"
            />
            <Select
              value={state.header.roll}
              onChange={(value) => updateHeader({ roll: value })}
              outline
              options={yesNoOptions}
              placeholder="Накат"
            />
          </React.Fragment>
        )}
      </Grid>
    </Box>
  );
};

export default OrderFormHeader;
