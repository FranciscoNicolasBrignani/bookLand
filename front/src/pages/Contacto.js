
import React from "react";
import { useState } from "react";
import axios from 'axios';

const Contacto = (props) => {


    const initialFrom = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialFrom);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true)
        const reponse = await axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(reponse.data.message);
        if (reponse.data.error === false){
            setFormData(initialFrom)
        }
    }

    return(
        <main className="holder contacto">
    <div>
        <div className="caja_formulario">
        <form action="/contacto" method="post" className="formulario" onSubmit={handleSubmit}>
            <p>
            <h2>Contáctanos:</h2>
            <label className="campo_titulo" for="nombre">Nombre:</label>
            <input className="campo" type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </p>
            <p>
            <label className="campo_titulo" for="email">Email:</label>
            <input className="campo" type="text" name="email" value={formData.email} onChange={handleChange}  />
            </p>
            <p>
                <label className="campo_titulo" for="telefono">Telefono</label>
                <input className="campo" type="text" name="telefono" value={formData.telefono} onChange={handleChange}  />
            </p>
            <p>
            <label className="campo_titulo" for="mensaje">Mensaje:</label>
            <textarea className="campo" name="mensaje" value={formData.mensaje} onChange={handleChange} ></textarea>
            </p>
            <p className="acciones"><input className="enviar" type="submit" value="Enviar" /></p>
        </form>
        {sending ? <p>Enviando...</p> : null}
        {msg ? <p>{msg}</p> : null}
        </div>
    </div>
        
        

    </main>
    )
}

export default Contacto;