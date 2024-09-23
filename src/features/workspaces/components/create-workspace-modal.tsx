import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";

const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();

  const handleClose = () => {
    setOpen(false);

    // TODO: Clear Form
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
