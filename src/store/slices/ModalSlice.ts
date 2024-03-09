import { createSlice } from '@reduxjs/toolkit';

type ModalProps = {
  headerMessage?: string;
  bodyMessage?: string;
  showModal: boolean;
  modalSource: string | false; //used when displaying the confirmation modal scenario so that the component which opened the modal is informed to run some handlers once the modal is submitted
  modalSubmitted?: boolean;
  errors?: Array<string>;
};

type ModalSliceProps = {
  modal: ModalProps;
};

const initialState: ModalSliceProps = {
  modal: { showModal: false, modalSource: false, modalSubmitted: false }
};

/**
 * slice that creates actions and reducers for the modal feature
 */
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    //for displaying error messages on task validation
    setAttentionMessage: (state, action: { payload: ModalProps['errors'] }) => {
      state.modal = {
        headerMessage: 'Attention please!',
        errors: action.payload,
        showModal: true,
        modalSource: false,
        modalSubmitted: false
      };
    },
    //for displaying confirmation message on task deletion
    setConfirmationMessage: (
      state,
      action: { payload: Required<Pick<ModalProps, 'modalSource' | 'bodyMessage'>> }
    ) => {
      const { bodyMessage, modalSource } = action.payload;
      state.modal = {
        headerMessage: 'Confirmation',
        bodyMessage,
        modalSource,
        showModal: true,
        modalSubmitted: false
      };
    },
    //for Closing the modal on OK(task validation) Cancel(task deletion) operations
    hideModal: (state) => {
      state.modal = initialState.modal;
    },
    //for submitting the modal
    submitModal: (state) => {
      state.modal = {
        showModal: false,
        modalSource: state.modal.modalSource,
        modalSubmitted: true
      };
    }
  }
});

export const { setAttentionMessage, setConfirmationMessage, hideModal, submitModal } =
  modalSlice.actions;

export default modalSlice.reducer;
