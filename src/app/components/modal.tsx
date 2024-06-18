import React, { useState } from 'react';
import { Modal, Box, Input, Button } from '@mui/material';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setShouldReload: (val: boolean) => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ isOpen, onClose, setShouldReload }: ModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowError(false);
  };

  const addTodo = async () => {
    try {
      const todo = {
        id: Math.floor(Math.random() * 1000).toString(),
        name: inputValue,
      };

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      setShouldReload(true);
      onClose();
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {showError && (
          <p style={{ color: 'red' }}>
            Something went wrong please try again later
          </p>
        )}
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="enter your todo in here"
          sx={{ width: '100%' }}
        />
        <br />
        <br />
        <Button
          sx={{
            backgroundColor: 'black',
            color: 'white',
            ':hover': { background: 'black' },
          }}
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
