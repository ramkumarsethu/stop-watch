import React, { useEffect, useState } from 'react';
import { Col, Form, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { FORM_TYPE, FieldConfig, FormEntity } from '../../types/Form';
import BasicModal from './modals/Modal';
import BasicForm from './Form';
import { XCircleFill } from 'react-bootstrap-icons';
import { deleteFromStore } from 'src/store/slices/FormSlice';

type TableConfig = {
  fieldConfig: Array<FieldConfig>;
  formType: FORM_TYPE;
};

/**
 *
 * Component that displays Table
 *
 */
const BasicTable: React.FC<TableConfig> = ({ fieldConfig, formType }: TableConfig) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.entities[formType]);
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
          title={`Update ${searchableField?.displayName}`}
          handleClose={() => setOpenUpdateForm(false)}>
          <BasicForm fields={fieldConfig} formType={formType} id={updateId || ''}></BasicForm>
        </BasicModal>
      }
      {/* modal to show confirmation when deleting entities */}
      {
        <BasicModal
          showModal={openConfirmationModal}
          title="Confirmation needed!"
          handleClose={() => setOpenConfirmationModal(false)}>
          <div className="d-flex">
            <button onClick={() => setOpenConfirmationModal(false)} className="secondary">
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(deleteFromStore({ _type: formType, id: deleteId || '' }));
                setOpenConfirmationModal(false);
              }}
              className="primary">
              Delete
            </button>
          </div>
        </BasicModal>
      }
    </>
  );
};

export default BasicTable;
