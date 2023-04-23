import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useUser } from '../context/Context'
import { WithAuth } from '../HOCs/WithAuth'
import Layout from '../layout/Layout'
import Card from '../components/Card'
import { getDayMonthYear } from "../utils/Fecha";
import { writeUserData } from '../firebase/utils';


import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


import style from '../styles/CotizacionLCL.module.css'
import Button from '../components/Button'
import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("../components/pdfNC"), {
    ssr: false,
});

function CotizacionTerrestre() {
    const { userDB, pdfData, setUserPdfData, setUserSuccess } = useUser()
    const router = useRouter()

    const [tarifa, setTarifa] = useState([""])
    const [otrosGastos, setOtrosGastos] = useState([""])
    const [incluye, setIncluye] = useState([""])
    const [excluye, setExcluye] = useState([""])
    const [filter, setFilter] = useState("")
    const [autocomplete, setAutocomplete] = useState(false)
    const [itemSelect, setItemSelect] = useState({})

    const [calc, setCalc] = useState({})

    function handleEventChange(e) {
        let data = e.target.name !== 'nombre' &&
            e.target.name !== 'correo' &&
            e.target.name !== 'empresa' &&
            e.target.name !== 'telefono' &&
            e.target.name !== 'cargo' &&
            e.target.name !== 'ciudad' &&
            e.target.name !== 'ci'
            ? { [`NC-${e.target.name}`]: e.target.value } : { [`${e.target.name}`]: e.target.value }
        setUserPdfData({ ...pdfData, ...data, tarifa, otrosGastos, incluye, excluye })
    }
    function handlerCounter(word) {
        const newTarifa = tarifa.map(i => i)
        newTarifa.pop()
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa: [...tarifa, ...[""]], otrosGastos, incluye, excluye })
            setTarifa([...tarifa, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa: newTarifa, otrosGastos, incluye, excluye })
            setTarifa(newTarifa)
        }
    }
    function handlerCounterTwo(word) {
        const newOtrosGastos = otrosGastos.map(i => i)
        newOtrosGastos.pop()
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos: [...otrosGastos, ...[""]], incluye, excluye })
            setOtrosGastos([...otrosGastos, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos: newOtrosGastos, incluye, excluye })
            setOtrosGastos(newOtrosGastos)
        }
    }
    function handlerCounterThree(word) {
        const newIncluye = incluye.map(i => i)
        newIncluye.pop()
        word == "pluss" ? setIncluye([...incluye, ...[""]]) : setIncluye(newIncluye)

        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye: [...incluye, ...[""]], excluye })
            setIncluye([...incluye, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye: newIncluye, excluye })
            setIncluye(newIncluye)
        }
    }
    function handlerCounterFour(word) {
        const newExcluye = excluye.map(i => i)
        newExcluye.pop()
        word == "pluss" ? setExcluye([...excluye, ...[""]]) : setExcluye(newExcluye)
        if (word == "pluss") {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, excluye: [...excluye, ...[""]] })
            setExcluye([...excluye, ...[""]])
        } else {
            setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, excluye: newExcluye })
            setExcluye(newExcluye)
        }
    }

    function handlerPdfButton() {
        setUserPdfData({ ...pdfData, tarifa, otrosGastos, incluye, excluye })
        let object = {
            NotaDeCobranza: userDB.NotaDeCobranza ? userDB.NotaDeCobranza + 1 : 1
        }
        writeUserData('/', object, setUserSuccess)
    }

    function handlerCalc(e, index) {

        if (e.target.name == `CANTIDAD${index}` && calc[`COSTOUNITARIO${index}`] !== undefined) {
            let object = reducer(e, index, 'COSTOUNITARIO', 'PRODUCT', 'TOTAL')
            setCalc({ ...calc, ...object })
            setUserPdfData({ ...pdfData, ...calc, ...object })
            return
        }

        if (e.target.name == `COSTOUNITARIO${index}` && calc[`CANTIDAD${index}`] !== undefined) {
            let object = reducer(e, index, 'CANTIDAD', 'PRODUCT', 'TOTAL')
            setCalc({ ...calc, ...object })
            setUserPdfData({ ...pdfData, ...calc, ...object })
            return
        }

        let object = {
            [e.target.name]: e.target.value,

        }
        setCalc({ ...calc, ...object })
        setUserPdfData({ ...pdfData, ...calc, ...object })

    }


    function reducer(e, index, counter, prod, total) {
        let product = e.target.value * calc[`${counter}${index}`]

        let data = {
            ...calc,
            [e.target.name]: e.target.value,
            [`${prod}${index}`]: product,
        }

        let arr = Object.entries(data)

        let red = arr.reduce((ac, i) => {
            let str = i[0]
            if (str.includes(total)) {
                return ac
            }
            let res = str.includes(prod)
            let r = res ? i[1] + ac : ac
            return r
        }, 0)

        let object = {
            [e.target.name]: e.target.value,
            [`${prod}${index}`]: product,
            PRODUCTOTOTAL: prod === 'PRODUCT' ? red : data['PRODUCTOTOTAL'],
        }
        return object
    }


    function handleFilterChange(e) {
        setFilter(e.target.value)
    }
    function autoComplete (e) {
    }
    function handlerFilterButton(e) {

        e.preventDefault()
        let obj = {
            nombre: '',
            correo: '',
            empresa: '',
            telefono: '',
            cargo: '',
            ciudad: '',
            ci: ''

        }
        let f = userDB.users[filter] ? userDB.users[filter] : obj

        setItemSelect(f)
        setUserPdfData({ ...pdfData, ...f })

        setAutocomplete(true)
        console.log(f)
    }
    console.log(calc)



    useEffect(() => {
        let cotizacionNo = userDB.NotaDeCobranza
            ? `${userDB.NotaDeConbranza + 1 < 10 ? '00' : ''}${userDB.NotaDeConbranza + 1 > 9
                && userDB.NotaDeConbranza + 1 < 100 ? '0' : ''}${userDB.NotaDeConbranza + 1}/${new Date().getFullYear().toString().substring(2, 4)}` : `001/${new Date().getFullYear().toString().substring(2, 4)}`
        let date = getDayMonthYear()


        userDB !== '' && setUserPdfData({
            ...pdfData,
            ["NC-COTIZACION No"]: cotizacionNo,
            ["NC-FECHA"]: date
        })

    }, [userDB, tarifa]);



    return (
        <Layout>
            <div className={style.container}>
                <form className={style.form}>

                    <div className={style.containerFilter}>
                        <input className={style.inputFilter} type="text" onChange={handleFilterChange} placeholder='Autocompletar por CI' />
                        <Button style={'buttonSecondary'} click={handlerFilterButton}>Completar</Button>
                    </div>

                    <div className={style.subtitle}>COTIZACIÓN TRANSPORTE TERRESTRE</div>
                    <div className={style.containerFirstItems}>
                        <div className={style.imgForm}>
                            <Image src="/logo.svg" width="250" height="150" alt="User" />
                        </div>
                        <div className={style.firstItems}>
                            <div>
                                <label htmlFor="">NOTA DE COBRANZA NO</label>
                                <input type="text" name={"NOTA DE COBRANZA NO"} onChange={handleEventChange} defaultValue={pdfData["NC-COTIZACION No"] && pdfData["NC-COTIZACION No"]} />
                            </div>
                            <div>
                                <label htmlFor="">FECHA</label>
                                <input type="text" name={"FECHA"} onChange={handleEventChange} defaultValue={pdfData["NC-FECHA"] && pdfData["NC-FECHA"]} />
                            </div>

                        </div>
                    </div>
                    <br />
                    <div className={style.subtitle}>DATOS DE CLIENTE</div>
                    <br />
                    <div className={style.items}>
                        <div>
                            <label htmlFor="">NOMBRE</label>
                            <input type="text" name={"NOMBRE"} onChange={handleEventChange} defaultValue={itemSelect['nombre'] ? itemSelect['nombre'] : ''} />
                        </div>
                        <div>
                            <label htmlFor="">CORREO</label>
                            <input type="text" name={"CORREO"} onChange={handleEventChange} defaultValue={itemSelect['correo'] ? itemSelect['correo'] : ''} />
                        </div>
                        <div>
                            <label htmlFor="">EMPRESA</label>
                            <input type="text" name={"EMPRESA"} onChange={handleEventChange} defaultValue={itemSelect['empresa'] ? itemSelect['empresa'] : ''} />
                        </div>
                        <div>
                            <label htmlFor="">TELEFONO</label>
                            <input type="text" name={"TELEFONO"} onChange={handleEventChange} defaultValue={itemSelect['telefono'] ? itemSelect['telefono'] : ''} />
                        </div>
                        <div>
                            <label htmlFor="">CARGO</label>
                            <input type="text" name={"CARGO"} onChange={handleEventChange} defaultValue={itemSelect['cargo'] ? itemSelect['cargo'] : ''} />
                        </div>

                        <div>
                            <label htmlFor="">CIUDAD</label>
                            <input type="text" name={"CIUDAD"} onChange={handleEventChange} defaultValue={itemSelect['ciudad'] ? itemSelect['ciudad'] : ''} />
                        </div>
                    </div>
                    <br />
                    <div className={style.subtitle}>DESCRIPCION DE SERVICIO</div>
                    <br />
                    <div className={style.items}>
                        <div>
                            <label htmlFor="">NÚMERO DE SERVICIO</label>
                            <input type="text" name={"NUMERO DE SERVICIO"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <label htmlFor="">MONEDA</label>
                            <input type="text" name={"MONEDA"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">MERCANCÍA</label>
                            <input type="text" name={"MERCANCIA"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">TIPO DE CAMBIO</label>
                            <input type="text" name={"TIPO DE CAMBIO"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">TIPO DE CARGA</label>
                            <input type="text" name={"TIPO DE CARGA"} onChange={handleEventChange} />
                        </div>

                        <div>
                            <label htmlFor="">CONDICIONES DE PAGO</label>
                            <input type="text" name={"CONDICIONES DE PAGO"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">TIPO DE SERVICIO</label>
                            <input type="text" name={"TIPO DE SERVICIO"} onChange={handleEventChange} />
                        </div>
                        <div>
                            <label htmlFor="">CONTRATO/COTIZACIÓN</label>
                            <input type="text" name={"CONTRATO"} onChange={handleEventChange} />
                        </div>

                    </div>
                    <br />


                    <div className={style.subtitle}>DESCRPCION<span className={style.counterPluss} onClick={() => handlerCounter('pluss')}>+</span> <span className={style.counterLess} onClick={() => handlerCounter('less')}>-</span></div>

                    <br />
                    <div className={`${style.containerFirstItems2} ${style.desktop}`}>
                        <span>DETALLE</span>
                        <span>COSTO UNITARIO</span>
                        <span>CANTIDAD</span>
                        <span>COSTO TOTAL</span>
                        <span>FACTURA</span>
                        <span>OBSERVACION</span>
                    </div>
                    {
                        tarifa.map((i, index) => {
                            return (
                                <div className={`${style.inputs}`} key={index}>
                                    <input type="text" name={`DETALLE${index}`} onChange={handleEventChange} placeholder="DETALLE" />
                                    <input type="number" name={`COSTOUNITARIO${index}`} onChange={(e) => handlerCalc(e, index)} placeholder="COSTO UNITARIO" />
                                    <input type="number" name={`CANTIDAD${index}`} onChange={(e) => handlerCalc(e, index)} placeholder="CANTIDAD" />
                                    <input type="text" name={`PRODUCT${index}`} defaultValue={calc[`PRODUCT${index}`] && calc[`PRODUCT${index}`]} placeholder="COSTO TOTAL" />
                                    <input type="number" name={`FACTURA${index}`} onChange={handleEventChange} placeholder="FACTURA" />
                                    <input type="number" name={`OBSERVACION${index}`} onChange={handleEventChange} placeholder="OBSERVACION" />
                                </div>
                            )
                        })
                    }
                    <div className={`${style.inputs}`} >
                        <span className={style.total}>TOTAL</span>
                        <span className={style.span}>{calc[`PRODUCTOTOTAL`] && calc[`PRODUCTOTOTAL`]}</span>
                    </div>
                    <br />
                    <div className={style.subtitle}>DATOS BANCARIOS</div>
                    <br />
                    <div className={style.containerFirstItems}>
                    <div className={style.firstItems}>
                                <div>
                                    <label htmlFor="">BANCO</label>
                                    <input type="text" name={"BANCO"} onChange={handleEventChange} defaultValue={userDB.bank && userDB.bank.banco && userDB.bank.banco} />
                                </div>
                                <div>
                                    <label htmlFor="">DIRECCION DE BANCO</label>
                                    <input type="text" name={"DIRECCION DE BANCO"} onChange={handleEventChange} defaultValue={userDB.bank && userDB.bank.direccionDeBanco && userDB.bank.direccionDeBanco} />
                                </div>
                                <div>
                                    <label htmlFor="">CODIGO SWIFT</label>
                                    <input type="text" name={"CODIGO SWIFT"} onChange={handleEventChange} defaultValue={userDB.bank && userDB.bank.codigoSWIFT && userDB.bank.codigoSWIFT} />
                                </div>
                                <div>
                                    <label htmlFor="">NUMERO DE CUENTA EN BS</label>
                                    <input type="text" name={"NUMERO DE CUENTA EN BS"} onChange={handleEventChange} defaultValue={userDB.bank && userDB.bank.cuentaEnBS && userDB.bank.cuentaEnBS} />
                                </div>
                                <div>
                                    <label htmlFor="">NUMERO DE CUENTA EN USD</label>
                                    <input type="text" name={"NUMERO DE CUENTA EN USD"} onChange={handleEventChange} defaultValue={userDB.bank && userDB.bank.cuentaEnUSD && userDB.bank.cuentaEnUSD} />
                                </div>
                                <div>
                                    <label htmlFor="">TIPO DE CUENTA</label>
                                    <input type="text" name={"TIPO DE CUENTA"} onChange={handleEventChange} defaultValue={userDB.bank && userDB.bank.tipoDeCuenta && userDB.bank.tipoDeCuenta} />
                                </div>
                                <div>
                                    <label htmlFor="">NOMBRE</label>
                                    <input type="text" name={"NOMBRE2"} onChange={handleEventChange} defaultValue={userDB.bank && userDB.bank.nombre2 && userDB.bank.nombre2} />
                                </div>
                                <div>
                                    <label htmlFor="">DIRECCION</label>
                                    <input type="text" name={"DIRECCION"} onChange={handleEventChange} defaultValue={userDB.bank && userDB.bank.direccion && userDB.bank.direccion} />
                                </div>
                            </div>
                    </div> 
                </form>
            </div>


            <InvoicePDF click={handlerPdfButton} />

            <br />
            <br />
        </Layout>
    )
}

export default WithAuth(CotizacionTerrestre) 
