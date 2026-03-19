import React, { useEffect, useState, useCallback } from "react";
import { Button, Icon, Dropdown } from "semantic-ui-react";
import TextField from "@material-ui/core/TextField";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { WorkFormData, WorkEstado, WorkServiceRow } from "./interfaces";
import "./WorkForm.scss";

const ESTADO_OPTIONS: { key: WorkEstado; value: WorkEstado; text: string }[] = [
  { key: "Ingresado", value: "Ingresado", text: "Ingresado" },
  { key: "En Proceso", value: "En Proceso", text: "En Proceso" },
  { key: "Listo para Retirar", value: "Listo para Retirar", text: "Listo para Retirar" },
  { key: "Entregado", value: "Entregado", text: "Entregado" },
];

const initialFormState: WorkFormData = {
  matricula: "",
  km: "",
  costoTotalServicio: "",
  estado: "",
};

export interface WorkFormProps {
  /** Si se pasa, se muestra el boton Cerrar al lado de Guardar Trabajo y se invoca al hacer click */
  onCancel?: () => void;
  initialData?: Partial<WorkFormData>;
}

export default function WorkForm({
  onCancel,
  initialData,
}: Readonly<WorkFormProps>): React.ReactElement {
  const [formData, setFormData] = useState<WorkFormData>(initialFormState);
  const [descripcionServicio, setDescripcionServicio] = useState("");
  const [servicios, setServicios] = useState<WorkServiceRow[]>([]);

  useEffect(() => {
    if (!initialData) return;
    setFormData((prev) => ({
      ...prev,
      ...initialData,
    }));
  }, [initialData]);

  const updateField = useCallback(
    (field: keyof WorkFormData, value: string): void => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAgregar = useCallback((): void => {
    const trimmed = descripcionServicio.trim();
    if (!trimmed) return;
    setServicios((prev) => [
      ...prev,
      { id: String(Date.now()), descripcion: trimmed },
    ]);
    setDescripcionServicio("");
  }, [descripcionServicio]);

  const removeServicio = useCallback((id: string): void => {
    setServicios((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const opcionBody = (row: WorkServiceRow): React.ReactElement => (
    <div className="work-form__table-opcion">
      <Icon
        name="trash"
        link
        onClick={() => removeServicio(row.id)}
        title="Eliminar"
      />
    </div>
  );

  return (
    <div className="work-form">
      <div className="work-form__form-fields">
        <div className="work-form__labels">
          <span className="work-form__label">Cliente:</span>
          <span className="work-form__label">Vehiculo:</span>
        </div>
        <div className="work-form__form-row">
            <TextField
              label="Matricula"
              variant="outlined"
              size="small"
              value={formData.matricula}
              onChange={(e) => updateField("matricula", e.target.value)}
              className="work-form__field"
            />
            <TextField
              label="Km"
              variant="outlined"
              size="small"
              value={formData.km}
              onChange={(e) => updateField("km", e.target.value)}
              className="work-form__field"
            />
            <TextField
              label="Costo Total Servicio"
              variant="outlined"
              size="small"
              value={formData.costoTotalServicio}
              onChange={(e) =>
                updateField("costoTotalServicio", e.target.value)
              }
              className="work-form__field"
            />
          <Dropdown
            placeholder="Estado"
            selection
            options={ESTADO_OPTIONS}
            value={formData.estado}
            onChange={(_, data) =>
              updateField("estado", (data.value as WorkEstado) ?? "")
            }
              className="work-form__field work-form__dropdown"
          />
        </div>
        <div className="work-form__form-row work-form__form-row--full">
            <TextField
              label="Descripcion servicio realizado"
              variant="outlined"
              size="small"
              value={descripcionServicio}
              onChange={(e) => setDescripcionServicio(e.target.value)}
              className="work-form__field work-form__field-desc"
              onKeyDown={(e: React.KeyboardEvent) =>
                e.key === "Enter" && handleAgregar()
              }
            />
          <Button color="green" onClick={handleAgregar} className="work-form__btn-add">
            <Icon name="add" />
            Agregar
          </Button>
        </div>
      </div>
      <div className="work-form__table-wrap">
        <DataTable
          value={servicios}
          emptyMessage="No hay servicios agregados."
          className="work-form__table"
        >
          <Column
            field="descripcion"
            header="Descripcion"
            style={{ width: "80%" }}
          />
          <Column
            header="Opcion"
            body={(row: WorkServiceRow) => opcionBody(row)}
            style={{ width: "20%", textAlign: "center" }}
          />
        </DataTable>
        <div className="work-form__actions">
          <Button color="blue">
            <Icon name="save" />
            Guardar Trabajo
          </Button>
          {onCancel != null && (
            <Button onClick={onCancel} className="work-form__btn-cancel">
              <Icon name="close" />
              Cerrar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
