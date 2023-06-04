import React, { FC } from "react";
import {
  Table,
  THead,
  Row,
  Th,
  TBody,
} from "../facade-good/form-components/table";
import OrderDesktopTableFacadeRow from "./order-desktop-table-facade-row";
import { SelectOption } from "../facade-good/form-components/select";
import { Order } from "./order-form-provider";
import useOrderForm from "./use-order-form";
import { Box, Typography } from "../facade-good/facade-good";

interface Props {
  facadeType?: SelectOption<Order.FacadeType>[];
}

const FacadeTable: FC<Props> = ({ facadeType }) => {
  const { state, dispatch } = useOrderForm();

  const deleteHandler = (payload: number) =>
    dispatch({ type: "REMOVE_FACADE", payload });

    const handleChange = (payload: Order.Facade) => {
      dispatch({ type: "UPDATE_FACADE", payload })
    };

  if (!state.facades.length) {
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
          <Th css={{ maxWidth: 90, width: "10%" }}>Выс.</Th>
          <Th css={{ width: 20 }}></Th>
          <Th css={{ maxWidth: 90, width: "10%" }}>Шир.</Th>
          <Th css={{ width: 20 }}></Th>
          <Th css={{ maxWidth: 90, width: "10%" }}>Кол-во</Th>
          <Th css={{ minWidth: 100 }}>Вид</Th>
          <Th css={{ width: "auto" }}>Комментарий</Th>
          <Th css={{ width: 40 }}></Th>
        </Row>
      </THead>
      <TBody>
        {state.facades.map((item, index) => (
          <OrderDesktopTableFacadeRow
            key={item.id}
            item={item}
            onChange={(value) => handleChange(value)}
            onDelete={() => deleteHandler(index)}
            facadeType={facadeType}
          />
        ))}
      </TBody>
    </Table>
  );
};

export default FacadeTable;
