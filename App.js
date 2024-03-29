import { Pressable, StyleSheet, Text, View } from 'react-native';
import notifee, { EventType } from '@notifee/react-native'
import { useEffect } from 'react';

export default function Notifications() 
{
  async function displayNotification(title, content)
  {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    })

    await notifee.displayNotification({
      title: title,
      body: content,
      android: {
        channelId,
        actions: [
          {
            title:'Fechar',
            pressAction:{
              id:'close'
            },
          },
          {
            title:'Digite algo',
            pressAction:{
              id:'reply'
            },
            input: {
              allowFreeFormInput: false, // set to false
              choices: ['Yes', 'No', 'Maybe'],
              placeholder: 'Responda...',
            }
          }
        ]
      },
    });
  }
  useEffect(()=>{

    displayNotification('App iniciado', 'Notificacao que aparece quando o aplicativo eh iniciado')

    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ola mundo</Text>

      <Pressable 
      style={styles.button}
      onPress={()=>displayNotification('Botao pressionado','Notificacao para quando o botao eh pressionado')}>
        <Text style={styles.buttonText}>
          Notificar
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:32,
    fontWeight:'bold',
    color:'#000'
  },
  button:{
    backgroundColor:'green',
    width:'50%',
    height:60,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginTop:10
  },
  buttonText:{
    fontSize:24,
    fontWeight:'bold',
    color:'#000'
  }
})