int tam = 26;
struct Nodo{
  int cntfinal;
  int cnt;
  Nodo* hijos[26];
  Nodo(){
    cntfinal = 0;
    cnt = 0;
    for(int i = 0; i<tam; i++){
      hijos[i] = nullptr;
    }
  }
}

Nodo* root = new Nodo();

void insertar(const string& cad){
  Nodo* actual = root;
  for(char c:cad){
    if(actual -> hijos[c-'a']==nullptr){
      actual ->hijos[c-'a'] = new Nodo();
    }
    actual = actual->hijos[c-'a'];
    actual->cnt++;
  }
  actual->cntfinal++;
}
int buscar(const string& cad){
  Nodo* actual = root;
  for(char c:cad){
    if(actual -> hijos[c-'a']==nullptr){
      return 0;
    }
    actual  = actual->hijos[c-'a'];
  }
  return actual->cnt;
}
void eliminar(const string& cad){
  Nodo* actual = root;
  for(char c:cad){
    if(actual->hijos[c-'a'] != nullptr){
      actual = actual ->hijos[c-'a'];
      actual->cnt--;
    }
  }
  actual->cntfinal--;
  
}
