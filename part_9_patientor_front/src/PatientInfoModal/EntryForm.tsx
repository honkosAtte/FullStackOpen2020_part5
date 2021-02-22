import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating, NewEntry } from "../types";
import { DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id" >;

interface Props {
  onSubmit: (values: NewEntry) => void;
}

export const EntryForm: React.FC<Props> = ({ onSubmit }) => {
    const [{ diagnoses }] = useStateValue();
    return (
    <Formik
      initialValues={{
          type: "HealthCheck",
          healthCheckRating: HealthCheckRating.Healthy,
          description: '',
          date: '',
          specialist: '',
          diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = "Format: YYYY-MM-DD";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
         <DiagnosisSelection
           setFieldValue={setFieldValue}            
           setFieldTouched={setFieldTouched}            
           diagnoses={Object.values(diagnoses)}
         />
        <Field
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
        />
                    <Grid>
              {/* <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column> */}
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryForm;
