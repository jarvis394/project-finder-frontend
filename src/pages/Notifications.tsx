import { LocalizationProvider, DatePicker } from '@mui/lab'
import { TextField } from '@mui/material'
import AdapterDayjs from '@mui/lab/AdapterDayjs'
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'

function BasicDatePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs())
  const maskMap = {
    fr: '__/__/____',
    en: '__/__/____',
    ru: '__.__.____',
    de: '__.__.____',
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        mask={maskMap['ru']}
        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

const Notifications = () => {
  return (
    <div>
      <BasicDatePicker />
    </div>
  )
}

export default React.memo(Notifications)
