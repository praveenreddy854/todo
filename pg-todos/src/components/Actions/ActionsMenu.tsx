import { TodoType } from '../../types';
import { Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import {
  DeleteTwoTone as DeleteIcon,
  EditTwoTone as EditIcon,
  StarTwoTone as StarIconOutlined,
  Star as StarIcon,
  SvgIconComponent,
  VisibilityOff as VisibilityOffIcon,
  Done,
  DoneOutline,
} from '@material-ui/icons';
import useChangeMenuIcon from '../../hooks/useChangeMenuIcon';
import React, { useState } from 'react';

const ITEM_HEIGHT = 48;

interface Option {
  name: string;
  customColor?: string | undefined;
  iconColor?: 'error' | 'action' | 'inherit' | 'disabled' | 'primary' | 'secondary' | undefined;
  textColor?: 'inherit' | 'initial' | 'error' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | undefined;
  icon: SvgIconComponent;
  method: (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

interface Props {
  deleteTodo: (e: any) => void;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  markStar: (id: number) => void;
  hideTodo: (id: number) => void;
  markComplete: (id: number) => void;
  todo: TodoType;
}

enum OptionName {
  STAR = 'Star',
  UNSTAR = 'Unstar',
  EDIT = 'Edit',
  DELETE = 'Delete',
  HIDE = 'Hide',
  COMPLETE = 'Complete',
  UNDOCOMPLETE = 'Undo Complete',
}

export default function ActionsMenu({ deleteTodo, setEditOpen, markStar, hideTodo, markComplete, todo }: Props) {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const open = Boolean(anchorEl);
  const MenuIcon = useChangeMenuIcon();

  const options: Option[] = [
    {
      name: todo.starred ? OptionName.UNSTAR : OptionName.STAR,
      customColor: todo.starred ? '#CCA43A' : '#000',
      icon: todo.starred ? StarIcon : StarIconOutlined,
      method: () => {
        markStar(todo.id);
        setAnchorEl(null);
      },
    },
    {
      name: todo.completed ? OptionName.COMPLETE : OptionName.UNDOCOMPLETE,
      iconColor: 'primary',
      textColor: 'primary',
      icon: todo.completed ? DoneOutline : Done,
      method: () => {
        markComplete(todo.id);
      },
    },
    {
      name: OptionName.HIDE,
      iconColor: 'primary',
      textColor: 'primary',
      icon: VisibilityOffIcon,
      method: () => {
        hideTodo(todo.id);
        setAnchorEl(null);
      },
    },
    {
      name: OptionName.EDIT,
      iconColor: 'primary',
      textColor: 'primary',
      icon: EditIcon,
      method: () => {
        setEditOpen(true);
        setAnchorEl(null);
      },
    },
    {
      name: OptionName.DELETE,
      iconColor: 'error',
      textColor: 'error',
      icon: DeleteIcon,
      method: (e) => {
        deleteTodo(e);
        setAnchorEl(null);
      },
    },
  ];
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleEvent = (option: OptionName, e: any) => {
    if (option === 'Star') markStar(todo.id);
    else if (option === 'Edit') setEditOpen(true);
    else if (option === 'Delete') deleteTodo(e);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        centerRipple={false}
        style={{
          padding: '8px',
          borderRadius: '8px',
          transition: 'all 0.2s ease',
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        }}
      >
        <MenuIcon style={{ fontSize: '20px', color: todo.starred ? '#eab308' : '#3b82f6' }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleEvent}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            borderRadius: '12px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
            overflow: 'hidden',
          },
        }}
        MenuListProps={{
          style: {
            padding: '8px',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={option.method}
            style={{
              borderRadius: '8px',
              margin: '2px 0',
              padding: '8px 12px',
              transition: 'all 0.2s ease',
            }}
          >
            <option.icon
              color={option.iconColor}
              htmlColor={option.customColor}
              style={{
                marginRight: '12px',
                fontSize: '20px',
              }}
            />
            <Typography
              color={option.textColor}
              style={{
                color: option.customColor,
                fontWeight: 500,
                fontSize: '15px',
              }}
            >
              {option.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
