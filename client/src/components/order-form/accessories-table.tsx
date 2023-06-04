import React, { FC } from "react";
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
  accessorieType: SelectOption<Order.AccessorieType>[];
  accessorieModel: SelectOption<Order.AccessorieModel>[];
}

const AccessoriesTable: FC<Props> = ({
  accessorieModel = [],
  accessorieType = [],
}) => {
  const { state, dispatch } = useOrderForm();


  const deleteHandler = (payload: number) =>
    dispatch({ type: "REMOVE_ACCESSORIE", payload });

  const handleChange = (payload: Order.Accessorie) => {
    dispatch({ type: "UPDATE_ACCESSORIE", payload })
  };

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
          <Th css={{ minWidth: 90 }}>Вид</Th>
          <Th css={{ minWidth: 90 }}>Модель</Th>
          <Th css={{ maxWidth: 90, width: "10%" }}>Выс./Длин.</Th>
          <Th css={{ maxWidth: 90, width: "10%" }}>Кол-во</Th>
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
            accessorieType={accessorieType}
          />
        ))}
      </TBody>
    </Table>
  );
};

export default AccessoriesTable;
