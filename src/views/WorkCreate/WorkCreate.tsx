import React from "react";
import { Grid } from "semantic-ui-react";
import { Divider } from "primereact/divider";
import WorkForm from "../../components/WorkForm";
import "./WorkCreate.scss";

export default function WorkCreate(): React.ReactElement {
  return (
    <div className="work-create">
      <Grid>
        <Grid.Row>
          <Grid.Column computer={16}>
            <div className="work-create__title">
              <h4>Nuevo Trabajo</h4>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Divider />
            <div className="work-create__content">
              <WorkForm />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
