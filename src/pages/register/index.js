// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { useAuth } from 'src/hooks/useAuth'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormHelperText } from '@mui/material'

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '46rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem'
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  bottom: 0,
  left: '1.875rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { mt: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// const defaultValues = {
//   email: 'abdullah@test.com',
//   password: 'test123',
//   parentFullName: 'Test Koroglu',
//   parentPhone: '05511086483',
//   parentTcNo: '55555555555',
//   childFullName: 'Abdullah Koroglu',
//   birthDate: '20/10/2010',
//   childTcNo: '555555555',
// }
const defaultValues = {
  email: '',
  password: '',
  parentFullName: '',
  parentPhone: '',
  parentTcNo: '',
  childFullName: '',
  birthDate: '',
  childTcNo: '',
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  parentFullName: yup.string().required(),
  parentPhone: yup.string().required(),
  parentTcNo: yup.string().required(),
  childFullName: yup.string().required(),
  birthDate: yup.string().required(),
  childTcNo: yup.string().required(),
})


const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)


  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()

  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Vars
  const { skin } = settings
  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'


  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { email, password, parentFullName } = data
    auth.register({
      email,
      username: email,
      password,
      rememberMe: true,
      parentFullName: data.parentFullName,
      parentPhone: data.parentPhone,
      parentTcNo: data.parentTcNo,
      childFullName: data.childFullName,
      birthDate: data.birthDate,
      childTcNo: data.childTcNo,
    }, (err) => {
      setError('email', {
        type: 'manual',
        message: err.message ?? 'Something went wrong'
      })
    })
  }

  return (
    <Box className='content-right'>
      {/* {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt='register-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2 image={<TreeIllustration alt='tree' src='/images/pages/tree-2.png' />} />
        </Box>
      ) : null} */}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 12,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            {/* <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Adventure starts here 🚀</TypographyStyled>
              <Typography variant='body2'>Make your app management easy and fun!</Typography>
            </Box> */}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="childFullName"
                  control={control}
                  rules={{ required: 'Adı Soyadı zorunludur' }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label="Çocuk Adı Soyadı"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.childFullName)}
                      placeholder="Çocuk Adı Soyadı"
                    />
                  )}
                />
                {errors.childFullName && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.childFullName.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="birthDate"
                  control={control}
                  rules={{ required: 'Doğum Tarihi zorunludur' }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label="Doğum Tarihi (gün/ay/yıl)"
                      type="date"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.birthDate)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Doğum Tarihi"
                    />
                  )}
                />
                {errors.birthDate && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.birthDate.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="childTcNo"
                  control={control}
                  rules={{ required: 'TC Kimlik Numarası zorunludur' }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label="Çocuk TC Kimlik Numarası"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.childTcNo)}
                      placeholder="Çocuk TC Kimlik Numarası"
                    />
                  )}
                />
                {errors.childTcNo && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.childTcNo.message}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Veli Bilgileri */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="parentFullName"
                  control={control}
                  rules={{ required: 'Adı Soyadı zorunludur' }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label="Veli Adı Soyadı"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.parentFullName)}
                      placeholder="Veli Adı Soyadı"
                    />
                  )}
                />
                {errors.parentFullName && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.parentFullName.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="parentPhone"
                  control={control}
                  rules={{ required: 'Telefon Numarası zorunludur' }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label="Telefon Numarası"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.parentPhone)}
                      placeholder="Telefon Numarası"
                    />
                  )}
                />
                {errors.parentPhone && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.parentPhone.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'E-posta Adresi zorunludur',
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: 'Geçerli bir e-posta adresi giriniz',
                    },
                  }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label="E-posta Adresi"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.parentEmail)}
                      placeholder="E-posta Adresi"
                    />
                  )}
                />
                {errors.parentEmail && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.parentEmail.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="parentTcNo"
                  control={control}
                  rules={{ required: 'TC Kimlik Numarası zorunludur' }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      label="Veli TC Kimlik Numarası"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.parentTcNo)}
                      placeholder="Veli TC Kimlik Numarası"
                    />
                  )}
                />
                {errors.parentTcNo && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.parentTcNo.message}
                  </FormHelperText>
                )}
              </FormControl>



              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Şifre
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Şifre'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                label='Beni Hatırla'
                control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
              />
              {/* <FormControlLabel
                control={<Checkbox />}
                sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                label={
                  <>
                    <Typography variant='body2' component='span'>
                      I agree to{' '}
                    </Typography>
                    <LinkStyled href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </>
                }
              /> */}
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Kayıt Ol
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2 }}>
                  Zaten hesabınız var mı?
                </Typography>
                <Typography variant='body2'>
                  <LinkStyled href='/login'>Giriş yap</LinkStyled>
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
