import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/barraNavegacao'
import '../styles.css'
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { LuClipboardX } from "react-icons/lu";

function Desalocar() {

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className='text'>
                    <h1 className="titles"> <strong> Desalocar cliente WB </strong> </h1>
                </div>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead  className="titles-table">
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Desalocar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Carlos </td>
                                <td> 499.858.428-63 </td>
                                <td>
                                <Button
                                className="cps"
                                id="transparente"
                                // onClick={}
                                >
                                    <LuClipboardX color='black' size={28}/>
                                </Button>
                                </td>   
                                              
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Desalocar;
