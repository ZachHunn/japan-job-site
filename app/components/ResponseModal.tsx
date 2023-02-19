import { Box, Button, Modal, Typography } from "@mui/material";
import type { FC } from "react";
import React from "react";

type RepsonseModalProps = {
  modalTitle: string;
  response: string;
  isOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResponseModal: FC<RepsonseModalProps> = ({
  modalTitle,
  response,
  isOpen,
  setModalIsOpen,
}) => {
  const refreshPage = () => {
    const deleteResponse = "There are 0 stale jobs to delete from the database";
    const postResponse = "No New Jobs Found!";
    if (response === postResponse || response === deleteResponse) {
      return false;
    }
    window.location.reload();
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => setModalIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="w-5/12 md:h-[300px] absolute bg-white top-1/2 left-1/2 right-auto bottom-auto -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg shadow-lg">
          <div className="flex flex-col items-center p-6">
            <Typography variant="h5" component="h1">
              {modalTitle}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
              {response}
            </Typography>
          </div>
          <div className="mt-20 w-full">
            <Button
              color="secondary"
              variant="outlined"
              className="float-right w-1/4"
              onClick={() => {
                setModalIsOpen(false);
                refreshPage();
              }}
            >
              <Typography>Close</Typography>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
