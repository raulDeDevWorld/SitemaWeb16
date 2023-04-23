import { PDFDownloadLink, Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useUser } from "../context/Context.js"
import { useState, useRef, useEffect } from 'react'
import Button from './Button'
Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        padding: "10px",
        paddingTop: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#ffffff",
        fontSize: "8px",
        fontWeight: "100"
    },
    subtitle: {
        width: "100%",
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#294B98",
        color: "#f2f2f2",
        padding: "1px 100px",
        margin: "16px 0",

    },


    containerIntroItems: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#38569c",
    },
    introImg: {
        width: "100%",
        height: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center"
    },
    logo: {
        position:"absolute",
        height: "auto",
        width: "150px",
        marginLeft: "35px",
    },
    introItems: {
        width: "100%",
    },
    items: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    introViewKeyValue: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    viewKeyValue: {
        width: "50%",
        display: "flex",
        flexDirection: "row"
    },
    key: {
        margin: "0px",
        width: "50%",
        padding: "2px 5px 0px 5px ",
        border: "1px solid #294B98",
        backgroundColor: "#294B98",
        color: "#f2f2f2",
        fontSize: "8px",
        fontWeight: "100"

    },
    value: {
        width: "50%",
        height: '12px',
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid #294B98",
        color: "#000000",
        fontSize: "8px",
        fontWeight: "100"

    },
    noValue: {
        width: "25%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "none",
        color: "#ffffff",
        fontSize: "8px",
        fontWeight: "100",
        backgroundColor: "transparent",

    },
    noValueYellow: {
        width: "25%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid orange",
        color: "#ffffff",
        fontSize: "8px",
        fontWeight: "100",
        backgroundColor: "orange",
    },


    noValueYellowCenter: {
        width: "25%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid orange",
        color: "#ffffff",
        fontSize: "8px",
        fontWeight: "100",
        textAlign: 'center',
        backgroundColor: "orange",
    },


    viewKeyValueTwo: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    viewKeyValueTwoYellow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        margin: "16px 0 0 0",
    },


})






const PDFView = () => {
    const { pdfData } = useUser()

    const [isCliente, setisCliente] = useState(false);
    console.log(pdfData)


    useEffect(() => {
        setisCliente(true)
    }, []);


    return (
        <div>
            {isCliente && <PDFDownloadLink document={
                <Document>
                    <Page style={styles.body} >
                        <Text style={styles.subtitle}>COTIZACIÓN TRANSPORTE </Text>
                        <View style={styles.containerIntroItems}>
                            <View style={styles.introImg}>
                                <Image style={styles.logo} src="/logo.png" />
                            </View>
                            <View style={styles.introItems}>
                                <View style={styles.introViewKeyValue}>
                                    <Text style={styles.key}>COTIZACIÓN No</Text>
                                    <Text style={styles.value}>{pdfData && pdfData["NC-COTIZACIÓN No"] && pdfData["NC-COTIZACIÓN No"]}</Text>
                                </View>
                                <View style={styles.introViewKeyValue}>
                                    <Text style={styles.key}>FECHA</Text>
                                    <Text style={styles.value}>{pdfData && pdfData["NC-FECHA"] && pdfData["NC-FECHA"]}</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.subtitle}>DATOS DE CLIENTE</Text>

                        <View style={styles.items}>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>NOMBRE</Text>
                                <Text style={styles.value}>{pdfData && pdfData["nombre"] && pdfData["nombre"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>CORREO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["correo"] && pdfData["correo"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>EMPRESA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["empresa"] && pdfData["empresa"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>TELEFONO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["telefono"] && pdfData["telefono"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>CARGO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["cargo"] && pdfData["cargo"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>CIUDAD</Text>
                                <Text style={styles.value}>{pdfData && pdfData["ciudad"] && pdfData["ciudad"]}</Text>
                            </View>
                        </View>

                        <Text style={styles.subtitle}>DESCRIPCION DE SERVICIO</Text>
                        <View style={styles.items}>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>NÚMERO DE SERVICIO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-NUMERO DE SERVICIO"] && pdfData["NC-NUMERO DE SERVICIO"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>MONEDA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-MONEDA"] && pdfData["NC-MONEDA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>MERCANCIA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-MERCANCIA"] && pdfData["NC-MERCANCIA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>*TIPO DE CARGA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-TIPO DE CARGA"] && pdfData["NC-TIPO DE CARGA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>MERCANCIA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-MERCANCIA"] && pdfData["NC-MERCANCIA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>*TIPO DE CAMBIO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-TIPO DE CAMBIO"] && pdfData["NC-TIPO DE CAMBIO"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>TIPO DE CARGA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-TIPO DE CARGA"] && pdfData["NC-TIPO DE CARGA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>*CONDICIONES DE PAGO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-CONDICIONES DE PAGO"] && pdfData["NC-CONDICIONES DE PAGO"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>TIPO DE SERVICIO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-TIPO DE SERVICIO"] && pdfData["NC-TIPO DE SERVICIO"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>CONTRATO/COTIZACIÓN</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-CONTRATO"] && pdfData["NC-CONTRATO"]}</Text>
                            </View>
                        </View>

                        <Text style={styles.subtitle}>DESCRPCION</Text>
                        <View style={styles.viewKeyValueTwo}>
                            <Text style={styles.key}>DETALLE</Text>
                            <Text style={styles.key}>COSTO UNITARIO</Text>
                            <Text style={styles.key}>CANTIDAD</Text>
                            <Text style={styles.key}>COSTO TOTAL</Text>
                            <Text style={styles.key}>FACTURA</Text>
                            <Text style={styles.key}>OBSERVACION</Text>
                        </View>

                        {
                            pdfData && pdfData.tarifa && pdfData.tarifa.map((i, index) => {
                                return (

                                    <View style={styles.viewKeyValueTwo} key={index}>
                                        <Text style={styles.value}>{pdfData && pdfData[`NC-DETALLE${index}`] && pdfData[`NC-DETALLE${index}`]}</Text>
                                        <Text style={styles.value}>{pdfData && pdfData[`COSTOUNITARIO${index}`] && pdfData[`COSTOUNITARIO${index}`]}</Text>
                                        <Text style={styles.value}>{pdfData && pdfData[`CANTIDAD${index}`] && pdfData[`CANTIDAD${index}`]}</Text>
                                        <Text style={styles.value}>{pdfData && pdfData[`PRODUCT${index}`] && pdfData[`PRODUCT${index}`]}</Text>
                                        <Text style={styles.value}>{pdfData && pdfData[`NC-FACTURA${index}`] && pdfData[`NC-FACTURA${index}`]}</Text>
                                        <Text style={styles.value}>{pdfData && pdfData[`NC-OBSERVACION${index}`] && pdfData[`NC-OBSERVACION${index}`]}</Text>
                                    </View>


                                )
                            })
                        }
                        <View style={styles.viewKeyValueTwo}>
                            <Text style={styles.noValueYellow}></Text>
                            <Text style={styles.noValueYellowCenter}>TOTAL</Text>
                            <Text style={styles.noValueYellow}></Text>
                            <Text style={styles.noValueYellow}>{pdfData && pdfData[`PRODUCTOTOTAL`] && pdfData[`PRODUCTOTOTAL`]}</Text>
                            <Text style={styles.noValue}></Text>
                            <Text style={styles.noValue}></Text>
                        </View>


                        <Text style={styles.subtitle}>DATOS BANCARIOS</Text>
                        <View style={styles.items}>
                            <View style={styles.viewKeyValueTwo}>
                                <Text style={styles.key}>BANCO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-BANCO"] && pdfData["NC-BANCO"]}</Text>
                            </View>
                            <View style={styles.viewKeyValueTwo}>
                                <Text style={styles.key}>DIRECCION DE BANCO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-DIRECCION DE BANCO"] && pdfData["NC-DIRECCION DE BANCO"]}</Text>
                            </View>
                            <View style={styles.viewKeyValueTwo}>
                                <Text style={styles.key}>CODIGO SWIFT</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-CODIGO SWIFT"] && pdfData["NC-CODIGO SWIFT"]}</Text>
                            </View>
                            <View style={styles.viewKeyValueTwo}>
                                <Text style={styles.key}>NUMERO DE CUENTA EN BS</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-NUMERO DE CUENTA EN BS"] && pdfData["NC-NUMERO DE CUENTA EN BS"]}</Text>
                            </View>
                            <View style={styles.viewKeyValueTwo}>
                                <Text style={styles.key}>NUMERO DE CUENTA EN USD</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-NUMERO DE CUENTA EN USD"] && pdfData["NC-NUMERO DE CUENTA EN USD"]}</Text>
                            </View>
                            <View style={styles.viewKeyValueTwo}>
                                <Text style={styles.key}>TIPO DE CUENTA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-TIPO DE CUENTA"] && pdfData["NC-TIPO DE CUENTA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValueTwo}>
                                <Text style={styles.key}>NOMBREA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-NOMBRE2"] && pdfData["NC-NOMBRE2"]}</Text>
                            </View>
                            <View style={styles.viewKeyValueTwo}>
                                <Text style={styles.key}>DIRECCION0</Text>
                                <Text style={styles.value}>{pdfData && pdfData["NC-DIRECCION"] && pdfData["NC-DIRECCION"]}</Text>
                            </View>
                        </View>







                    </Page>
                </Document>}
                fileName='Cotizacion Terrestre'>


                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={'buttonSecondary'}>pdf</Button>
                </div>

            </PDFDownloadLink>}
        </div>
    )
}


export default PDFView
