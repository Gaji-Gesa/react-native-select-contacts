import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MultiContacts from 'react-native-select-multi-contacts';
import Contacts from "react-native-unified-contacts"
export default function App() {
  const [result, setResult] = useState();


  const openContacts = () => {
    Contacts.userCanAccessContacts( (userCanAccessContacts) => {
    
      if (userCanAccessContacts) {
        getContacts()
      }
      else {

        Contacts.requestAccessToContacts( canUserAccessContacts => {
          if (canUserAccessContacts) {
       
            getContacts()
          }
          else {
        
            // do nothing
          }
        });
      }
    });


  }

  const getContacts = () => {
 


    Contacts.getContacts( (error, contacts) =>  {
      if (error) {
        console.error(error);
      }
      else {
        console.log(contacts);
      }
    });
  }
  useEffect(()=>{

    openContacts()

  },[])

  return (
    <MultiContacts 
    onResult={(item)=>{
      console.log(item,'ITEMMM')
    }}
    
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
