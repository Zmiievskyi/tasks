import React from 'react';
import TaskItem from './TaskItem';
import { Grid } from '@mui/material';

export default function TaskList({tasks}: {tasks: any[]}) {
    return (
        <Grid container spacing={5} alignItems="flex-end">
          {tasks.length > 0 &&
            tasks.map((t: any) => (
              <Grid item key={t.id} xs={12} sm={6} md={4}>
                <TaskItem task={t}/>
              </Grid>
            ))}
        </Grid>
    );
}