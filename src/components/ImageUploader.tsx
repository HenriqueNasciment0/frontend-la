import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
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
  id: string;
};

const SortableImage = ({
  file,
  index,
  onRemove,
}: {
  file: FileWithPreview;
  index: number;
  onRemove: (file: FileWithPreview) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group col-span-1 overflow-hidden"
    >
      <div {...attributes} {...listeners} className="cursor-move">
        <Image
          src={file.preview}
          alt={file.name}
          width={300}
          height={300}
          loading="lazy"
          className="w-full h-48 sm:h-auto object-cover rounded-lg"
        />
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          type="button"
          variant="destructive"
          className="bg-red-500/40 hover:bg-red-500 w-4 h-4 rounded-full"
          onClick={() => onRemove(file)}
        >
          <X className="w-3 h-3" />
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
  const [activeId, setActiveId] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages: FileWithPreview[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: `${file.name}-${Date.now()}`,
        })
      );

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onChange(updatedImages);
    },
    [images, onChange]
  );

  const removeImage = (fileToRemove: FileWithPreview) => {
    const newImages = images.filter((file) => file.id !== fileToRemove.id);
    setImages(newImages);
    onChange(newImages);

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(fileToRemove.preview);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex((img) => img.id === active.id);
        const newIndex = prevImages.findIndex((img) => img.id === over.id);
        return arrayMove(prevImages, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

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
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((img) => img.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((file, index) => (
                  <SortableImage
                    key={file.id}
                    file={file}
                    index={index}
                    onRemove={removeImage}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <SortableImage
                  file={images.find((img) => img.id === activeId)!}
                  index={images.findIndex((img) => img.id === activeId)}
                  onRemove={removeImage}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
