import React, { FC } from "react";
import { Hdbk } from "../../order-form/hdbk-types";
interface Props {
  data: null | Hdbk.Data;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
}
const Models: FC<Props> = ({
  data,
  setError,
  setRefresh,
  setToken,
  setLoading,
  token,
}) => {
  return <div>Models{JSON.stringify(data, null, 2)}</div>;
};

export default Models;
