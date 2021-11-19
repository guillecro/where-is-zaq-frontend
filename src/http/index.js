import axios from 'axios'
// import store from '@/store'
// import router from '@/router'
// TODO To be implemented 13.x
// import { SnackbarProgrammatic as Snackbar } from 'buefy'

axios.defaults.timeout = 60000
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true

// axios.interceptors.request.use(
//   config => {
//     if (store.state.session) {
//       config.headers.Authorization = `Bearer ${store.state.session.token}`
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })

// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     console.error(error.response.data)
//     if (error.response) {
//       switch (error.response.status) {
//         // TODO To be implemented 13.x
//         // case 400:
//         //   console.log(error.response)
//         //   Snackbar.open({
//         //     message: `Error: (${error.response.data.estado}) ${error.response.data.mensaje}`,
//         //     type: 'is-danger'
//         //   })
//         //   Promise.reject(error.response.data)
//         //   break
//         case 401:
//           store.commit('logout')
//           router.push({
//             name: 'login',
//             query: { redirect: router.currentRoute.fullPath }
//           })
//           break
//         case 403:
//           router.push({
//             name: '403'
//           })
//           break
//                 // default:
//                 //     r    outer.replace({
//                 //         name: 'error'
//                 //     })
//       }
//     }
//     return Promise.reject(error.response.data)
//   })

export default axios
