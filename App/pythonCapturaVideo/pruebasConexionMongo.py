Python 2.7.13 (v2.7.13:a06454b1afa1, Dec 17 2016, 20:42:59) [MSC v.1500 32 bit (Intel)] on win32
Type "copyright", "credits" or "license()" for more information.
>>> import pymongo
>>> client = MongoClient('localhost', 3001)

Traceback (most recent call last):
  File "<pyshell#1>", line 1, in <module>
    client = MongoClient('localhost', 3001)
NameError: name 'MongoClient' is not defined
>>> client = MongoClient('localhost/meteor',3001)

Traceback (most recent call last):
  File "<pyshell#2>", line 1, in <module>
    client = MongoClient('localhost/meteor',3001)
NameError: name 'MongoClient' is not defined
>>> from pymongo import MongoClient
>>> client = MongoClient('localhost/meteor', 3001)
>>> db = client['meteor']
>>> archivos = db.ArchivosFS
>>> arch = {"info":"Prueba de insertar datos"}
>>> archId = archivos.insert_one(arch)

Traceback (most recent call last):
  File "<pyshell#8>", line 1, in <module>
    archId = archivos.insert_one(arch)
  File "C:\Python27\lib\site-packages\pymongo\collection.py", line 654, in insert_one
    with self._socket_for_writes() as sock_info:
  File "C:\Python27\lib\contextlib.py", line 17, in __enter__
    return self.gen.next()
  File "C:\Python27\lib\site-packages\pymongo\mongo_client.py", line 823, in _get_socket
    server = self._get_topology().select_server(selector)
  File "C:\Python27\lib\site-packages\pymongo\topology.py", line 214, in select_server
    address))
  File "C:\Python27\lib\site-packages\pymongo\topology.py", line 189, in select_servers
    self._error_message(selector))
ServerSelectionTimeoutError: localhost/meteor:3001: [Errno 11001] getaddrinfo failed
>>> archId

Traceback (most recent call last):
  File "<pyshell#9>", line 1, in <module>
    archId
NameError: name 'archId' is not defined
>>> archId = archivos.insert_one(arch).inserted_id

Traceback (most recent call last):
  File "<pyshell#10>", line 1, in <module>
    archId = archivos.insert_one(arch).inserted_id
  File "C:\Python27\lib\site-packages\pymongo\collection.py", line 654, in insert_one
    with self._socket_for_writes() as sock_info:
  File "C:\Python27\lib\contextlib.py", line 17, in __enter__
    return self.gen.next()
  File "C:\Python27\lib\site-packages\pymongo\mongo_client.py", line 823, in _get_socket
    server = self._get_topology().select_server(selector)
  File "C:\Python27\lib\site-packages\pymongo\topology.py", line 214, in select_server
    address))
  File "C:\Python27\lib\site-packages\pymongo\topology.py", line 189, in select_servers
    self._error_message(selector))
ServerSelectionTimeoutError: localhost/meteor:3001: [Errno 11001] getaddrinfo failed
>>> client
MongoClient(host=['localhost/meteor:3001'], document_class=dict, tz_aware=False, connect=True)
>>> arch
{'info': 'Prueba de insertar datos', '_id': ObjectId('591b6589b59dda09909b64b9')}
>>> archId

Traceback (most recent call last):
  File "<pyshell#13>", line 1, in <module>
    archId
NameError: name 'archId' is not defined
>>> archId = archivos.insert(arch)

Traceback (most recent call last):
  File "<pyshell#14>", line 1, in <module>
    archId = archivos.insert(arch)
  File "C:\Python27\lib\site-packages\pymongo\collection.py", line 2467, in insert
    with self._socket_for_writes() as sock_info:
  File "C:\Python27\lib\contextlib.py", line 17, in __enter__
    return self.gen.next()
  File "C:\Python27\lib\site-packages\pymongo\mongo_client.py", line 823, in _get_socket
    server = self._get_topology().select_server(selector)
  File "C:\Python27\lib\site-packages\pymongo\topology.py", line 214, in select_server
    address))
  File "C:\Python27\lib\site-packages\pymongo\topology.py", line 189, in select_servers
    self._error_message(selector))
ServerSelectionTimeoutError: localhost/meteor:3001: [Errno 11001] getaddrinfo failed
>>> client = MongoClient('localhost',3001)
>>> db = client['local']
>>> db
Database(MongoClient(host=['localhost:3001'], document_class=dict, tz_aware=False, connect=True), u'local')
>>> coleccion = db.ArchivosFS
>>> coleccion
Collection(Database(MongoClient(host=['localhost:3001'], document_class=dict, tz_aware=False, connect=True), u'local'), u'ArchivosFS')
>>> coleccion.insert({'info':'hola'})
ObjectId('591b6862b59dda09909b64bb')
>>> coleccion
Collection(Database(MongoClient(host=['localhost:3001'], document_class=dict, tz_aware=False, connect=True), u'local'), u'ArchivosFS')
>>> 
