import { PDFDownloadLink, Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useUser } from "../context/Context.js"
import { useState, useRef, useEffect } from 'react'
import { getDayMonthYear } from "../utils/Fecha";
import Button from './Button'
Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        padding: "2cm",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#ffffff",
        fontSize: "8px",
        fontWeight: "100",
    },
    title: {

        fontSize: '20px',
        fontWeight: 'bold',

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
        justifyContent: "center",
        alignItems: "center"



    },
    logo: {
        position: "absolute",
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
        width: "100%",
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
        margin: "0px",
        width: "100%",
        padding: "2px 5px 0px 5px ",
        border: "1px solid #294B98",
        fontSize: "8px",
        fontWeight: "100",
        wordBreak: 'break-all',
        wordWrap: 'break-word',
        textOverflow: 'clip',
    },

    valueTarifa: {
        width: "50%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid #294B98",
        color: "#000000",
        fontSize: "8px",
        fontWeight: "100"
    },


    valueFour: {
        width: "25%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid #294B98",
        color: "#000000",
        fontSize: "8px",
        fontWeight: "100"
    },

    noValue: {
        width: "50%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid #294B98",
        color: "#ffffff",
        fontSize: "8px",
        fontWeight: "100",
        backgroundColor: "#294B98",

    },
    valueYellow: {
        width: "25%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        border: "0.5px solid orange",
        color: "orange",
        fontSize: "8px",
        fontWeight: "100"

    },

    valueElaborador: {
        width: "33%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        color: "#000000",
        fontSize: "8px",
        fontWeight: "100",
        textAlign: "right",
        backgroundColor: "transparent",
    },
    valueElaboradorLine: {
        width: "34%",
        height: "12px",
        padding: "2px 5px 0px 5px ",
        borderBottom: "1px solid #294B98",
        color: "#000000",
        fontSize: "8px",
        fontWeight: "100",
        textAlign: "center",
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

    viewKeyValueTwoYellow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        margin: "16px 0 0 0",
    },

    viewKeyValueElaborado: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        margin: "30px 0 0 0",
    },
 


})






const PDFView = ({ click }) => {
    const { pdfData } = useUser()

    const [isCliente, setisCliente] = useState(false);


    useEffect(() => {
        setisCliente(true)
    }, []);

    console.log(pdfData)

    return (
        <div>
            {isCliente && <PDFDownloadLink document={
                <Document>
                    <Page style={styles.body} size="A4" fixed >
                        <Text style={styles.subtitle}>MANIFESTO DE CARGA </Text>
                        <View style={styles.containerIntroItems}>
                            <View style={styles.introImg}>
                                <Image style={styles.logo} src="/logo.png" />
                            </View>
                            <View style={styles.introItems}>
                                <Text style={styles.title}>MANIFESTO DE CARGA</Text>
                            </View>
                        </View>


                        <View style={styles.items}>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>REMITENTE</Text>
                                <Text style={styles.key}>MANISFESTO DE LA CARGA</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 1"] && pdfData["MC-MANISFESTO 1"]}</Text>
                                </View>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}>NO</Text>
                                    <Text style={styles.value}></Text>
                                </View>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 1"] && pdfData["MC-MANISFESTO 1"]}</Text>
                                </View>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}>FECHA</Text>
                                    <Text style={styles.value}></Text>
                                </View>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 1"] && pdfData["MC-MANISFESTO 1"]}</Text>
                                </View>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}>OPERADOR</Text>
                                    <Text style={styles.value}></Text>
                                </View>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 1"] && pdfData["MC-MANISFESTO 1"]}</Text>
                                </View>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}>CELULAR</Text>
                                    <Text style={styles.value}></Text>
                                </View>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>CONSIGNARIO</Text>
                                <Text style={styles.key}>TRANSPORTADOR</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 9"] && pdfData["MC-MANISFESTO 9"]}</Text>
                                <Text style={styles.value}>LOGISTICS GEAR</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 11"] && pdfData["MC-MANISFESTO 11"]}</Text>
                                <Text style={styles.value}>AV. MONTENEGRO EDIFICIO QUIÑOVEL PISO 4</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 13"] && pdfData["MC-MANISFESTO 13"]}</Text>
                                <Text style={styles.value}>LA PAZ - BOLIVIA</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 15"] && pdfData["MC-MANISFESTO 15"]}</Text>
                                <Text style={styles.value}>2004717 - 76203353</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>{pdfData && pdfData["MC-MANISFESTO 15"] && pdfData["MC-MANISFESTO 15"]}</Text>
                                <Text style={styles.value}></Text>
                            </View>
                        </View>

                        <Text style={styles.subtitle}>DATOS DEL TRANSPORTISTA</Text>
                        <View style={styles.items}>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>NOMBRE</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-NOMBRE"] && pdfData["MC-NOMBRE"]}</Text>
                                <Text style={styles.value}>LICENCIA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-LICENCIA"] && pdfData["MC-LICENCIA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>CELULAR</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-CELULAR"] && pdfData["MC-CELULAR"]}</Text>
                                <Text style={styles.value}>PLACA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-PLACA"] && pdfData["MC-PLACA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>TIPO DE UNIDAD</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-TIPO DE UNIDAD"] && pdfData["MC-TIPO DE UNIDAD"]}</Text>
                                <Text style={styles.value}>COLOR</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-COLOR"] && pdfData["MC-COLOR"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>MARCA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-MARCA"] && pdfData["MC-MARCA"]}</Text>
                                <Text style={styles.value}>TRANSITO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-TRANSITO"] && pdfData["MC-TRANSITO"]}</Text>
                            </View>
                        </View>

                        <Text style={styles.subtitle}>INFORMACION DEL SERVICIO</Text>
                        <View style={styles.items}>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>MERCANCIA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-MERCANCIA"] && pdfData["MC-MERCANCIA"]}</Text>
                                <Text style={styles.value}>TIPO DE CARGA</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-TIPO DE CARGA"] && pdfData["MC-TIPO DE CARGA"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>EMPAQUE</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-EMPAQUE"] && pdfData["MC-EMPAQUE"]}</Text>
                                <Text style={styles.value}>SERVICIO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-SERVICIO"] && pdfData["MC-SERVICIO"]}</Text>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.value}>ORIGEN</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-ORIGEN"] && pdfData["MC-ORIGEN"]}</Text>
                                <Text style={styles.value}>DESTINO</Text>
                                <Text style={styles.value}>{pdfData && pdfData["MC-DESTINO"] && pdfData["MC-DESTINO"]}</Text>
                            </View>
                        </View>



                        <Text style={styles.subtitle}>DESCRIPCION DE LA CARGA</Text>
                        <View style={styles.viewKeyValue}>
                            <Text style={styles.key}>No</Text>
                            <Text style={styles.key}>ITEM</Text>
                            <Text style={styles.key}>DESCRIPCION</Text>
                            <Text style={styles.key}>MARCA</Text>
                            <Text style={styles.key}>CANTIDAD</Text>
                            <Text style={styles.key}>PESO</Text>
                            <Text style={styles.key}>VOLUMEN</Text>
                            <Text style={styles.key}>DIRECCION DE ENTREGA</Text>

                        </View>


                        {
                            pdfData && pdfData.tarifa && pdfData.tarifa.map((i, index) => {
                                return (

                                    <View style={styles.viewKeyValue} key={index}>
                                        <Text style={{...styles.value, width: '5%'}}>{pdfData && pdfData[`MC-N${index}`] && pdfData[`MC-N${index}`]}</Text>
                                        <Text style={{...styles.value, width: '5%'}}>{pdfData && pdfData[`MC-ITEM${index}`] && pdfData[`MC-ITEM${index}`]}</Text>
                                        <Text style={{...styles.value, width: '25%'}}>{pdfData && pdfData[`MC-DESCRIPCION${index}`] && pdfData[`MC-DESCRIPCION${index}`]}</Text>
                                        <Text style={{...styles.value, width: '15%'}}>{pdfData && pdfData[`MC-MARCA${index}`] && pdfData[`MC-MARCA${index}`]}</Text>
                                        <Text style={{...styles.value, width: '5%'}}>{pdfData && pdfData[`MC-CANTIDAD${index}`] && pdfData[`MC-CANTIDAD${index}`]}</Text>
                                        <Text style={{...styles.value, width: '15%'}}>{pdfData && pdfData[`MC-PESO${index}`] && pdfData[`MC-PESO${index}`]}</Text>
                                        <Text style={{...styles.value, width: '5%'}}>{pdfData && pdfData[`MC-VOLUMEN${index}`] && pdfData[`MC-VOLUMEN${index}`]}</Text>
                                        <Text style={{...styles.value, width: '25%'}}>{pdfData && pdfData[`MC-DIRECCION DE ENTREGA${index}`] && pdfData[`MC-DIRECCION DE ENTREGA${index}`]}</Text>

                                    </View>


                                )
                            })
                        }


                        <View style={styles.viewKeyValue} >
                            <Text style={styles.value}></Text>
                            <Text style={styles.value}></Text>
                            <Text style={styles.value}></Text>
                            <Text style={styles.value}></Text>
                            <Text style={styles.value}></Text>
                            <Text style={styles.value}></Text>
                            <Text style={styles.value}></Text>
                            <Text style={styles.value}></Text>

                        </View>

                        <View style={styles.items}>
                            <View style={styles.viewKeyValue}>
                                <Text style={styles.key}>DOCUMENTACION SOPORTE</Text>
                                <Text style={styles.key}>INSTRUCCIONES DEL TRANSPORTE</Text>
                            </View>

                            <View style={styles.viewKeyValue}>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.key}>FECHA</Text>
                                    <Text style={styles.key}>NUMERO</Text>
                                </View>
                                <View style={styles.containerKeyValueTwo}>
                                    <Text style={styles.value}></Text>
                                    <Text style={styles.value}></Text>
                                </View>
                            </View>
                            <View style={styles.viewKeyValueTwo}>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}></Text>
                                    <Text style={styles.value}></Text>
                                </View>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}></Text>
                                    <Text style={styles.value}></Text>
                                </View>
                            </View>
                            <View style={styles.viewKeyValue}>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}></Text>
                                    <Text style={styles.value}></Text>
                                </View>
                                <View style={styles.viewKeyValue}>
                                    <Text style={styles.value}></Text>
                                    <Text style={styles.value}></Text>
                                </View>
                            </View>






                            {
                                pdfData.incluye && pdfData.incluye.map((i, index) => {
                                    return (
                                        <View style={styles.viewKeyValue} key={index}>
                                            <View style={styles.viewKeyValue}>
                                                <Text style={styles.value}></Text>
                                                <Text style={styles.value}></Text>
                                            </View>
                                            <View style={styles.viewKeyValue}>
                                                <Text style={styles.value}></Text>
                                                <Text style={styles.value}></Text>
                                            </View>
                                        </View>

                                    )
                                })
                            }

                        </View>






                        <Text style={styles.subtitle}>OBSERVACIONES EN ORIGEN</Text>

                        <View style={styles.viewKeyValue} >
                            <Text style={styles.value}>{pdfData[`MC-INCLUYE`] && pdfData[`MC-INCLUYE`]}</Text>
                        </View>


                        <Text style={styles.subtitle}>OBSERVACIONES EN DESTINO</Text>


                        <View style={styles.viewKeyValue} >
                            <Text style={styles.value}>{pdfData[`MC-EXCLUYE`] && pdfData[`MC-EXCLUYE`]}</Text>
                        </View>

                        <View style={styles.viewKeyValue} >
                            <Text style={styles.value}>{pdfData[`MC-COMENTARIO`] && pdfData[`MC-COMENTARIO`]}</Text>
                        </View>



                        <View style={styles.viewKeyValueTwoYellow} >
                            <Text style={styles.valueElaborador}>FIRMA Y SELLO:</Text>
                            <Text style={styles.valueElaboradorLine}></Text>
                            <Text style={styles.valueElaborador}>FIRMA Y SELLO:</Text>
                            <Text style={styles.valueElaboradorLine}></Text>
                        </View>
                        <View style={styles.viewKeyValueTwo}>
                            <Text style={styles.valueElaborador}>NOMBRE:</Text>
                            <Text style={styles.valueElaboradorLine}></Text>
                            <Text style={styles.valueElaborador}>NOMBRE:</Text>
                            <Text style={styles.valueElaboradorLine}>{pdfData["MC-NOMBRE"] && pdfData["MC-NOMBRE"]}</Text>
                        </View>
                        <View style={styles.viewKeyValueTwo} >
                            <Text style={styles.valueElaborador}>FECHA:</Text>
                            <Text style={styles.valueElaboradorLine}>{getDayMonthYear()}</Text>
                            <Text style={styles.valueElaborador}>FECHA:</Text>
                            <Text style={styles.valueElaboradorLine}>{getDayMonthYear()}</Text>
                        </View>






                        <View style={styles.viewKeyValueTwoYellow} >
                            <Text style={styles.valueElaborador}></Text>
                            <Text style={styles.valueElaborador}>FIRMA Y SELLO:</Text>
                            <Text style={styles.valueElaboradorLine}></Text>
                            <Text style={styles.valueElaborador}></Text>
                        </View>
                        <View style={styles.viewKeyValueTwo}>
                            <Text style={styles.valueElaborador}></Text>
                            <Text style={styles.valueElaborador}>NOMBRE:</Text>
                            <Text style={styles.valueElaboradorLine}>Logístics Gear</Text>
                            <Text style={styles.valueElaborador}></Text>
                        </View>
                        <View style={styles.viewKeyValueTwo} >
                            <Text style={styles.valueElaborador}></Text>
                            <Text style={styles.valueElaborador}>FECHA:</Text>
                            <Text style={styles.valueElaboradorLine}>{getDayMonthYear()}</Text>
                            <Text style={styles.valueElaborador}></Text>
                        </View>




                    </Page>
                </Document>}
                fileName='Cotizacion Terrestre'>


                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={'buttonSecondary'} click={click}>pdf</Button>
                </div>
            </PDFDownloadLink>}
        </div>
    )
}


export default PDFView
