// ** React Imports
import { createContext, useEffect, useRef, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  const interceptorId = useRef(null)

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.user, role: response.data.user?.role?.name })
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem('userData')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()

    // ** Setup Axios Interceptors for adding JWT to headers
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    if (storedToken) {
      // Store the interceptor ID so we can eject it later
      interceptorId.current = axios.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${storedToken}`

          return config
        },
        error => {
          return Promise.reject(error)
        }
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.jwt)
          : null

        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.user)) : null

        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${response.data.jwt}`
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data, role: response.data.role.name })
            router.replace('/')
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem('userData')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })



      })
      .catch(err => {
        console.log(err);
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    // ** Remove user and token from localStorage
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)

    // ** Eject the interceptor to stop sending the token in headers
    if (interceptorId.current !== null) {
      axios.interceptors.request.eject(interceptorId.current)
    }

    // ** Redirect to login
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.jwt)
          : null

        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${response.data.jwt}`
            }
          })
          .then(async response => {
            console.log(response.data);

            setLoading(false)
            setUser({ ...response.data.user, role: response.data.user.role.name })
            router.replace('/')
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })


      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
