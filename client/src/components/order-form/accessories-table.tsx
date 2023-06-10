import React, { FC, useEffect, useState } from "react";
import {
  Table,
  THead,
  Row,
  Th,
  TBody,
} from "../facade-good/form-components/table";
import OrderDesktopTableAccessoriesRow from "./order-desktop-table-accessories-row";
import { Order } from "./order-form-provider";
import { SelectOption } from "../facade-good/form-components/select";
import useOrderForm from "./use-order-form";
import { Box, Typography } from "../facade-good/facade-good";

interface Props {
  accessorieModel: SelectOption<Order.AccessorieModel>[];
}

const AccessoriesTable: FC<Props> = ({ accessorieModel = [] }) => {
  const { state, dispatch } = useOrderForm();
  const [accessorieTypes, setAccessorieTypes] = useState<SelectOption[]>([]);

  const deleteHandler = (payload: number) =>
    dispatch({ type: "REMOVE_ACCESSORIE", payload });

  const handleChange = (payload: Order.Accessorie) => {
    dispatch({ type: "UPDATE_ACCESSORIE", payload });
  };

  useEffect(() => {
    setAccessorieTypes(
      [...new Set(accessorieModel.map((v) => v.group))].map((v) => ({
        value: v,
        label: v,
      }))
    );
  }, [accessorieModel]);

  if (!state.accessories.length) {
    return (
      <Box>
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <Table>
      <THead>
        <Row>
          <Th css={{ width: 180 }}>Вид</Th>
          <Th css={{ width: 220 }}>Модель</Th>
          <Th css={{ width: 120 }}>Выс./Длин.</Th>
          <Th css={{ width: 90 }}>Кол-во</Th>
          <Th css={{ width: "auto" }}>Комментарий</Th>
          <Th css={{ width: 40 }}></Th>
        </Row>
      </THead>
      <TBody>
        {state.accessories.map((item, index) => (
          <OrderDesktopTableAccessoriesRow
            item={item}
            onChange={(value) => handleChange(value)}
            onDelete={() => deleteHandler(index)}
            key={item.id}
            accessorieModel={accessorieModel}
            accessorieType={accessorieTypes}
          />
        ))}
      </TBody>
    </Table>
  );
};

export default AccessoriesTable;
