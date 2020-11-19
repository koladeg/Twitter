import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,  
    },
    number: {
        marginLeft: 5,
        color: 'grey',
        textAlign:'center'
    },
    iconContainer : {
        flexDirection: 'row',  
        alignItems:'center'
    },
})

export default styles;