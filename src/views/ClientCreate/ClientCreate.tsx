import React, { useState } from "react";
import { Grid, Input, Button, Icon } from "semantic-ui-react";
import { Divider } from "primereact/divider";
import DatePicker from "../../components/Common/DatePicker";
import { ClientFormData } from "./interfaces";
import "./ClientCreate.scss";

const initialFormState: ClientFormData = {
  matricula: "",
  propietario: "",
  modeloAuto: "",
  anioAuto: "",
  dni: "",
  cuilCuit: "",
  fechaNacimiento: null,
  telefono: "",
  celular: "",
  email: "",
  direccion: "",
  localidad: "",
  codigoPostal: "",
  provincia: "",
  pais: "",
};

export default function ClientCreate(): React.ReactElement {
  const [formData, setFormData] = useState<ClientFormData>(initialFormState);

  const updateField = (field: keyof ClientFormData, value: string | Date | null): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (): void => {
    console.log("Guardar cliente:", formData);
  };

  return (
    <div className="client-create">
      <Grid>
        <Grid.Row>
          <Grid.Column computer={16}>
            <div className="client-create__title">
              <h4>Alta de Cliente</h4>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Divider />
            <div className="client-create__form">
              <div className="client-create__form-fields">
                <div className="client-create__form-row">
                  <Input
                    placeholder="Matrícula"
                    value={formData.matricula}
                    onChange={(_, data) => updateField("matricula", data.value)}
                    className="client-create__field"
                  />
                  <Input
                    placeholder="Propietario"
                    value={formData.propietario}
                    onChange={(_, data) => updateField("propietario", data.value)}
                    className="client-create__field"
                  />
                </div>
                <div className="client-create__form-row">
                  <Input
                    placeholder="Modelo auto"
                    value={formData.modeloAuto}
                    onChange={(_, data) => updateField("modeloAuto", data.value)}
                    className="client-create__field"
                  />
                  <Input
                    placeholder="Año auto"
                    value={formData.anioAuto}
                    onChange={(_, data) => updateField("anioAuto", data.value)}
                    className="client-create__field"
                  />
                </div>
                <div className="client-create__form-row">
                  <Input
                    placeholder="DNI"
                    value={formData.dni}
                    onChange={(_, data) => updateField("dni", data.value)}
                    className="client-create__field"
                  />
                  <Input
                    placeholder="CUIL/CUIT"
                    value={formData.cuilCuit}
                    onChange={(_, data) => updateField("cuilCuit", data.value)}
                    className="client-create__field"
                  />
                </div>
                <div className="client-create__form-row">
                  <div className="client-create__field client-create__field-date">
                    <DatePicker
                      label="Fecha de nacimiento"
                      value={formData.fechaNacimiento}
                      onChange={(val) => updateField("fechaNacimiento", val)}
                    />
                  </div>
                  <Input
                    placeholder="Tel."
                    value={formData.telefono}
                    onChange={(_, data) => updateField("telefono", data.value)}
                    className="client-create__field"
                  />
                </div>
                <div className="client-create__form-row">
                  <Input
                    placeholder="Celular"
                    value={formData.celular}
                    onChange={(_, data) => updateField("celular", data.value)}
                    className="client-create__field"
                  />
                  <Input
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={(_, data) => updateField("direccion", data.value)}
                    className="client-create__field"
                  />
                </div>
                <div className="client-create__form-row">
                  <Input
                    placeholder="Localidad"
                    value={formData.localidad}
                    onChange={(_, data) => updateField("localidad", data.value)}
                    className="client-create__field"
                  />
                  <Input
                    placeholder="Código postal"
                    value={formData.codigoPostal}
                    onChange={(_, data) => updateField("codigoPostal", data.value)}
                    className="client-create__field"
                  />
                </div>
                <div className="client-create__form-row">
                  <Input
                    placeholder="Provincia"
                    value={formData.provincia}
                    onChange={(_, data) => updateField("provincia", data.value)}
                    className="client-create__field"
                  />
                  <Input
                    placeholder="País"
                    value={formData.pais}
                    onChange={(_, data) => updateField("pais", data.value)}
                    className="client-create__field"
                  />
                </div>
                <div className="client-create__form-row client-create__form-row--full">
                  <Input
                    placeholder="Email"
                    value={formData.email}
                    onChange={(_, data) => updateField("email", data.value)}
                    className="client-create__field"
                  />
                </div>
              </div>
              <div className="client-create__form-actions">
                <Button color="blue" onClick={handleSave}>
                  <Icon name="save" />
                  Guardar
                </Button>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
