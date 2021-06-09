import Perfil from '../pages/Item/Perfil'
import Usuarios from '../pages/Item/Usuarios'

export const routing = {
    admin:[
        {
    path:"/User/Perfil",
    exact:true, component:Perfil
},
{
    path:"/User/Usuarios",
    exact:true, component:Usuarios
}
]}