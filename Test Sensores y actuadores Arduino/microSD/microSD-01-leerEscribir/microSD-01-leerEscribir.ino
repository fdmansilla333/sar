/*
  SD card read/write

 This example shows how to read and write data to and from an SD card file
 The circuit:
 * SD card attached to SPI bus as follows:
 ** MOSI - pin 11
 ** MISO - pin 12
 ** CLK - pin 13
 ** CS - pin 4

 created   Nov 2010
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe

 This example code is in the public domain.

Métodos
File.Available()  Nos indica que si hemos llegado al fin e un fichero
File.flush()  Se asegura de que se escribe en la SD todo. Algo que hace automáticamente al hacer close()
File.read() Lee un carácter del fichero abierto y avanza a la siguiente posición
File.write()  Escribe un carácter al fichero y avanza la posición
File.position() Te indica la posición donde escribirá/leerá el próximo carácter en relación al principio el fichero
File.size() Devuelve el tamaño de un fichero
File.seek(pos)  Coloca el apuntador que indica donde leerá/escribirá en la posición que le indicamos a partir del inicio y siempre que este entre 0 y File.size()
File.peek() Lee un char de la posición que marca el apuntador y no avanza
File.isDirectory()  Indica si el fichero abierto es o no un directorio

File dataFile = SD.open("data.txt", FILE_WRITE);
if (SD.exists(data.txt)
    SD.remove(“data.txt”) ;
 */

#include <SPI.h>
#include <SD.h>

File myFile;

void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }


  Serial.print("Initializing SD card...");

  if (!SD.begin(4)) {
    Serial.println("initialization failed!");
    return;
  }
  Serial.println("initialization done.");

  // open the file. note that only one file can be open at a time,
  // so you have to close this one before opening another.
  myFile = SD.open("test.txt", FILE_WRITE);

  // if the file opened okay, write to it:
  if (myFile) {
    Serial.print("Writing to test.txt...");
    myFile.println("testing 1, 2, 3.");
    // close the file:
    myFile.close();
    Serial.println("done.");
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening test.txt");
  }

  // re-open the file for reading:
  myFile = SD.open("test.txt");
  if (myFile) {
    Serial.println("test.txt:");

    // read from the file until there's nothing else in it:
    while (myFile.available()) {
      Serial.write(myFile.read());
    }
    // close the file:
    myFile.close();
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening test.txt");
  }
}

void loop() {
  // nothing happens after setup
}


