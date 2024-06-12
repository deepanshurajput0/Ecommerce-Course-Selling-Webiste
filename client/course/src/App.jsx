import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import Header from './components/layouts/header/Header'
import Courses from './components/Courses/Courses'
import Footer from './components/layouts/Footer/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgetPassword from './components/auth/ForgetPassword'
import ResetPassword from './components/auth/ResetPassword'
import Contact from './components/Contact/Contact'
import Request from './components/Request/Request'
import About from './components/About/About'
import Subscribe from './components/Payments/Subscribe'
import PaymentFail from './components/Payments/PaymentFail'
import PaymentSuccess from './components/Payments/PaymentSuccess'
import NotFound from './components/layouts/NotFound/NotFound'
import CoursePage from './components/CoursePage/CoursePage'
import Profile from './components/Profile/Profile'
import ChangePassword from './components/Profile/ChangePassword'
import UpdateProfile from './components/Profile/UpdateProfile'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import CreateCourse from './components/Admin/CreateCourse/CreateCourse'
import AdminCourses from './components/Admin/AdminCourses/AdminCourses'
import Users from './components/Admin/Users/Users'
import { useDispatch, useSelector } from 'react-redux'
import  toast,{Toaster} from 'react-hot-toast'
import { useEffect } from 'react'
import { loadUser } from './redux/actions/user'
import { ProtectedRoute } from "protected-route-react"
import Loader from './components/layouts/Loader/Loader'
function App() {
const { isAuthenticated, user, message, error, loading } = useSelector(state=>state.user)
const dispatch = useDispatch()
useEffect(()=>{
  if(error){
    toast.error(error)
    dispatch({type:'clearError'})
  }
  if(message){
    toast.success(message)
    dispatch({type:'clearMessage'})
  }
},[dispatch,error,message])

useEffect(()=>{
  dispatch(loadUser())
},[dispatch])
  return (
    <Router>
    {
      loading ? (<Loader/>) :(
        <> 
              <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/course/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} >
          <CoursePage user={user} />
        </ProtectedRoute>} />
        <Route path='/about' element={<About/>} />
        <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} > <Profile user={user} /> </ProtectedRoute>} />
        <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated}   >
          <ChangePassword/>
        </ProtectedRoute>} />
        <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated} >
          <UpdateProfile user={user} />
        </ProtectedRoute>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/request' element={<Request/>} />
        <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' >
          <Login/>
        </ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' >
          <Register/>
        </ProtectedRoute>} />
        <Route path='/forgetpassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' >
          <ForgetPassword/>
        </ProtectedRoute>
        } />
        <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' >
          <ResetPassword/>
        </ProtectedRoute>
        } />
        <Route path='*' element={<NotFound/>} />
        <Route path='/subscribe' element={<ProtectedRoute isAuthenticated={isAuthenticated} >
          <Subscribe user={user} />
        </ProtectedRoute>} />
        <Route path='/paymentsuccess' element={<PaymentSuccess/>} />
        <Route path='/paymentfail' element={<PaymentFail/>} />

        // admin routes 
        <Route path='/admin/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'} >
          <Dashboard/>
        </ProtectedRoute>} />
        <Route path='/admin/createcourse' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'} >
          <CreateCourse/>
        </ProtectedRoute>} />
        <Route path='/admin/courses' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'} >
          <AdminCourses/>
        </ProtectedRoute>} />
        <Route path='/admin/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'} >
          <Users/>
        </ProtectedRoute>} />

      </Routes>
      <Footer/>
      <Toaster/>
        </>
      )
    }
    </Router>
  )
}

export default App
