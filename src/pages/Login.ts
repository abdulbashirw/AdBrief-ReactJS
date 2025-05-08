import {
  Button,
  Center,
  Column,
  Container,
  Draggable,
  IconButton,
  Image,
  Paper,
  Root,
  Rows,
  Space,
  Switch,
  Text,
  TextField,
} from '../System/Lib/Widgets'
import { useEffect, useState } from 'react'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useDispatch } from 'react-redux'
import { useTheme } from '../hooks/useTheme'
import { toggleTheme } from '../store/slices/theme.slice'
import bg1 from '../assets/images/bg1.png'
import bg2 from '../assets/images/bg2.png'
import logo from '../assets/images/adbrief.png'
import logo1 from '../assets/images/adbrief1.png'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const Theme = useTheme()
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [touchedPwd, setTouchedPwd] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const nav = useNavigate()

  useEffect(() => {
    if (loading) {
      setButtonDisabled(true)
      return
    }
    return
  }, [loading])

  useEffect(() => {
    console.log('Init apps')
    const timer = setTimeout(() => {
      setButtonDisabled(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const componentUsername = TextField({
    value: username,
    //label: "Masukkan email",
    helperText: 'Format email: nama@domain.com',
    placeholder: 'Masukkan email Anda',
    required: true,
    maxLength: 30,
    error: touched && username.length < 8,
    startAdornment: IconButton(AccountCircleIcon),
    onChange: (event: any) => setUsername(event.target.value),
    onBlur: () => setTouched(true),
  })

  const passwordComponent = TextField({
    value: password,
    //label: "Masukkan Password",
    helperText: 'Minimal 8 karakter',
    placeholder: 'Masukkan password Anda',
    required: true,
    obscureText: !showPassword,
    minLength: 8,
    error: touchedPwd && password.length < 8,
    startAdornment: IconButton(LockPersonIcon),
    endAdornment: IconButton(showPassword ? VisibilityIcon : VisibilityOffIcon, {
      onClick: () => setShowPassword(!showPassword),
    }),
    onChange: (e: any) => setPassword(e.target.value),
    onBlur: () => setTouchedPwd(true),
  })

  const buttonLogin = Container({
    width: 500,
    height: 40,
    child: Button('Login', {
      disabled: buttonDisabled,
      confirm: true,
      loading,
      click: () => {
        nav('/')
      },
    }),
  })

  return Root({
    theme: Theme.colors,
    image: Theme.theme === 'dark' ? bg2 : bg1,
    child: Column({
      center: true,
      backgroundColor: '#FCF5F6',
      children: [
        Draggable({
          position: { x: (window.screen.availWidth - 600) / 2, y: 100 },
          child: Paper({
            elevation: 10,
            borderRadius: 20,
            child: Column({
              width: 600,
              height: 'auto',
              flex: 'unset',
              padding: 50,
              children: [
                Center({
                  child: Image({
                    src: Theme.theme === 'dark' ? logo1 : logo,
                    width: 300,
                    height: 'auto',
                  }),
                }),
                Space(50),
                // Center({ child: Text("Login", { size: 30, weight: "bold" }) }),
                // Space(10),
                Text('Username', { size: 14, weight: 'bold' }),
                Space(10),
                Container({ width: 500, child: componentUsername }),
                Space(25),
                Text('Password', { size: 14, weight: 'bold' }),
                Space(10),
                Container({ width: 500, child: passwordComponent }),
                Space(25),
                Rows({
                  width: 500,
                  fullWidth: true,
                  children: [buttonLogin],
                }),
                Switch({
                  checked: Theme.theme === 'dark',
                  label: Theme.theme === 'dark' ? 'Dark Theme' : 'Light Theme',
                  onChange: () => dispatch(toggleTheme()),
                }),
                Space(30),
                Text('Powered By PT Administrasi Medika', {
                  size: 12,
                  color: Theme.theme === 'dark' ? '#FFFFFF' : '#000000',
                  textAlign: 'center',
                  justifyContent: 'center',
                  weight: 'bold',
                }),
              ],
            }),
          }),
        }),
      ],
    }),
  }).builder()
}
