import { Route, Routes } from "react-router-dom";
import { AdminRoutes, DoctorRoutes, GuestRoutes, PatientRoutes } from "./routes.jsx";
import { useStore } from "./store/store.jsx";

const AppRouter = () => {
  const [{ user: { roleId } }] = useStore();
  
  return (
    <Routes>
      {!roleId &&
        GuestRoutes.map(({ path, Component }, index) => (
          <Route path={path} element={<Component/>} key={`route-${index}`}/>
        ))}
      {roleId === 1 &&
        AdminRoutes.map(({ path, Component }, index) => {
          return <Route path={path} element={<Component/>} key={`route-${index}`}/>
        })}
      {roleId === 2 &&
        DoctorRoutes.map(({ path, Component }, index) => (
          <Route path={path} element={<Component/>} key={`route-${index}`}/>
        ))}
      {roleId === 3 &&
        PatientRoutes.map(({ path, Component }, index) => (
          <Route path={path} element={<Component/>} key={`route-${index}`}/>
        ))}
    </Routes>
  )
}

export default AppRouter;