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

  // Define color palette based on dark mode with enhanced colors
  const colors = {
    // Background colors
    cardBg: isDark ? '#1e293b' : '#ffffff',
    cardBgStarred: isDark ? '#334155' : '#f0f5ff',
    cardBgCompleted: isDark ? '#1a2234' : '#f8fafc',

    // Border colors
    cardBorder: isDark ? '#334155' : '#e2e8f0',
    cardBorderStarred: isDark ? '#475569' : '#bfdbfe',
    cardBorderCompleted: isDark ? '#1e293b' : '#e2e8f0',

    // Text colors
    textColor: isDark ? '#f1f5f9' : '#1e293b',
    textColorStarred: isDark ? '#fef08a' : '#3b82f6',
    textColorCompleted: isDark ? '#94a3b8' : '#64748b',

    // Accent colors
    accentColor: isDark ? '#3b82f6' : '#3b82f6',
    accentColorStarred: isDark ? '#eab308' : '#eab308',
    accentColorCompleted: isDark ? '#10b981' : '#10b981',
  };

  // Define consistent font size based on device and user preference
  const fontSize = matches ? '16px' : isSmallText ? '16px' : '18px';

  // Define consistent text color based on todo state
  const textColor = todo.completed
    ? colors.textColorCompleted
    : todo.starred
    ? colors.textColorStarred
    : colors.textColor;

  return {
    card: {
      marginTop: matches ? 16 : 24,
      background: todo.completed ? colors.cardBgCompleted : todo.starred ? colors.cardBgStarred : colors.cardBg,
      visible: true,
      display: todo.hidden ? 'none' : 'block',
      borderRadius: '12px',
      boxShadow: todo.starred
        ? `0 6px 16px rgba(0, 0, 0, ${isDark ? '0.35' : '0.12'})`
        : `0 3px 10px rgba(0, 0, 0, ${isDark ? '0.25' : '0.06'})`,
      border: `1px solid ${
        todo.completed ? colors.cardBorderCompleted : todo.starred ? colors.cardBorderStarred : colors.cardBorder
      }`,
      transition: 'all 0.25s ease-in-out',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: `0 8px 20px rgba(0, 0, 0, ${isDark ? '0.45' : '0.18'})`,
      },
      '&::before': todo.starred
        ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: `linear-gradient(to bottom, ${colors.accentColorStarred}, ${colors.accentColorStarred}aa)`,
          }
        : todo.completed
        ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: `linear-gradient(to bottom, ${colors.accentColorCompleted}, ${colors.accentColorCompleted}aa)`,
          }
        : {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: `linear-gradient(to bottom, ${colors.accentColor}, ${colors.accentColor}aa)`,
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
          },
      '&:hover::before':
        !todo.starred && !todo.completed
          ? {
              opacity: 0.7,
            }
          : {},
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
      fontSize: fontSize,
      color: textColor,
      letterSpacing: '0.01em',
      lineHeight: '1.6',
      padding: '6px 0',
      transition: 'color 0.2s ease-in-out',
    },
    checkbox: {
      color: todo.starred
        ? colors.accentColorStarred
        : todo.completed
        ? colors.accentColorCompleted
        : colors.accentColor,
      padding: '8px',
      borderRadius: '50%',
      transition: 'all 0.2s ease-in-out',
      '&.Mui-checked': {
        color: todo.starred ? colors.accentColorStarred : colors.accentColorCompleted,
      },
      '&:hover': {
        backgroundColor: `${
          todo.starred ? colors.accentColorStarred : todo.completed ? colors.accentColorCompleted : colors.accentColor
        }22`,
      },
    },
    todoId: {
      fontSize: fontSize,
      color: textColor,
      marginRight: '8px',
      fontWeight: todo.starred ? 500 : 'normal',
      opacity: 0.9,
    },
  };
};
