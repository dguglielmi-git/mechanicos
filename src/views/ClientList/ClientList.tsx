import React, { useState } from "react";
import { Input, Button } from "semantic-ui-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Client } from "./interfaces";
import "./ClientList.scss";

const clients: Client[] = [];

export default function ClientList(): React.ReactElement {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (): void => {
    console.log("Buscar:", searchText);
  };

  return (
    <div className="client-list">
      <div className="client-list__header">
        <h2>Listado de Clientes</h2>
      </div>
      <div className="client-list__search">
        <Input
          icon="search"
          iconPosition="left"
          placeholder="Buscar Cliente"
          value={searchText}
          onChange={(_, data) => setSearchText(data.value)}
          onKeyPress={(e: React.KeyboardEvent) => e.key === "Enter" && handleSearch()}
          className="client-list__search-input"
        />
        <Button color="blue" onClick={handleSearch} className="client-list__search-btn">
          Buscar
        </Button>
      </div>
      <div className="client-list__table">
        <DataTable value={clients} emptyMessage="No hay clientes registrados.">
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column field="email" header="Email" />
        </DataTable>
      </div>
    </div>
  );
}
