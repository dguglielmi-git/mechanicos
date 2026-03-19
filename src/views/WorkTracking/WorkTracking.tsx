import React, { useState, useCallback } from "react";
import { Grid, Button, Icon } from "semantic-ui-react";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import WorkForm from "../../components/WorkForm";
import "./WorkTracking.scss";
import type { WorkEstado } from "../../components/WorkForm/interfaces";

interface WorkRow {
  id: string;
  fechaIngreso: string;
  matricula: string;
  vehiculo: string;
  km: string;
  costoTotalServicio: string;
  estado: string;
}

const trabajosMock: WorkRow[] = [
  {
    id: "1",
    fechaIngreso: "10/03/2025",
    matricula: "AB123CD",
    vehiculo: "Volkswagen Gol Trend 2018",
    km: "125000",
    costoTotalServicio: "45000",
    estado: "Ingresado",
  },
  {
    id: "2",
    fechaIngreso: "08/03/2025",
    matricula: "XY456ZZ",
    vehiculo: "Ford Focus 2020",
    km: "82000",
    costoTotalServicio: "62000",
    estado: "En Proceso",
  },
  {
    id: "3",
    fechaIngreso: "05/03/2025",
    matricula: "MN789PQ",
    vehiculo: "Chevrolet Onix 2022",
    km: "45000",
    costoTotalServicio: "39000",
    estado: "Listo para Retirar",
  },
  {
    id: "4",
    fechaIngreso: "01/03/2025",
    matricula: "RS321TU",
    vehiculo: "Fiat Palio Fire 2016",
    km: "135000",
    costoTotalServicio: "28000",
    estado: "Entregado",
  },
  {
    id: "5",
    fechaIngreso: "12/03/2025",
    matricula: "JK654LM",
    vehiculo: "Toyota Corolla 2019",
    km: "99000",
    costoTotalServicio: "74000",
    estado: "Ingresado",
  },
];

export default function WorkTracking(): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WorkRow | null>(null);

  const handleCloseForm = useCallback(() => {
    setIsEditing(false);
    setSelectedRow(null);
  }, []);

  const opcionesBody = (row: WorkRow): React.ReactElement => (
    <div className="work-tracking__opciones">
      <Button
        size="small"
        icon
        labelPosition="left"
        onClick={() => {
          setSelectedRow(row);
          setIsEditing(true);
        }}
        title="Editar"
      >
        <Icon name="edit" />
        Edit
      </Button>
    </div>
  );

  return (
    <div className="work-tracking">
      <Grid>
        <Grid.Row>
          <Grid.Column computer={16}>
            <div className="work-tracking__title">
              <h4>Seguimiento de Trabajos</h4>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Divider />
            <div className="work-tracking__content">
              {isEditing ? (
                <div className="work-tracking__form">
                  <WorkForm
                    onCancel={handleCloseForm}
                    initialData={
                      selectedRow
                        ? {
                            matricula: selectedRow.matricula,
                            km: selectedRow.km,
                            costoTotalServicio: selectedRow.costoTotalServicio,
                            estado: selectedRow.estado as WorkEstado,
                          }
                        : undefined
                    }
                  />
                </div>
              ) : (
                  <div className="work-tracking__table">
                    <DataTable
                      value={trabajosMock}
                      emptyMessage="No hay trabajos registrados."
                      sortMode="single"
                    >
                      <Column
                        field="fechaIngreso"
                        header="Fecha Ingreso"
                        sortable
                      />
                      <Column
                        field="matricula"
                        header="Matricula"
                        sortable
                      />
                      <Column
                        field="vehiculo"
                        header="Vehiculo"
                        sortable
                      />
                      <Column field="km" header="Km" sortable />
                      <Column
                        field="costoTotalServicio"
                        header="Costo Total Servicio"
                        sortable
                      />
                      <Column
                        field="estado"
                        header="Estado"
                        sortable
                      />
                      <Column
                        header="Opciones"
                        body={(row: WorkRow) => opcionesBody(row)}
                      />
                    </DataTable>
                  </div>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
