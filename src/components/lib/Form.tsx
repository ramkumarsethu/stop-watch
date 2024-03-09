import React, { useState } from 'react';
import { FORM_TYPE, FieldConfig } from '../../types/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Col, Form, Row, Toast, ToastContainer } from 'react-bootstrap';
import { addToStore, updateValueInStore } from '../../store/slices/FormSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

type FormConfig = {
  fields: Array<FieldConfig>;
  formType: FORM_TYPE;
  id?: string;
};

const BasicForm: React.FC<FormConfig> = ({ fields, formType, id }: FormConfig) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((e) => e.entities[formType]);
  const [showToastMessage, setShowToastMessage] = useState(false);

  const validationSchema = yup.object().shape(
    fields.reduce<Record<string, yup.Schema>>((acc, cur) => {
      if (cur.validationRule) {
        acc[cur.name] = cur.validationRule;
      }
      return acc;
    }, {})
  );

  type T = yup.InferType<typeof validationSchema>;

  return (
    <>
      <Formik<T>
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          //following code (basically this handler) is executed only on successful vaidation of the input fields
          if (id) {
            dispatch(updateValueInStore({ ...values, _type: formType, id }));
          } else {
            dispatch(addToStore({ ...values, _type: formType, id: '' })); //id is set empty to satisfy the ts compiler. but is set in the reducer before storing in store
          }
          setShowToastMessage(true);
          !id && resetForm(); //reset the form only for new data
        }}
        initialValues={id ? data.find((e) => e.id === id) || {} : {}}
        initialTouched={fields.reduce<{ [P in keyof T]: boolean }>((acc, cur) => {
          acc[cur.name] = true;
          return acc;
        }, {})}
        validateOnMount>
        {/* going with the render props implementation of Formik to pass handler functions and other props to the Form component */}
        {({ handleSubmit, handleChange, values, errors }) => {
          const errorValues = Object.values(errors);
          return (
            <Form noValidate onSubmit={handleSubmit}>
              {fields.map((fieldConfig) => {
                const { name, displayName, type, placeholderText } = fieldConfig;
                const key = name as keyof T;
                return (
                  <Row key={name}>
                    {/* using the full grid for the update form as it will be shown in modal */}
                    <Col md={id ? 12 : 8} sm={12} className="pb-2">
                      <Form.Group>
                        <Form.Label className="mb-0">{displayName}</Form.Label>
                        {type === 'TextField' && (
                          <Form.Control
                            size="sm"
                            type="text"
                            isInvalid={!!errors[key]}
                            name={name}
                            value={values[key] || ''}
                            onChange={handleChange}
                            placeholder={placeholderText}
                            autoComplete="off"
                            spellCheck="false"
                          />
                        )}
                        {type === 'TextArea' && (
                          <Form.Control
                            size="sm"
                            isInvalid={!!errors[key]}
                            name={name}
                            value={values[key] || ''}
                            onChange={handleChange}
                            placeholder={placeholderText}
                            autoComplete="off"
                            spellCheck="false"
                            as="textarea"
                            rows={4}
                          />
                        )}
                        <Form.Control.Feedback type="invalid">
                          {errors[key] as []}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                );
              })}
              <Row>
                {/* using the full grid for the update form as it will be shown in modal */}
                <Col md={id ? 12 : 8} className="d-grid d-md-flex justify-content-md-center pt-2">
                  <Button
                    disabled={errorValues.length > 0}
                    variant="primary"
                    size="sm"
                    className="col-md-4"
                    type="submit">
                    {id ? 'Update' : 'Create'}
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>

      {
        <ToastContainer
          position="top-start"
          className="text-white"
          style={{ zIndex: 1, width: '100%', padding: 4 }}>
          <Toast
            style={{ width: 'inherit' }}
            animation={true}
            show={showToastMessage}
            onClose={() => setShowToastMessage(false)}
            bg="success"
            delay={2000}
            autohide>
            <Toast.Body className="d-flex justify-content-between">
              <div>{id ? 'Data updated successfully' : 'Data created successfully'}</div>
              <div>
                <button type="button" className="btn-close btn-close-white"></button>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      }
    </>
  );
};

export default BasicForm;