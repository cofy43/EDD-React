import React from "react";

class Nodo {
  constructor(elemento) {
    this.anterior = null;
    this.siguiente = null;
    this.elemento = elemento;
  }

  value() {
    return this.elemento;
  }
}

class Lista {
  constructor() {
    this.cabeza = new Nodo(null);
    this.cola = new Nodo(null);
    this.longitud = 0;
  }
  agrega(elemento) {
    let nodoTemp = new Nodo(elemento);
    this.longitud += 1;
    if (this.esVacia()) {
      this.cabeza = nodoTemp;
      this.cola = nodoTemp;
    } else {
      let colaTemp = this.cola;
      colaTemp.siguiente = nodoTemp;
      nodoTemp.anterior = colaTemp;
      this.cola = nodoTemp;
    }
  }

  _encuentraPrimero(elemento) {
    let temp = this.cabeza;
    while(temp !== null) {
      if (temp.value === elemento) {
        return temp;
      } else if (temp.siguiente) {
        temp = temp.siguiente;
      }
    }
    return null;
  }

  elimina(elemento) {
    let encontrado = this._encuentraPrimero(elemento);
    if (encontrado) {
      this.longitud -= 1;
      if (this.cabeza === this.cola) {
        this.cabeza = null;
        this.cola = null;
      } else if (this.cabeza === encontrado) {
        let siguiente = encontrado.siguiente;
        siguiente.anterior = null;
        this.cabeza = siguiente;
      } else if (this.cola === encontrado) {
        let anterior = encontrado.anterior;
        anterior.siguiente = null;
        this.cola = anterior;
      } else {
        let anterior = encontrado.anterior;
        let siguiente = encontrado.siguiente;
        anterior.siguiente = siguiente;
        siguiente.anterior = anterior;
      }
    }
  }

  contiene(elemento) {
    return this._encuentraPrimero(elemento) !== null;
  } 

  esVacia() {
    return this.cabeza === null;
  }

  getElementos() {
    return this.longitud;
  }

  limpia() {
    this.cabeza = null;
    this.cola = null;
  }

  toString() {
    let str = "|";
    let temp = this.cabeza;
    while(temp !== null) {
      str += temp.value + '|';
      temp = temp.siguiente;
    }
    return str;
  }

  equals(lista) {
    if (!lista) return false;
    if (lista.longitud !== this.longitud) return false;
    let nodo1 = lista.cabeza;
    let nodo2 = this.cabeza;
    while (nodo1 || nodo2) {
      if (!nodo1 || !nodo2) return false;
      else if (nodo1.value !== nodo2.value) return false;
      nodo1 = nodo1.siguiente;
      nodo2 = nodo2.siguiente;
    }
    return true;
  }

  getLongitud() {
    return this.longitud;
  }

  agregaFinal(elemento) {
    this.agrega(elemento);
  }

  agregaInicio(elemento) {
    let temp = new Nodo(elemento);
    this.longitud += 1;
    if (this.esVacia()) {
      this.cabeza = temp;
      this.cola = temp;
    } else {
      this.cabeza.anterior = temp;
      temp.siguiente = this.cabeza;
      this.cabeza = temp;
    }
  }

  eliminaPrimero() {
    if (this.esVacia()) return;
    else if (this.longitud === 1) return this.limpia();
    this.longitud -= 1;
    let siguiente = this.cabeza.siguiente;
    siguiente.anterior = null;
    this.cabeza = siguiente;    
  }

  eliminaUltimo() {
    if (this.esVacia()) return;
    else if (this.longitud === 1) return this.limpia();
    this.longitud -= 1;
    let anterior = this.cola.anterior;
    anterior.siguiente = null;
    this.cola = anterior;    
  }

  getPrimero() {
    return this.cabeza;
  }

  getUltimo() {
    return this.cola;
  }

  get(i) {
    if (i > this.longitud) return null;
    if (i === 0) return this.cabeza;
    if (i === this.longitud-1) return this.cola;
    let temp = this.cabeza;
    for (let j = 0; j === i; j++) {
      temp = temp.siguiente;
    }
    return temp;
  }

  copia() {
    let newList = new Lista();
    let temp = this.cabeza;
    while(temp !== null) {
      newList.agregaFinal(temp.value);
      temp = temp.siguiente;
    }
    return newList;
  }

  reversa() {
    let newList = new Lista();
    let temp = this.cola;
    while(temp !== null) {
      newList.agregaInicio(temp.value);
      temp = temp.anterior;
    }
    return newList;
  }

  indiceDe(elemento) {
    let index = 0;
    let temp = this.cabeza;
    while(temp !== null) {
      if (temp.value === elemento) return index;
      temp = temp.siguiente;
    }
  }
}

class List extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      lista: new Lista(),
    }    
  }

  render() {
    console.log(this.state.lista)
    return (
      <div>
        {/* <span>Longitud: {this.state.lista.longitud}</span>
        <span>Cabeza: {this.state.lista.cabeza}</span>
        <span>Cola: {this.state.lista.cola}</span> */}
        <span>Lista: {this.state.lista.toString()}</span>
      </div>      
    )
  }
}

export default List;