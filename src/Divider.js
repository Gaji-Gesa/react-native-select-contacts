import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

const Divider =({header, horizontal,customStyle})=>{
    return(
        <>
           {header &&<Text style={styles.heading}>{header}</Text>}
            <View style={[horizontal?styles.dividerHorizontal:styles.dividerVertical,customStyle]}></View>
        </>
    )
}
const styles = StyleSheet.create({
    dividerVertical:{
        width:1,
        opacity:0.2,
        height:'100%',
        backgroundColor:'#979797'
        
    },
    dividerHorizontal:{
        width:'100%',
        height:0.8,
        opacity:0.2,
        backgroundColor:'#979797',        
    },
    heading: {
            fontSize:16,
            color:'#454545',
            marginTop:20,
            marginStart:25,
            marginBottom: 10
      },
})

export default Divider