import React, { FC } from "react";
import { Hdbk } from "../../order-form/hdbk-types";
import Materials from "./materials";
import { Box, Typography } from "../../facade-good/facade-good";
import { FacadeGood } from "../../../app-types";
import Models from "./models";
import Colors from "./colors";
import Patina from "./patina";
import Glossiness from "./glossiness";
import Accessories from "./accessories";
import Facades from "./facades";
import FacadeCards from "./facade-cards";
import GalleryCards from "./gallery-cards";

function EmptyTab() {
  return (
    <Box
      css={{
        height: 300,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        css={(theme: FacadeGood.CustomTheme) => ({
          ...theme.typography.cardPrice,
          textAlign: "center",
        })}
      >
        Этот пункт меню еще не доступен.
      </Typography>
    </Box>
  );
}

interface Props {
  data: null | Hdbk.Data;
  tab: number;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminTabs: FC<Props> = ({
  data,
  setError,
  setRefresh,
  setToken,
  setLoading,
  tab,
  token,
}) => {
  switch (tab) {
    case 0:
      return (
        <Materials
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );
    case 1:
      return (
        <Models
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );
    case 2:
      return (
        <Colors
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );
    case 3:
      return (
        <Glossiness
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );
    case 4:
      return (
        <Patina
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );
    case 5:
      return (
        <Facades
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );
    case 6:
      return (
        <Accessories
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );
    case 7:
      return (
        <FacadeCards
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );

    case 8:
      return (
        <GalleryCards
          data={data}
          setError={setError}
          setRefresh={setRefresh}
          setToken={setToken}
          setLoading={setLoading}
          token={token}
        />
      );
    default:
      return <EmptyTab />;
  }
};

export default AdminTabs;
