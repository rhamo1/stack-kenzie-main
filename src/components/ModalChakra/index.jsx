import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function ModalChakra({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onOpen,
  size,
}) {
  return (
    <>
      {buttonText && (
        <Button variant="ButtonFilledBlue" onClick={onOpen}>
          {buttonText}
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalChakra;
