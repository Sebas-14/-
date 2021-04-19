var maximo, barra, progreso, estado, repetir, favorito, pista, 
    icono, dur, tiempo, fav, minutos=0, segundos=0,
    horas=0, duracion=0, minutos2, segundos2, horas2, 
    duracion2, r=false, maximo=346, f=false, seg=0;

var cancion,artista,caratula,sig,retro, s=false, ale;

/* variables que no van con el reproductor */
var sub, cerrar, abrir;

function elementos(){

    sub=document.getElementById('suscribete');

    icono=document.getElementById('play');
    barra=document.getElementById('barra');
    progreso=document.getElementById('progreso');
    estado=document.getElementsByClassName('max')[0];
    repetir=document.getElementsByClassName('rep')[0];
    favorito=document.getElementsByClassName('favorito')[0];

    ale=document.getElementById('aleatoreo');
    cerrar=document.getElementById('ocultar');
    abrir=document.getElementById('mostrar_repro')

    pista=document.createElement('audio');
    cancion=document.getElementById('nom_cancion');
    artista=document.getElementById('artista');
    caratula=document.getElementById('portada_cancion');

    dur=document.getElementsByClassName('dur')[0];
    tiempo=document.getElementsByClassName('pro')[0];
    fav=document.getElementById('fav');

    sig=document.getElementById('adelante');
    retro=document.getElementById('volver');
    

    estado.addEventListener('click', reproduccion,false);
    repetir.addEventListener('click', bucle, false)
    favorito.addEventListener('click', agregar, false);
    barra.addEventListener('click', posicion, false);
    barra.addEventListener('click', tim, false);

    sig.addEventListener('click', siguiente,false);
    retro.addEventListener('click',atras,false)
    ale.addEventListener('click',aleatoreo,false)
    cerrar.addEventListener('click',ocultar,false);
    abrir.addEventListener('click',mostrar,false)
    sub.addEventListener('click',suscribete,false)
    
    cargar(i);
    
    if(pista.played){
        tmer=setInterval(time,1000);
    }
        
}

let i=0;
let lista_musica=[
    {
        name: "Hazme el favor",
        path: "audio/Hazme el favor_Cover.mp3",
        img: "img/Hazme el favor.jpg",
        singer: "δεβαδ #14 | Cover",
        duration:"1:20"
    },
    {
        name: "Disculpa",
        path: "audio/Disculpa_Cover.mp3",
        img: "img/Disculpa.jpg",
        singer: "δεβαδ #14 | Cover",
        duration:"1:13"
    } 
];

function cargar(i){
    dcion();
    pista.src=lista_musica[i].path;
    cancion.innerHTML=lista_musica[i].name;
    artista.innerHTML=lista_musica[i].singer;
    caratula.src=lista_musica[i].img;
    dur.innerHTML=lista_musica[i].duration;
}

function siguiente(){
    if(i < lista_musica.length - 1){
		i += 1;
        segundos=0;
        minutos=0;
        duracion=0;
        fav.className="fas fa-heart-broken";
        fav.style.color="#fff";
		cargar(i);
		reproduccion();
	}else{
		i = 0;
        segundos=0;
        minutos=0;
        duracion=0;
        fav.className="fas fa-heart-broken";
        fav.style.color="#fff";
		cargar(i);
		reproduccion();
	}
}

function atras(){
    if(i > 0){
		i -= 1;
        segundos=0;
        minutos=0;
        duracion=0;
        fav.className="fas fa-heart-broken";
        fav.style.color="#fff";
		cargar(i);
		reproduccion();

	}else{
		i = lista_musica.length;
        segundos=0;
        minutos=0;
        duracion=0;
        fav.className="fas fa-heart-broken";
        fav.style.color="#fff";
		cargar(i);
		reproduccion();
	}
}

function reproduccion(){
    if((pista.paused==false) && (pista.ended==false)){
        pista.pause();
        icono.className="fas fa-play-circle";
    }else{
        pista.play();
        icono.className="fas fa-pause-circle";
        load=setInterval(rep,1);
    }
}

function agregar(){
    if(f==false){
        fav.className="fas fa-heart-broken";
        fav.style.color="#a50000";
        f=true;
    }else{
        fav.className="fas fa-heart-broken";
        fav.style.color="#fff";
        f=false;
    }
}

function rep(){
    if(pista.ended==false){
        var total=parseInt(pista.currentTime*maximo/pista.duration);
        progreso.style.width=total+"px";
    }
}

function bucle(){
    if(r==false){
        repetir.style.color="#53DC0D";
        r=true;
    }else{
        repetir.style.color="#fff";
        r=false;
    }
}

function aleatoreo(){
    if(s==false){
        ale.style.color="#53DC0D";
        s=true;
    }else{
        ale.style.color="#fff";
        s=false;
    }
}


function posicion(posicion){
    var raton=posicion.pageX-barra.offsetLeft;
    var nuevoTiempo=raton*pista.duration/maximo;
    pista.currentTime=nuevoTiempo;
    progreso.style.width=raton+"px";
}

function tim(posicion){
    if(pista.ended==false){
        var raton=posicion.pageX-barra.offsetLeft;
        var nuevoTiempo=raton*pista.duration/maximo;
        duracion=nuevoTiempo;
        horas=parseInt(duracion/3600);
        minutos=parseInt(duracion/60)-(horas*60);
        segundos=parseInt((duracion/60-(horas*60))*60)-(minutos*60);
        if(segundos<10){
            tiempo.innerHTML=minutos.toString()+":0"+segundos.toString();
        }else{
            tiempo.innerHTML=minutos.toString()+":"+segundos.toString();
        }
    }
}

function dcion(){
    duracion2=pista.duration;
    horas2=parseInt(duracion2/3600);
    minutos2=parseInt(duracion2/60)-(horas2*60);
    segundos2=parseInt((duracion2/60-(horas2*60))*60)-(minutos2*60);
    if(segundos2<10){
        dur.innerHTML=minutos2.toString()+":0"+segundos2.toString();
    }else{
        dur.innerHTML=minutos2.toString()+":"+segundos2.toString();
    }
}

function time(){
    seg=pista.currentTime;
    if((pista.ended==false)&&(pista.paused==false)){
        if(segundos<60) segundos++;
        if(segundos==60 && minutos<60){
            minutos++;
            segundos=0;
        }
        if(segundos<10){
            tiempo.innerHTML=minutos.toString()+":0"+segundos.toString();
        }else{
            tiempo.innerHTML=minutos.toString()+":"+segundos.toString();
        }
    }
    if(seg>=pista.duration){
        segundos=0;
        minutos=0;
        duration=0;
        tiempo.innerHTML=minutos.toString()+":0"+segundos.toString();
        progreso.style.width=0+"px";
        icono.className="fas fa-play-circle";
        if(r==true){
            pista.play();
            icono.className="fas fa-pause-circle";
        }
    }
    if(seg>=pista.duration){
        segundos=0;
        minutos=0;
        duration=0;
        tiempo.innerHTML=minutos.toString()+":0"+segundos.toString();
        progreso.style.width=0+"px";
        icono.className="fas fa-play-circle";
        if(s==true){
            fav.style.color="#fff";
            segundos=0;
            minutos=0;
            duracion=0;
            i = Math.round(Math.random()*(lista_musica.length));
            cargar(i);
            pista.play();
            icono.className="fas fa-pause-circle";
        }
    }
}


/* Funciones que no van con el reproductor */
function suscribete(){
    alert('~Aún en tu espera~');
}
function ocultar(){
    document.getElementById('container').style.display = 'none';
    document.getElementById('contenedor_reproductor').style.display = 'none';
}
function mostrar(){
    document.getElementById('container').style.display = 'block';
    document.getElementById('contenedor_reproductor').style.display = 'block';
}

window.addEventListener('load', elementos,false);