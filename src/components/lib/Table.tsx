import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { FORM_TYPE, FormEntity } from '../../types/Form';
import BasicModal from './modals/Modal';
import BasicForm from './Form';
import { XCircleFill } from 'react-bootstrap-icons';
import { deleteFromStore } from 'src/store/slices/FormSlice';
import { formFieldsConfig } from 'src/config/config';

type TableConfig = {
  formType: FORM_TYPE;
};

/**
 *
 * Component that displays Table
 *
 */
const BasicTable: React.FC<TableConfig> = ({ formType }: TableConfig) => {
  const fieldConfig = formFieldsConfig[formType];
  const dispatch = useAppDispatch();
  const entitiesData = useAppSelector((state) => state.entities);
  const data = entitiesData[formType];
  const tableFields = fieldConfig.filter((e) => !!e.tableStyle);
  const searchableField = fieldConfig.find((e) => !!e.searchable);
  const [filteredData, setFilteredData] = useState<FormEntity[]>([]);
  const [search, setSearch] = useState('');
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [updateId, setUpdateId] = useState<FormEntity['id']>();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState<FormEntity['id']>();

  useEffect(() => {
    if (search && searchableField) {
      setFilteredData(
        data.filter((e) => e[searchableField.name].toLowerCase().includes(search.toLowerCase()))
      );
    } else {
      setFilteredData(data);
    }
  }, [search, data, searchableField]);

  return (
    <>
      <h6 className="pt-5"></h6>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Search by {searchableField?.displayName}:</Form.Label>
          <Col md={8}>
            <Form.Control onChange={(e) => setSearch(e.target.value)} type="text" />
          </Col>
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            {tableFields.map((column) => {
              return (
                <th
                  key={column.name}
                  className="text-truncate"
                  style={{ ...column.tableStyle, minWidth: 0 }}>
                  {column.displayName}
                </th>
              );
            })}
            <th key="delete-column">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((e) => {
            const { id } = e;
            return (
              <tr key={`table-row-${id}`}>
                {tableFields.map((field) => (
                  <td key={`table-row-${id}-table-cell-${field.name}`} className="text-truncate">
                    {searchableField?.name === field.name ? (
                      <a
                        onClick={() => {
                          setUpdateId(id);
                          setOpenUpdateForm(true);
                        }}>
                        {e[field.name]}
                      </a>
                    ) : field.referenceEntity ? (
                      entitiesData[field.referenceEntity.referenceType].find(
                        (entity) => entity.id === e[field.name]
                      )?.[field.referenceEntity.referenceDisplayLabel] || ''
                    ) : (
                      e[field.name]
                    )}
                  </td>
                ))}
                <td key={`delete-${id}`}>
                  <XCircleFill
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setOpenConfirmationModal(true);
                      setDeleteId(id);
                    }}
                    size={16}
                    color="red"></XCircleFill>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br></br>
      {/* modal to show update form */}
      {
        <BasicModal
          showModal={openUpdateForm}
          title={`Update Record`}
          handleClose={() => setOpenUpdateForm(false)}>
          <BasicForm
            formType={formType}
            id={updateId || ''}
            postSubmitHandler={() => setOpenUpdateForm(false)}></BasicForm>
        </BasicModal>
      }
      {/* modal to show confirmation when deleting entities */}
      {
        <BasicModal
          showModal={openConfirmationModal}
          title="Confirmation needed!"
          handleClose={() => setOpenConfirmationModal(false)}>
          <h5>Are you sure you want to delete?</h5>
          <div className="d-flex justify-content-end pt-3" style={{ gap: 5 }}>
            <Button onClick={() => setOpenConfirmationModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteFromStore({ _type: formType, id: deleteId || '' }));
                setOpenConfirmationModal(false);
              }}
              variant="primary">
              Delete
            </Button>
          </div>
        </BasicModal>
      }
    </>
  );
};

export default BasicTable;
