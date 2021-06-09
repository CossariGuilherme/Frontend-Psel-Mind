import React, { Component, forwardRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import api from '../../services/api'
import {Modal, Button} from 'react-bootstrap'
import { withRouter, useHistory } from 'react-router-dom'
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  CheckCircle,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  InfoOutlined,
  Add,
  RemoveCircle,
} from "@material-ui/icons";
function deletar() {

}
function Usuarios() {
  const [id, setId] = useState("")
  const columns = [
    { title: "Nome", field: "username" },
    { title: "CPF", field: "CPF" },
    { title: "Email", field: "email" }
  ]

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const [allUsers, setAllUsers] = useState([])
  const [usuario, setUsuario] = useState({})
  const history = useHistory()
  

  useEffect(() => {
    (async () => {
      const response = await api.get('/showAll');
      await localStorage.setItem('users', JSON.stringify(response.data));
      //console.log('entrou useEffect',response.data);
      setAllUsers(await localStorage.getItem('users'));
    })();
  }, []);

  async function getUsers() {
    //console.log('chegou')
    const users = await api.get("/showAll")
    //console.log(users)
    setAllUsers(users.data)

  }

  useEffect(() => {
    getUsers()

  }, [])
  const actions = [
    {
      icon: DeleteOutline,
      tooltip: "Deletar",
      onClick: (event, rowData) => {
        //console.log(rowData.id)

        api.delete("/destroy/" + rowData.id)
        getUsers()
      },
    },
    {
      icon: Edit,
      tooltip: "Editar",
      onClick: (event, rowData) => {
        update(rowData.id)
      },
    },
    {
      icon: CheckCircle,
      tooltip: "Ativar",
      onClick: (event, rowData) => {
        ativarUsuario(rowData.id)
      },
    },
    {
      icon: RemoveCircle,
      tooltip: "Desativar",
      onClick: (event, rowData) => {
        desativarUsuario(rowData.id)
      },
    },
  ]

  async function update(usuarioId) {
    try {
      const response = await api.get(`/show/${usuarioId}`);
      console.log(response)
      await localStorage.setItem(
        'usuario',
        JSON.stringify(response.data),
        setUsuario(response)
      );
     history.push('/Edit')
      console.log('Função update', response.data);
    } catch (err) {
      console.log(usuario)
      //console.log(err);
      window.alert('Não foi possível');
    }
  }
  async function ativarUsuario(usuarioId) {
    try{
      const response = await api.put(`/ativarAcesso/${usuarioId}`, {acesso:1})
      console.log(response)
    }catch(err){

    }
  }
  async function desativarUsuario(usuarioId) {
    try{
      const response = await api.put(`/desativarAcesso/${usuarioId}`, {acesso:0})
      console.log(response)
    }catch(err){

    }
  }


  return (

    <div style={{ width: '100%' }}>
      <MaterialTable

        title="Usuários"

        columns={columns}
        actions={actions}
        icons={tableIcons}
        data={allUsers}

      />
      {/* <Modal.Dialog 
      show={showModal}
      //onHide={}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog> */}
    </div>


  )

}
export default Usuarios