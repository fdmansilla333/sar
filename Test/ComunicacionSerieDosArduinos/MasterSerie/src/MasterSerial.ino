#include <SoftwareSerial.h>

SoftwareSerial mySerie(10,11); //TX RX

void setup(){
  Serial.begin(9600);
  Serial.println("Master Iniciado");
  mySerie.begin(1000000); //1 mbaudio
}
bool inicioImagen(SoftwareSerial serial){
  char comandos[] = "*RDY*";
  bool esCodigo = true;
  int i = 0;
  while (i <= 4){
    char valor = serial.read();
    if (valor == comandos[i]){
      i++;
    }else{
      esCodigo = false;
      break;
    }
  }
  return esCodigo;
}

long contador=0;
int imagenes =0;
void loop(){
  if (mySerie.available()){
    if (inicioImagen(mySerie)){
      Serial.println("Total contador:"+String(contador));
      imagenes++;
      Serial.println("Inicio de imagen, cantidad de imagenes:"+String(imagenes));
      contador = 0;
    }else{
      contador++;
    }
  }
}
