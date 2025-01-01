import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryStore } from "@/app/stores/category-store";
import { DeleteCategory } from "@/api/endpoints/category";

type Category = {
  id: number;
  name: string;
};

export function DialogDelete({
  showDelete,
  setShowDelete,
  selectedCategory,
}: {
  showDelete: boolean;
  setShowDelete: (show: boolean) => void;
  selectedCategory: Category | null;
}) {
  const { setUpCategory } = useCategoryStore();

  const handleDelete = () => {
    if (selectedCategory) {
      DeleteCategory(selectedCategory.id.toString());
      setUpCategory(true);
      setShowDelete(false);
    }
  };

  if (!showDelete || !selectedCategory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="sm:max-w-1/2">
          <DialogHeader>
            <DialogTitle>Excluir Categoria</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir a categoria{" "}
              <strong>
                <u>{selectedCategory.name}</u>
              </strong>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-between gap-4">
              <Button variant="destructive" onClick={handleDelete}>
                Sim, excluir
              </Button>
              <Button variant="secondary" onClick={() => setShowDelete(false)}>
                Não, cancelar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
