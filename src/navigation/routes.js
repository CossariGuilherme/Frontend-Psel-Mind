import React from 'react'
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Dashboarduser from '../Components/DashboardUser/Dashboarduser'
import EditUsers from '../pages/Item/EditUsers'

function Routes(){
    return(
        
        <BrowserRouter>
            <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/Register" exact component={Register}/>
            <Route path="/User" component={Dashboarduser}/>
            <Route path="/Edit" component={EditUsers}/>
            
            </Switch>
           
            
        </BrowserRouter>
    )
    
}

export default Routes
