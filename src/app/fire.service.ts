import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from 'angularfire2/database';
import 'rxjs/add/operator/first';
import { ThenableReference } from '@firebase/database-types';

@Injectable()
export class FireService {
  public userInfo;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {

  }

  getNoticias():Promise<any>{
    return this.db.list('noticias', ref => ref.orderByChild('timestampInvertido')).snapshotChanges().first().toPromise()
      .then(snap => {
        return Promise.resolve(this.snapshotParaValue(snap));
      })
  }
  salvarNoticia(titulo:string, subtitulo:string, urlImagem:string, urlNoticia:string):ThenableReference{
    return this.db.list('noticias').push({titulo: titulo, subtitulo:subtitulo, urlImagem: urlImagem, urlNoticia:urlNoticia, timestamp: new Date().getTime(), timestampInvertido: -new Date().getTime()});
  }
  apagarNoticia(noticia):Promise<void>{
    return this.db.object(`noticias/${noticia.key}`).remove();
  }
  snapshotParaValue(lista: AngularFireAction<DatabaseSnapshot>[]){
    let novaLista = [];
    lista.map(objeto => {
      let novoObjeto = {};
      novoObjeto['key'] = objeto.key;
      let val = objeto.payload.val();
      Object.keys(val).map(key => {
        novoObjeto[key] = val[key]
      });
      novaLista.push(novoObjeto);
    });
    return novaLista;
  }











  //Authentication
  getUserInfoByUid(uid):Promise<any>{
    return this.db.list(`users/`, ref => ref.orderByChild('uid').equalTo(uid
    )).valueChanges().first().toPromise();
  }

  signup(email:string, password: string, nome:string):Promise<any>{
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              .then(user => {
                console.log(user);
                return this.db.list('users').push({
                  nome: nome,
                  ativo: false,
                  uid: user.uid
                }).then(info => {
                  return this.db.object(`users/${info.key}`).valueChanges().first().toPromise()
                          .then(object => {
                            console.log(object);
                            this.userInfo = object;
                            this.userInfo['key'] = info.key;
                            return Promise.resolve(true);
                          })
                })
              })
  }

  login(email:string, password: string):Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  logout():Promise<any>{
    return this.afAuth.auth.signOut()
            .then(_ => {
              this.userInfo = null;
              return Promise.resolve(true);
            })
  }
}
