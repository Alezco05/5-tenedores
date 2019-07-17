export default menuItems = [
    {
    title: "Cambiar Nombre",
    iconType: "material-community",
    iconNameLeft: "account-circle",
    iconNameRight: "chevron-right",
    color: "#ccc",
    onPress: () => openOverlay("Nombre",updateUserDisplayName)
}, 
{
    title: "Cambiar Apellido",
    iconType: "material-community",
    iconNameLeft: "account",
    iconNameRight: "chevron-right",
    color: "#ccc",
    onPress: () => console.log("Haz realizado click en cambiar Apellidos")
},
{
    title: "Cambiar Email",
    iconType: "material-community",
    iconNameLeft: "at",
    iconNameRight: "chevron-right",
    color: "#ccc",
    onPress: () => console.log("Haz realizado click en cambiar Email")
},
{
    title: "Cambiar Contraseña",
    iconType: "material-community",
    iconNameLeft: "lock-reset",
    iconNameRight: "chevron-right",
    color: "#ccc",
    onPress: () => console.log("Haz realizado click en cambiar Contraseña")
}
]
