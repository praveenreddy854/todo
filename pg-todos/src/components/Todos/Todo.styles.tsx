import { TodoType } from '../../types';

export interface TodoStyleProps {
  matches: boolean;
  isSmallText: boolean;
  todo: TodoType;
  isDark: boolean;
}
export const getTodoStyles: any = (props: TodoStyleProps) => {
  const { matches, isSmallText, todo, isDark } = props;
  const isScheduledTodo = todo.dueAt !== undefined;
  return {
    card: {
      marginTop: matches ? 20 : 35,
      background: 'lightgray',
      visible: true,
      display: todo.hidden ? 'none' : 'block',
    },
    icon: {
      float: 'right',
      paddingTop: '10px',
      border: 'none',
    },
    text: {
      wordBreak: isScheduledTodo ? 'normal' : 'break-word',
      display: isScheduledTodo ? '' : '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      fontWeight: todo.starred ? 600 : 'normal',
      fontSize: matches ? '17px' : isSmallText ? '17px' : '24px',
      color: todo.starred ? (isDark ? '#ffe066' : '#3f51b5') : '',
    },
  };
};
