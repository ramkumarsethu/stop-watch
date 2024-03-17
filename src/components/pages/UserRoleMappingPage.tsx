import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Draggable, { DraggableEvent } from 'react-draggable';
import { roleFormFieldsConfig } from 'src/config/fields/roles';
import { userFormFieldsConfig } from 'src/config/fields/users';
import { updateValueInStore } from 'src/store/slices/FormSlice';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { FORM_TYPE, FormEntity } from 'src/types/Form';

enum SECTION_TYPE {
  USER_SECTION = 'user-drag-section',
  ROLE_SECTION = 'role-drag-section'
}

const UserRoleMappingPage = () => {
  const data = useAppSelector((state) => state.entities);
  const dispatch = useAppDispatch();
  const roles = data.ROLES;
  const roleNameField = roleFormFieldsConfig.find((e) => !!e.referenceable)?.name ?? '';
  const userNameField = userFormFieldsConfig.find((e) => !!e.referenceable)?.name ?? '';
  const userRoleName =
    userFormFieldsConfig.find((e) => e.referenceEntity?.referenceType === FORM_TYPE.ROLES)?.name ??
    '';
  const [selectedRole, setSelectedRole] = useState<string>();
  const [usersMoved, setUsersMoved] = useState<Array<FormEntity>>([]);
  const [users, setSelectedUsers] = useState<Array<FormEntity>>(data.USERS);

  const checkAndMoveDraggedElement = useCallback(
    (
      e: DraggableEvent,
      targetSection: SECTION_TYPE
    ): [elementId: string, isDraggedIntoTargetPosition: boolean] => {
      if (e.target instanceof HTMLElement) {
        const draggedElement = e.target as HTMLElement;
        const droppedBoundary = draggedElement.getBoundingClientRect();
        const elementId = draggedElement.id;
        const elementsAtPoint = document.elementsFromPoint(droppedBoundary.x, droppedBoundary.y);
        const isDraggedIntoTargetSection = elementsAtPoint.find((e) => e.id === targetSection);
        return [elementId, !!isDraggedIntoTargetSection];
      }
      return ['', false];
    },
    []
  );

  const updateRole = () => {
    usersMoved.forEach((e) => {
      dispatch(updateValueInStore(e));
    });
  };

  useEffect(() => {
    setUsersMoved([]);
    setSelectedUsers(data.USERS);
  }, [selectedRole, data.USERS]);

  return (
    <div>
      Please select the role you wish the users be assigned to:
      <Form.Select onChange={(e) => setSelectedRole(e.target.value)}>
        <option></option>
        {roles.map((role) => (
          <option value={role.id} key={role.id}>
            {role[roleNameField]}
          </option>
        ))}
      </Form.Select>
      {selectedRole && (
        <>
          <div className="d-flex column-gap-5 justify-content-around">
            <UserListBox
              sectionType={SECTION_TYPE.USER_SECTION}
              label="Users"
              userNameField={userNameField}
              roleNameField={roleNameField}
              userRoleName={userRoleName}
              cardColor="blue"
              users={users.filter((e) => userRoleName && e[userRoleName] !== selectedRole)} //excluding users who has been already assigned the role selected for mapping
              draggableHandler={(e) => {
                const [elementId, isDraggedIntoTargetPosition] = checkAndMoveDraggedElement(
                  e,
                  SECTION_TYPE.ROLE_SECTION
                );
                if (isDraggedIntoTargetPosition) {
                  const draggedUser = users.find((e) => e.id === elementId);
                  if (draggedUser) {
                    setSelectedUsers([...users.filter((e) => e.id !== elementId)]);
                    setUsersMoved([
                      ...usersMoved,
                      { ...draggedUser, [userRoleName]: selectedRole }
                    ]);
                  }
                } else {
                  setSelectedUsers([]);
                  setTimeout(() => setSelectedUsers([...users]), 50);
                }
              }}
            />
            <UserListBox
              sectionType={SECTION_TYPE.ROLE_SECTION}
              label={`Role Selected: ${roles.find((e) => e.id === selectedRole)?.[roleNameField]}`}
              userNameField={userNameField}
              roleNameField={roleNameField}
              userRoleName={userRoleName}
              cardColor="green"
              users={usersMoved}
              draggableHandler={(e) => {
                const [elementId, isDraggedIntoTargetPosition] = checkAndMoveDraggedElement(
                  e,
                  SECTION_TYPE.USER_SECTION
                );
                if (isDraggedIntoTargetPosition) {
                  const draggedUser = data.USERS.find((e) => e.id === elementId);
                  if (draggedUser) {
                    setUsersMoved([...usersMoved.filter((e) => e.id !== elementId)]);
                    setSelectedUsers([...users, draggedUser]);
                  }
                } else {
                  setUsersMoved([]);
                  setTimeout(() => setUsersMoved([...usersMoved]), 50);
                }
              }}
            />
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Button
              disabled={usersMoved.length === 0}
              onClick={updateRole}
              className="btn btn-primary">
              Confirm
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const UserListBox = ({
  label,
  users,
  userNameField,
  userRoleName,
  roleNameField,
  draggableHandler,
  sectionType,
  cardColor
}: {
  label: string;
  draggableHandler: (e: DraggableEvent) => void;
  users: Array<FormEntity>;
  userNameField: string;
  userRoleName: string;
  roleNameField: string;
  sectionType: SECTION_TYPE;
  cardColor: 'blue' | 'green';
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const roles = useAppSelector((state) => state.entities.ROLES);

  return (
    <div className="mt-5" id={sectionType}>
      {label}
      <div
        ref={containerRef}
        style={{ height: 300, overflowY: 'scroll', overflowX: 'hidden', border: '1px solid' }}>
        <div className="p-1" style={{ minHeight: 270, width: 200 }}>
          {users.map((user) => (
            <Draggable
              key={user.id}
              onStop={draggableHandler}
              onDrag={() => {
                if (containerRef.current) {
                  containerRef.current.style.overflow = 'visible'; //workaround to make drag working as expected when scrollbars appear. otherwise, dragging happens only within the container
                }
              }}>
              <div
                className="mt-2 p-1 text-truncate overflow-hidden"
                style={{ border: `1px solid ${cardColor}`, borderRadius: 10 }}
                id={user.id}>
                {user[userNameField]} |{' '}
                {roles.find((e) => e.id === user[userRoleName])?.[roleNameField]}
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRoleMappingPage;
