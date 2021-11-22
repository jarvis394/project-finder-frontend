import { Grid, styled, alpha } from '@mui/material'
import React from 'react'

interface SkillTagProps {
  label: string
  variant?: 'outlined' | 'default'
}

const Label = styled('span')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))
const StyledSkillTag = styled('div')(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.12),
  borderRadius: 8,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.primary.main,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
const StyledOutlinedSkillTag = styled('div')(({ theme }) => ({
  borderRadius: 8,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.primary.main,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 0 1px inset ' + theme.palette.primary.main,
}))

const SkillTag: React.FC<SkillTagProps> = ({ label, variant = 'default' }) => {
  switch (variant) {
    case 'default':
      return (
        <StyledSkillTag>
          <Label>{label}</Label>
        </StyledSkillTag>
      )
    case 'outlined':
      return (
        <StyledOutlinedSkillTag>
          <Label>{label}</Label>
        </StyledOutlinedSkillTag>
      )
  }
}

export default SkillTag
