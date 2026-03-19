import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./HistoryWork.scss";
import { numToDollarRounded } from "../../utils/utils";

interface WorkHistoryItem {
  id: string;
  detalle: string;
}

interface HistoryWorkRow {
  id: string;
  fechaIngreso: string;
  matricula: string;
  vehiculo: string;
  fechaEntrega: string;
  arreglosRealizados: WorkHistoryItem[];
  costoServicio: number;
}

// Dummy data (como en `WorkTracking`) para simular el histórico.
const trabajosMock: HistoryWorkRow[] = [
  {
    id: "1",
    fechaIngreso: "10/03/2025",
    matricula: "AB123CD",
    vehiculo: "Volkswagen Gol Trend 2018",
    fechaEntrega: "20/03/2025",
    costoServicio: 45000,
    arreglosRealizados: [
      { id: "1-1", detalle: "Cambio de aceite y filtros" },
      { id: "1-2", detalle: "Rectificación de frenos (pastillas)" },
      { id: "1-3", detalle: "Ajuste de alineación" },
    ],
  },
  {
    id: "2",
    fechaIngreso: "08/03/2025",
    matricula: "XY456ZZ",
    vehiculo: "Ford Focus 2020",
    fechaEntrega: "18/03/2025",
    costoServicio: 62000,
    arreglosRealizados: [
      { id: "2-1", detalle: "Reemplazo de batería" },
      { id: "2-2", detalle: "Service general" },
    ],
  },
  {
    id: "3",
    fechaIngreso: "05/03/2025",
    matricula: "MN789PQ",
    vehiculo: "Chevrolet Onix 2022",
    fechaEntrega: "15/03/2025",
    costoServicio: 39000,
    arreglosRealizados: [
      { id: "3-1", detalle: "Cambio de correa de distribución" },
      { id: "3-2", detalle: "Revisión de luces y corrección de fallas" },
    ],
  },
  {
    id: "4",
    fechaIngreso: "01/03/2025",
    matricula: "RS321TU",
    vehiculo: "Fiat Palio Fire 2016",
    fechaEntrega: "11/03/2025",
    costoServicio: 28000,
    arreglosRealizados: [
      { id: "4-1", detalle: "Reemplazo de bujías" },
      { id: "4-2", detalle: "Revisión de sistema de carga" },
      { id: "4-3", detalle: "Cambio de líquido refrigerante" },
    ],
  },
  {
    id: "5",
    fechaIngreso: "12/03/2025",
    matricula: "JK654LM",
    vehiculo: "Toyota Corolla 2019",
    fechaEntrega: "22/03/2025",
    costoServicio: 74000,
    arreglosRealizados: [
      { id: "5-1", detalle: "Cambio de neumáticos (balanceo incluido)" },
      { id: "5-2", detalle: "Rotación y alineación" },
    ],
  },
];

export default function HistoryWork(): React.ReactElement {
  const [expandedRows, setExpandedRows] = useState<any[] | undefined>(undefined);

  const rowExpansionTemplate = (rowData: HistoryWorkRow): React.ReactNode => {
    return (
      <div className="history-work__expanded">
        <div className="history-work__expanded-title">Servicios realizados</div>
        <ul className="history-work__expanded-list">
          {rowData.arreglosRealizados.map((it) => (
            <li key={it.id} className="history-work__expanded-item">
              {it.detalle}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="history-work">
      <Grid>
        <Grid.Row>
          <Grid.Column computer={16}>
            <div className="history-work__title">
              <h4>Histórico de Trabajos</h4>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Divider />
            <div className="history-work__content">
              <div className="history-work__table">
                <DataTable
                  value={trabajosMock}
                  emptyMessage="No hay trabajos registrados."
                  sortMode="single"
                  dataKey="id"
                  expandedRows={expandedRows as any}
                  onRowToggle={(e) => setExpandedRows(e.data)}
                  rowExpansionTemplate={rowExpansionTemplate}
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
                  <Column
                    field="fechaEntrega"
                    header="Fecha de entrega"
                    sortable
                  />
                  <Column
                    field="costoServicio"
                    header="Costo servicio"
                    sortable
                    body={(rowData: HistoryWorkRow) =>
                      numToDollarRounded(rowData.costoServicio)
                    }
                  />
                  <Column expander style={{ width: "3em" }} />
                </DataTable>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

