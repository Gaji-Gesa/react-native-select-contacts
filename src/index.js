import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {View, Text, FlatList, Pressable, ActivityIndicator, TextInput} from 'react-native'
import Contacts from 'react-native-contacts';
import Divider from './Divider'
import RenderItem from './Item';

const data ={
  data:[]
}

const map = new Map()


const MultiContacts =({font, onResult, max=15, title1='', title2='', searchIcon
,placeholder, style1, style2, loaderColor, styleName, stylePhone})=>{



  const [refresh,setRefresh] = useState(false)
  const [longPress, setLongPress] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [timeOut,setTimeOut] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading,setLoading] = useState(false)

  const getContacts = useCallback(() => {
   

    Contacts.getAll()
    .then((contacts) => {
        // work with contacts
        data.data=contacts
        setInitialLoading(false)
        })

  
  },[])

  const selectContact = (item)=>{
 try {

  if(item.phoneNumber.length>0){
    if(map.has(item.phoneNumber)){

      map.delete(item.phoneNumber)

    }else{

      map.set(item.phoneNumber, item)
    }
  }

setRefresh(!refresh)
 } catch (error) {
   console.log(error)
 }


  }

  const searchContacts =(text)=>{

    setSearchText(text)
    !loading && setLoading(true)
    var duration = 1500;
    if(timeOut!==null){
      clearTimeout(timeOut);
    }
  
    setTimeOut(setTimeout(()=>{

      Contacts.getContactsMatchingString(text).then(contacts=>{
        data.data=contacts
        setRefresh(!refresh)
        setLoading(false)
      })

  
     
    }, duration))

    

  }

  const onPress =(item)=>{
    onResult([item])
  }

const onPressCross =()=>{
  map.clear()

  setLongPress(false)
}

const selectedContacts = useMemo(()=>map.size)

  const renderItem =({item})=>{
    return (
      <RenderItem 
      stylePhone={{...stylePhone}}
      styleName={{...styleName}}
      item={item}
      selectContact={selectContact}
      showCheckBox = {longPress}
      onSimplePress={onPress}
      onLongPress={()=>setLongPress(true)}
      maxReached={selectedContacts}
      max={max}
      isAlreadySelected={map.has(item.phoneNumbers[0]?.stringValue)}
      
      />
    )
  }

  useEffect(()=>{
    getContacts()

    return ()=>{
      if(timeOut!==null){
        clearTimeout(timeOut);
      }
      map.clear()
      data.data = []
    }
  },[])



  
 

  const keyExtractor =(item, index)=>{
    return item?.recordID ?? index.toString()
  }

  const header =()=>{
    return(
      <>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20}}>
 <TextInput 
      placeholder={placeholder}
      value={searchText}
      style={{ flex:1, paddingVertical:5}}
      onChangeText={searchContacts}

      />
      {searchIcon}
      </View>
      <Divider horizontal />
      </>
     
    )
  }

  const divider =()=>{
    return (
      <Divider horizontal  />
    )
  }

  if(initialLoading){
    return(
      <View style={{ flex:1,backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={loaderColor} />
      </View>
    )
  }

  return(
    <View style={{flex:1, backgroundColor:'white'}}>
    { longPress && <View  style={{height:40, width:'100%',justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
        <View
        
         style={{height:'100%', alignItems:'center', flexDirection:'row', marginHorizontal:10}}
        >
       
         
          <Text style={{...style1}}>{selectedContacts}/{max} {title1}</Text>
        </View>
        <Pressable
           onPress={()=>{
             let arr = []
             map.forEach(e=>arr.push(e))
             map.clear()
             data.data=[]
             onResult(arr)
           }}
         android_ripple={{color:'grey'}}
           style={{height:'100%', margin:20, justifyContent:'center', alignItems:'center'}}
          >
          <Text style={{...style2}}>{title2}</Text>
          </Pressable>
     
      <Divider horizontal customStyle={{position:'absolute', bottom:0}}  />
      </View>}
      {header()}
      { loading?   <View style={{ marginTop:70,backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={loaderColor} />
      </View>
    :  
    <FlatList

    ItemSeparatorComponent={divider}
    keyExtractor={keyExtractor} 
    maxToRenderPerBatch={20}
    data={data.data}
    initialNumToRender={20}
    renderItem={renderItem}    
    />
    }
   
    </View>
  )
}

export default MultiContacts