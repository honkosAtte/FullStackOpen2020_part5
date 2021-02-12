import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";

import { HospitalEntry as Entry } from "../types";

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  return (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        {entry.date} <Icon color="red" name="hospital outline" />
      </Card.Header>
      <Card.Meta>by {entry.specialist}</Card.Meta>
      <Card.Description>{entry.description}</Card.Description>
      {entry.diagnosisCodes?.map(code => <ul key={code}>{Object.values(diagnoses).filter(row => row.code === code).map(row => <li key={row.name}>{row.code} {row.name}</li>)}</ul>)}
    </Card.Content>

    <Card.Content extra>
      <List>
        <List.Item>
          <List.Header>Discharged on {entry.discharge.date}</List.Header>
          {entry.discharge.criteria}
        </List.Item>
      </List>
    </Card.Content>

  </Card>)
}

export default HospitalEntry;


