import React from "react";
import { Card, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";

import { OccupationalHealthcareEntry as Entry } from "../types";

const OccupationalHealthCareEntry: React.FC<{entry: Entry}> = ({ entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  return (
    <Card fluid>
    <Card.Content>
      <Card.Header>
      {entry.date} <Icon color="green" name="factory"/>
      </Card.Header>
      <Card.Meta>by {entry.specialist}</Card.Meta>
      <Card.Description>{entry.description}</Card.Description>
      {entry.diagnosisCodes?.map(code => <ul key={code}>{Object.values(diagnoses).filter(row => row.code === code).map(row => <li key={row.name}>{row.code} {row.name}</li>)}</ul>)}
    </Card.Content>
    <List>
          <List.Item>
            <strong>Employer:</strong> {entry.employerName}
          </List.Item>
          {entry.sickLeave && (
            <List.Item>
              <strong>Sick Leave:</strong> From {entry.sickLeave.startDate} {' to '}
              {entry.sickLeave.endDate}
            </List.Item>
          )}
        </List>
  </Card>
  )
}

export default OccupationalHealthCareEntry