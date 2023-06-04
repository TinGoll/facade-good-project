import React, { FC, ReactNode, useEffect, useState } from "react";
import { Grid } from "../facade-good/form-components/grid";
import { FacadeGood } from "../../app-types";
import Select, { SelectOption } from "../facade-good/form-components/select";
import { Box, EmotionProps } from "../facade-good/facade-good";
import useOrderForm from "./use-order-form";
import { Order } from "./order-form-provider";

interface Material {
  type: "Массив" | "МДФ";
  value: string;
}

const massivOptions: SelectOption<Material>[] = [
  { label: "Дуб", value: "Дуб", type: "Массив" },
  { label: "Ольха", value: "Ольха", type: "Массив" },
  { label: "Ясень", value: "Ясень", type: "Массив" },
  { label: "МДФ 16 мм", value: "МДФ 16 мм", type: "МДФ" },
  { label: "МДФ 19 мм", value: "МДФ 19 мм", type: "МДФ" },
  { label: "МДФ 22 мм", value: "МДФ 22 мм", type: "МДФ" },
];

const colorOptions: SelectOption[] = [
  { label: "Ваниль", value: "Ваниль", type: "Эмаль" },
  { label: "Капучино", value: "Капучино", type: "Морилка" },
  { label: "Ral9000", value: "Ral9000", type: "Эмаль" },
]

const patinaOptions: SelectOption[] = [
  { label: "Золото", value: "Золото",},
  { label: "Серебро", value: "Серебро", },
  { label: "Розовое золото", value: "Розовое золото", },
]

const modelOptions: SelectOption[] = [
  { label: "Григорий", value: "Григорий", type: "МДФ" },
  { label: "Василий", value: "Василий", type: "МДФ" },
  { label: "Степан", value: "Степан", type: "МДФ" },
  { label: "Татьяна", value: "Татьяна", type: "Массив" },
  { label: "Афина", value: "Афина", type: "Массив" },
  { label: "Лувр", value: "Лувр", type: "Массив" },
]

const glossinessOptions: SelectOption[] = [
  { label: "Глубоко матовый (10%)", value: "Глубоко матовый (10%)",},
  { label: "Матовый (20%)", value: "Матовый (20%)", },
  { label: "Лёгкий глянец (40%)", value: "Лёгкий глянец (40%)", },
  { label: "Глянец (70%)", value: "Глянец (70%)", },
  { label: "Сильный глянец (90%)", value: "Сильный глянец (90%)", },

]

const yesNoOptions: SelectOption[] = [
  { label: "Да", value: "Да", },
  { label: "Нет", value: "Нет", },
]

interface Props extends EmotionProps<HTMLDivElement> {
  children?: ReactNode;
}

const OrderFormHeader: FC<Props> = ({ children, ...props }) => {

  const [enabled, setEnabled] = useState(false);
  const { state, dispatch } = useOrderForm();

  function updateHeader (payload: Partial<Order.Header> = {}) {
    dispatch({type: "UPDATE_HEADER", payload})
  }


  useEffect(() => {
    if (state.header.material?.type === "Массив") {
      setEnabled(true);
    } else {
      setEnabled(false);
      if (state.header.roll || state.header.thermalseam) {
        updateHeader({thermalseam: undefined, roll: undefined})
      }
    }


  }, [state.header]);

  return (
    <Box {...props}>
      <Grid columns={3} gap={16}>
        <Select
          value={state.header.material}
          onChange={(value) => updateHeader({ material: value })}
          outline
          options={massivOptions}
          placeholder="Материал"
        />
        <Select
          value={state.header.model}
          onChange={(value) => updateHeader({ model: value })}
          outline
          options={modelOptions}
          placeholder="Модель"
        />
        <Select
          value={state.header.color}
          onChange={(value) => updateHeader({ color: value })}
          outline
          options={colorOptions}
          placeholder="Цвет"
        />
        <Select
          value={state.header.glossiness}
          onChange={(value) => updateHeader({ glossiness: value })}
          outline
          options={glossinessOptions}
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
          options={patinaOptions}
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
