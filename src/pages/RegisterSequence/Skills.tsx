import {
  alpha,
  Button,
  styled,
  Box,
  Typography,
  Autocomplete,
  TextField,
} from '@mui/material'
import React, { useEffect } from 'react'
import { BUTTON_MAX_WIDTH, SKILL_TAGS } from 'src/config/constants'
import { Icon24ArrowRightOutline } from '@vkontakte/icons'
import { StepProps } from '.'
import { useNavigate } from 'react-router'
import Avatar from 'src/components/blocks/Avatar'
import { SkillTagNames } from 'project-finder-backend-types'

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flex: 2,
  maxHeight: 'calc(100vh - 56px)',
  flexDirection: 'column',
  margin: 'auto',
})
const ColumnContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: BUTTON_MAX_WIDTH,
}))

const PersonData: React.FC<StepProps> = ({ values, setValues }) => {
  const [value, setValue] = React.useState<SkillTagNames[]>([])
  const [inputValue, setInputValue] = React.useState('')
  const navigate = useNavigate()
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setValues((prev) => ({
      ...prev,
      skillTags: value.map((e) => ({ label: e })),
    }))
    navigate('/register?step=contacts')
  }

  useEffect(() => {
    if (!values.login) return navigate('/register')
  }, [])

  return (
    <Root>
      <ColumnContainer onSubmit={handleSubmit} autoComplete="off">
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
            mb: 4,
          }}
        >
          <Avatar uid={values.login || 'a'} letter={(values.name || 'a')[0]} />
        </Box>
        <Autocomplete
          multiple
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue as SkillTagNames[])
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
          }}
          id="skills"
          options={SKILL_TAGS}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} name="skills" label="Навыки" />
          )}
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<Icon24ArrowRightOutline width={20} height={20} />}
        >
          Продолжить
        </Button>
      </ColumnContainer>
    </Root>
  )
}

export default React.memo(PersonData)
