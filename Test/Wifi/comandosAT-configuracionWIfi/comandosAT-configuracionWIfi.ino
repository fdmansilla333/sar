#include <SoftwareSerial.h>
SoftwareSerial ESP(3, 2); // RX | TX
/*
Enviar comando al esp8266 y verificar la respuesta del módulo, todo esto dentro del tiempo timeout
*/
void sendData(String comando, const int timeout)
{
 long int time = millis(); // medir el tiempo actual para verificar timeout

 ESP.print(comando); // enviar el comando al ESP8266

 while( (time+timeout) > millis()) //mientras no haya timeout
 {
 while(ESP.available()) //mientras haya datos por leer
 {
 // Leer los datos disponibles
 char c = ESP.read(); // leer el siguiente caracter
 Serial.print(c);
 }
 }
 return;
}
void setup()
<<<<<<< HEAD
  {  Serial.begin(9600);
     ESP.begin(115200);
     //sendData("AT+CIPMUX=1\r\n",1000); // configurar para multiples conexiones
     //sendData("AT+CIPSERVER=1,80\r\n",1000);         // servidor en el puerto 80
     //sendData("AT+CIOBAUD=115200\r\n",2000);         // Configurando velocidad
     senData("AT+CIPSTART='UDP','192.168.4.2',52485",1000);
     sendData("AT+CIPSTATUS",1000);

=======
  {  Serial.begin(19200);
     ESP.begin(19200);
     sendData("AT+CIPMUX=1\r\n",1000); // configurar para multiples conexiones
     sendData("AT+CIPSERVER=1,80\r\n",1000);// Configurar el servidor en el puerto 80
>>>>>>> a99b507a20efb528917aa48ed8553ac8f2e7df8b
  }

void loop()
  {  String B= "." ;
     if (ESP.available())
         { char c = ESP.read() ;
           Serial.print(c);
         }
     if (Serial.available())
         {  char c = Serial.read();
            ESP.print(c);
         }
   }
