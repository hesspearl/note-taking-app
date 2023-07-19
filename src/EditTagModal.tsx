import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { NoteListProps } from "./NoteList";

interface EditTagModalProps extends Omit<NoteListProps, "notes"> {
  show: boolean;
  handleClose: () => void;
}

function EditTagModal({
  availableTags,
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => onDeleteTag(tag.id)}
                  >
                    &Chi;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTagModal;
