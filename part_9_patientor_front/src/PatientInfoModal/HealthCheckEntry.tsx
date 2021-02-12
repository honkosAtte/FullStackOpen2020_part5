import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

import { HealthCheckEntry as Entry } from "../types";

const HealthCheckEntry: React.FC<{entry: Entry}> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  return (
  <Card fluid>
    <Card.Content>
      <Card.Header>
      {entry.date} <Icon color="blue" name="stethoscope"/>
      </Card.Header>
      <Card.Meta>by {entry.specialist}</Card.Meta>
      <Card.Description>{entry.description}</Card.Description>
      {entry.diagnosisCodes?.map(code => <ul key={code}>{Object.values(diagnoses).filter(row => row.code === code).map(row => <li key={row.name}>{row.code} {row.name}</li>)}</ul>)}
    </Card.Content>
  </Card>
    )
}

export default HealthCheckEntry;