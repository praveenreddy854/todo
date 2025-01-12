import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const useAddTodoStyles = makeStyles((theme: Theme) =>
  createStyles({
    addTodoControls: {
      paddingBottom: theme.spacing(2),
    },
  })
);
