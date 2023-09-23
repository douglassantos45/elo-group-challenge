import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  getLocalStorage,
  saveLocalStorage,
} from '../../../../../utils/local-storage';

type RowsProps = {
  username: string;
};

export const Rows = ({ username }: RowsProps) => {
  const [boxContent1, setBoxContent1] = useState(username);
  const [boxContent2, setBoxContent2] = useState('');
  const [boxContent3, setBoxContent3] = useState('');

  const saveBoxStateOfMovedContentInLocalStorage = (
    username: string,
    boxContentPosition: number
  ) => {
    const key = `@elo-group:boxContentPosition-${username}`;
    saveLocalStorage(key, {
      username,
      boxContentPosition,
    });
  };

  const isComingBack = (destination: number, origin: number) => {
    return destination <= origin;
  };

  const handleOnDragEndDrop = (result: any) => {
    if (!result?.destination) return;
    const { destination, source } = result;
    if (isComingBack(destination.droppableId, source.droppableId)) return;
    if (destination.droppableId === '1') {
      setBoxContent1(username);
      saveBoxStateOfMovedContentInLocalStorage(username, 1);
    } else if (destination.droppableId === '2') {
      setBoxContent2(username);
      saveBoxStateOfMovedContentInLocalStorage(username, 2);
    } else {
      setBoxContent3(username);
      saveBoxStateOfMovedContentInLocalStorage(username, 3);
    }
    if (source.droppableId === '1') setBoxContent1('');
    else if (source.droppableId === '2') setBoxContent2('');
  };

  useEffect(() => {
    const userLeads = getLocalStorage(
      `@elo-group:boxContentPosition-${username}`
    );
    if (!userLeads?.boxContentPosition) return;
    switch (userLeads.boxContentPosition) {
      case 2:
        setBoxContent1('');
        return setBoxContent2(userLeads.username);
      case 3:
        setBoxContent1('');
        setBoxContent2('');
        return setBoxContent3(userLeads.username);
    }
  }, []);

  return (
    <tr>
      <DragDropContext onDragEnd={handleOnDragEndDrop}>
        <Droppable key={1} droppableId="1">
          {(provided) => (
            <td
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable key={1} draggableId={'1'} index={1}>
                {(provided) => (
                  <p
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {boxContent1}
                  </p>
                )}
              </Draggable>
              {provided.placeholder}
            </td>
          )}
        </Droppable>

        <Droppable key={2} droppableId="2">
          {(provided) => (
            <td
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable key={2} draggableId={'2'} index={1}>
                {(provided) => (
                  <p
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {boxContent2}
                  </p>
                )}
              </Draggable>
              {provided.placeholder}
            </td>
          )}
        </Droppable>

        <Droppable key={3} droppableId="3">
          {(provided) => (
            <td
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable key={3} draggableId={'3'} index={1}>
                {(provided) => (
                  <p
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {boxContent3}
                  </p>
                )}
              </Draggable>
              {provided.placeholder}
            </td>
          )}
        </Droppable>
      </DragDropContext>
    </tr>
  );
};
