import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

type FileWithPreview = File & {
  preview: string;
};

const SortableImage = ({
  file,
  index,
  onRemove,
}: {
  file: FileWithPreview;
  index: number;
  onRemove: (index: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group col-span-1 overflow-hidden"
    >
      <Image
        src={file.preview}
        alt={file.name}
        width={300}
        height={300}
        loading="lazy"
        className="w-full h-48 sm:h-auto object-cover rounded-lg"
      />
      <div className="absolute top-2 right-2">
        <Button
          size="icon"
          type="button"
          variant="destructive"
          className="bg-gray-500/70 hover:bg-gray-500 w-5 h-5 rounded-full"
          onClick={() => onRemove(index)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      {index === 0 && (
        <div className="absolute top-1 left-2">
          <Badge variant="secondary">Foto de Capa</Badge>
        </div>
      )}
    </div>
  );
};

const ImageUploader: React.FC<{ onChange: (files: File[]) => void }> = ({
  onChange,
}) => {
  const [images, setImages] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages: FileWithPreview[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onChange(updatedImages); // Chamar a função de callback com as novas imagens
    },
    [images, onChange]
  );

  const removeImage = (index: number) => {
    // const newImages = images.filter((_, i) => i !== index);
    // setImages(newImages);
    // onChange(newImages); // Atualizar o estado no formulário

    console.log("Removendo imagem:", index);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((prevImages) => arrayMove(prevImages, active.id, over.id));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <Card className="w-full max-w-6xl p-4">
      <CardContent>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center 
            ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            cursor-pointer transition-colors
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600">
              Clique ou arraste as imagens para adicionar
            </p>
          </div>
        </div>

        {images.length > 0 && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((_, index) => index)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((file, index) => (
                  <SortableImage
                    key={file.name}
                    file={file}
                    index={index}
                    onRemove={removeImage}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
