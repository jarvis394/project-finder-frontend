import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Paper elevation={0} sx={{ padding: (theme) => theme.spacing(2) }}>
      <Typography variant="h4">Hello World!</Typography>
      <Typography
        variant="body1"
        sx={{ marginTop: (theme) => theme.spacing(1) }}
      >
        Project Finder – like Tinder, but for business
      </Typography>
      <Button variant="contained" fullWidth>asd</Button>
    </Paper>
  )
}

export default Home
