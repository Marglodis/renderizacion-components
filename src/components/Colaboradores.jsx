import { useState } from "react";
import { BaseColaboradores } from "../BaseColaboradores";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const Colaboradores = () => {
  const [nombreColaborador, setnombreColaborador] = useState("");
  const [emailColaborador, setemailColaborador] = useState("");
  const [listaColaboradores, setlistaColaboradores] =
    useState(BaseColaboradores);
  const [busqueda, setBusqueda] = useState("");

  const [error, setError] = useState(false);

  const enviarFormulario = (e) => {
    e.preventDefault();
    if ([nombreColaborador, emailColaborador].includes("")) {
      setError(true);
      return;
    }
    setlistaColaboradores([
      ...listaColaboradores,
      { id: Date.now(), nombre: nombreColaborador, email: emailColaborador },
    ]);
    setemailColaborador("");
    setnombreColaborador("");
    setError(false);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const results = !busqueda
    ? listaColaboradores
    : listaColaboradores.filter((dato) => dato.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase()));

  return (
    <>
      {/** INput de Busqueda */}

      <div className="encabezado">
        <h1 className="title">Búsqueda de Colaboradores</h1>
        <div className="buscar">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={handleChange}
          ></input>
          <div className="btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>

      {/** Form de Colaborador */}
      <div className="formulario">
        <form onSubmit={enviarFormulario}>
          <label>
            <i class="fa-solid fa-user"></i>
            <input
              value={nombreColaborador}
              placeholder="nombre"
              name="nombre"
              onChange={(e) => {
                setnombreColaborador(e.target.value);
              }}
            />
          </label>
          <label>
            <i class="fa-solid fa-at"></i>
            <input
              value={emailColaborador}
              placeholder="email"
              type="email"
              name="email"
              onChange={(e) => {
                setemailColaborador(e.target.value);
              }}
            />
          </label>
          {error && <p>Todos los campos son obligatorios</p>}
          <button>Agregar Colaborador</button>
        </form>
      </div>

      {/** Visualizar Colaboradores  */}
      <hr></hr>
      <h3>Listado de Colaboradores</h3>
      
      <Table striped bordered hover>
        <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
        </thead>
        <tbody>
         {
           results.map((colaborador) => (
            <tr key={colaborador.id}>
              <td>{colaborador.id}</td>
              <td>{colaborador.nombre}</td>
              <td>{colaborador.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Colaboradores;
