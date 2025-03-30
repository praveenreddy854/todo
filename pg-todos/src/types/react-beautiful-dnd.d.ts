import { ComponentType } from 'react';
import { DraggableProps, DroppableProps } from 'react-beautiful-dnd';

declare module 'react-beautiful-dnd' {
  export const Droppable: ComponentType<DroppableProps>;
  export const Draggable: ComponentType<DraggableProps>;
}
