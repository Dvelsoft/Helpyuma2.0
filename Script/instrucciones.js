    var finishcontain,ContainerMenu,PauseContain,stage,ContainerBackground,Puntuacion,PuntosLabel,LevelContainer,EvilContainer,trashContainer,trashContainer2,trashContainer3;
    var ContainerUI,vidaLabel,life = [],objeto = [],flagLife,OverContain,tiempoBasura,ControlTiempo,nivel,Villano,WinContain,NivelLavel,level,queue,gen4BlurContainer;
    var bridgeContainer,capaRio,capaRio2,capaRio3,pauseSonido,pauseButton,flagPause,flagsonido=0,carryIns=0,vidas,VelBasura,loadingSprite,loadingContain,queueLoad;
    var Music,AllContain,startContainer,instruContainer,organico=0,inorganico=0,electrico=0,peligroso=0,n1=0,n2=0,n3=0,n4=0; 
    var InstrucText= [
    "\n\nBienvenido, \n\n Usted es el elegido para una importante\n\nmisión. Evitar que los malvados \n\ncontaminen a Yuma",
    "\n\nLea atentantemente las instrucciones \n\ndel juego y evite la contaminación de \n\nYuma",
    "\nPuede pausar y reanudar las veces que \n\nquiera. Hay 4 niveles y 4 tipos de \n\ndesechos contaminantes, los caules se \n\nclasifican en\n\nOrgánicos - Inorgánicos \n\nPeligrosos - Eléctricos", 
    "\nSolo tiene 3 oportunidades en \n\ncada nivel, así que sea cuidadoso y\n\n no deje escapar los desechos o perderá.\n\n Debe recoger los desechos que son\n\n arrojados por las personas haciendo \n\nclik sobre ellos.",
    "\n\nTiene que completar una puntuación\n\n para pasar cada nivel. \n\nNv1(500) - Nv2(800)\n\nNv3(1200) - Nv4(1500)", 
    "\n\nLos desechos segun su clasificación\n\n arrojan una puntuación\n\nOrgánicos=10 pts- Inorgánicos=20 pts\n\nEléctricos=30 pts- Peligrosos=40 pts",
    "\n\nDebe tener en cuenta que las Ramas\n\ny las Hojas que aparecen en el río,\n\n no tienen ningún tipo de puntuación",
    "\n\nBueno\n\nManos a la obra\n\nYuma lo necesita.",""
     ];
    var arrojaBasuraClock,Background,Text_Box,hoja, rama,width, height,canvas,instText,puntos=0,basuranivel,sig; 

//CARGUE DE PRIMEROS ELEMENTOS
function loadinit(){
    queueLoad = new createjs.LoadQueue();
    queueLoad.installPlugin(createjs.Sound);
    queueLoad.on("complete", FirstComplete, this);
    queueLoad.on("fileload", handleFileComplete);
    queueLoad.loadManifest([
        {id: "Loading", src:"Assets/UI/LOADING_Sprite.png"}]);
    AllContain = new createjs.Container();
}
function FirstComplete(){
   init1();
}
function init1(){
  canvas = document.getElementById("SalvemosMagdalena");
  stage = new createjs.Stage("SalvemosMagdalena");
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stage);
  loadingContain = new createjs.Container();
    width= canvas.width;
    height= canvas.height;
    startLoading();
    scaleFactor= Math.min(window.innerWidth/1000, window.innerHeight/600);
    canvas.width = 1000*scaleFactor;
    canvas.height = 600*scaleFactor;
    stage.scaleY = stage.scaleX=scaleFactor;
    stage.addChild(AllContain);
    pantalla();
}
function pantalla(){
  Background = new createjs.Bitmap(queueLoad.getResult("BackLoad"));
  AllContain.addChild(Background);
  firstLoad();
}
//LOADING DEL JUEGO
function startLoading(){
  var dataLoad = {
          images: [queueLoad.getResult("Loading")],
          frames: {width:(2433/8), height:138},
          animations: {
              stand:0,
              run:[1,4],
              jump:[6,8,"run"],
              attack:[4,8,"Attack"]
          }
      };
  var spriteSheet = new createjs.SpriteSheet(dataLoad, "Attack");
  loadingSprite = new createjs.Sprite(spriteSheet);
  loadingSprite.x=320;
  loadingSprite.y=230;
  loadingContain.addChild(loadingSprite);
  loadingSprite.gotoAndPlay();
}
//FUNCION DE INICIO
//FUNCIONES DE CARGUE DE ELEMENTOS
function firstLoad(){
      queueLoad = new createjs.LoadQueue();
      queueLoad.installPlugin(createjs.Sound);
      queueLoad.on("complete", OnFirstComplete, this);
      queueLoad.on("fileload", handleFileComplete);
      queueLoad.loadManifest([
          {id: "nover", src:"Assets/Images/FondoInicio.jpg"},
          {id: "Loading", src:"Assets/UI/LOADING_Sprite.png"},
          {id: "BackLoad", src:"Assets/Images/FondoInicio.png"},
          {id: "MusicBack", src:"Assets/Music/Vicious.mp3"},
          {id: "ButtonStart", src:"Assets/Buttons/Start.png"},
          {id: "TextBox", src:"Assets/Images/Text_Box.png"},
          {id: "ButtonArrow", src:"Assets/Buttons/Button_Arrow.png"},
          {id: "Omitir", src:"Assets/UI/Omitir.png"},
          {id: "Comenzar", src:"Assets/UI/Comenzar.png"},
          {id: "Nivel1", src:"Assets/UI/Lvl1.png"},
          {id: "Nivel2", src:"Assets/UI/Lvl2.png"},
          {id: "Nivel3", src:"Assets/UI/Lvl3.png"},
          {id: "Nivel4", src:"Assets/UI/Lvl4.png"},
          {id: "Descarga", src:"Assets/Images/download.png"},
          {id: "Manual", src:"Assets/Images/Manual.png"},
          {id: "Sonido", src:"Assets/Buttons/Sonido_ON_OFF.png"},
          {id: "Botonjugar", src: "Assets/Buttons/Boton.png"}
          ]);
      AllContain.addChild(loadingContain);
}
//Cargue de inicio
//COMPLETAR CARGUE DE ELEMENTOS
function OnFirstComplete(){
   Music = createjs.Sound.play("MusicBack",{loop: -1});
  AllContain.removeAllChildren(loadingContain);
  init();
}
//FUNCION PARA EL SONIDO
function sonido(){
      var soundContain = new createjs.Container();
      var datasonido= {
          images: [queueLoad.getResult("Sonido")],
          frames: {width:(216/2), height:92},
          animations: {
              stand:0,
              run:[1,4],
              jump:[6,8,"run"],
              attack:[4,8,"Attack"]
          }};
      var spriteSheet = new createjs.SpriteSheet(datasonido, "Attack");
      pauseSonido = new createjs.Sprite(spriteSheet);
      if(flagsonido == 0)
        pauseSonido.gotoAndStop(0);
      else
        pauseSonido.gotoAndStop(1);
      pauseSonido.y=15; 
      pauseSonido.x=920;
      pauseSonido.scaleX = 0.5;
      pauseSonido.scaleY = 0.5;  
      AllContain.addChild(pauseSonido);
      pauseSonido.addEventListener("click", function(event) {
        if(flagsonido==0){
          Music.stop();
          flagsonido++;
          pauseSonido.gotoAndStop(1);
        }
        else{
          flagsonido=0;
          Music.play();
          pauseSonido.gotoAndStop(0);
        }});
        soundContain.addChild(pauseSonido);
        AllContain.addChild(soundContain);
    }
    //CREACION DE ELEMNTOS PRINCIPALES
function init(){
    EvilContainer = new createjs.Container();
    trashContainer= new createjs.Container();
    trashContainer2= new createjs.Container();
    trashContainer3= new createjs.Container();
    LevelContainer = new createjs.Container();
    gen4BlurContainer  = new createjs.Container();
    ContainerMenu = new createjs.Container(); 
    startContainer = new createjs.Container();
    instruContainer  = new createjs.Container();
    StartScreen();
    StartIns();
}
//FUNCION DE PRECARGA DE ELEMENTOS
function preload(){
      organico=0;inorganico=0;peligroso=0;electrico=0;
      queue = new createjs.LoadQueue();
      queue.installPlugin(createjs.Sound);
      queue.on("complete", handleComplete, this);
      queue.on("fileload", handleFileComplete);
      queue.loadManifest([
          {id: "Background", src:"Assets/Images/Fondojuego.jpg"},
          {id: "Puente", src:"Assets/Images/Puente.png"},
          {id: "Logo", src:"Assets/Images/Logo.png"},
          {id: "RioCapa1", src:"Assets/Images/Magdalena_Tile_1er_Nivel.png"},
          {id: "RioCapa2", src:"Assets/Images/Magdalena_Tile_2do_Nivel.png"},
          {id: "RioCapa3", src:"Assets/Images/Magdalena_Tile_3er_Nivel.png"},
          {id: "Level", src:"Assets/Images/level.png"},
          {id: "Hearts", src:"Assets/UI/Health.png"},
          {id: "VIntenrar", src:"Assets/UI/VolveraIntentar.png"},
          {id: "SiBoton", src:"Assets/UI/Si.png"},
          {id: "NoBoton", src:"Assets/UI/No.png"},
          {id: "Ganaste", src:"Assets/UI/Ganaste.png"},
          {id: "Pausa_Cont", src:"Assets/Buttons/Pausa_Continuar.png"},
          {id: "Pausa", src:"Assets/UI/Pausa.png"},
          {id: "Villano", src:"Assets/capguy-walk.png"},
          {id: "Villano2", src:"Assets/chica.png"},
          {id: "Basura", src:"Assets/Images/Basuras.png"},
          {id: "Hoja", src:"Assets/Images/HOJA.png"},
          {id: "Rama", src:"Assets/Images/tronco.png"},
          {id: "Manzana", src:"Assets/Images/Basura_Organica.png"},
          {id: "Botella", src:"Assets/Images/Basura_Vidrios.png"},
          {id: "Pila", src: "Assets/Images/Basura_Batería.png"},
          {id: "Toxico", src: "Assets/Images/Basura_Radioactiva.png"},
          {id: "Continuar", src: "Assets/UI/Continua.png"},
          {id: "GameOver", src: "Assets/UI/gAMEoVER.png"},
          {id: "Volverinicio", src: "Assets/UI/VolveralInicio.png"},
          {id: "Volvera", src: "Assets/UI/VolveraJugar.png"}
      ]);
      AllContain.removeChild(ContainerMenu);
      AllContain.addChild(loadingContain);}
      //MUESTRA EXITO DE ELEMENTOS CARGADOS
function handleFileComplete(event) {
    console.log(event.result);
}
//FUNCIONDE LANZAMIENTO DEL JUEGO
function handleComplete() {
          AllContain.removeAllChildren(loadingContain);
          StartGame();}
//FUNCION PANEL DE INSTRUCCIONES
function StartIns(){
  var B_siguiente = new createjs.Bitmap(queueLoad.getResult("ButtonArrow"));
  var B_anterior = B_siguiente.clone(true);
  var back2 = Background.clone(true);
  Text_Box =new createjs.Bitmap(queueLoad.getResult("TextBox"));
  instText = new createjs.Text(InstrucText[0], "45pt TipoYuma", "#705135"); 
  var skip = new createjs.Bitmap(queueLoad.getResult("Omitir"));
  instText.textAlign = 'center';
  instText.textBaseline = 'middle';   
  B_anterior.x=400;
  B_anterior.y=500;
  B_anterior.rotation = 180;
  B_anterior.regX = B_anterior/2;
  B_anterior.regY = B_anterior/2; 
  var b = instText.getBounds();
  instText.x = 495; 
  instText.y = 80;
  B_siguiente.x=600;
  B_siguiente.y=450;
  Text_Box.x=120;
  Text_Box.y=40;
  skip.scaleY=0.5;
  skip.scaleX=0.5;
  skip.x = 730;
  skip.y = 500;
  skip.addEventListener("click",function(evt){
    menu();});
  B_anterior.addEventListener("click",function(evt){
    InsPrev();});
 B_siguiente.addEventListener("click",function(evt){
    InsNext();});
  instruContainer.addChild(back2);
  instruContainer.addChild(Text_Box);
  instruContainer.addChild(instText);
  instruContainer.addChild(B_anterior);
  instruContainer.addChild(B_siguiente);
  instruContainer.addChild(skip);} 
//FUNCION DE MENU DE SELECCION
function menu(){
  if(n1 == 1 && n2 == 1 && n3 == 1 && n4 == 1){
          Screenfinish();}
  else {
  AllContain.removeChild(instruContainer);
  var back3 = Background.clone(true);
  var lv1 = new createjs.Bitmap(queueLoad.getResult("Nivel1"));
  var lv2 = new createjs.Bitmap(queueLoad.getResult("Nivel2"));
  var lv3 = new createjs.Bitmap(queueLoad.getResult("Nivel3"));
  var lv4 = new createjs.Bitmap(queueLoad.getResult("Nivel4"));
  var bt1 = new createjs.Bitmap(queueLoad.getResult("Botonjugar"));
  var bt2 = bt1.clone(true);
  var bt3 = bt1.clone(true);
  var bt4 = bt1.clone(true);
  var descarga = new createjs.Bitmap(queueLoad.getResult("Descarga"));
  var manual = new createjs.Bitmap(queueLoad.getResult("Manual"));
  bt1.addEventListener("click",function(evt){
    nivel = 0;
    preload();});
  bt2.addEventListener("click",function(evt){
    nivel = 1;
    preload();});
  bt3.addEventListener("click",function(evt){
    nivel = 2;
    preload();});
  bt4.addEventListener("click",function(evt){
    nivel = 3;
    preload();});
  lv1.x = 150;lv1.y = 200;
  lv2.x = 550;lv2.y = 200;
  lv3.x = 150;lv3.y = 350;
  lv4.x = 550;lv4.y = 350;
  bt1.x = 100;bt1.y = 220;
  bt3.x = 100;bt3.y = 380;
  bt2.x = 500;bt2.y = 220;
  bt4.x = 500;bt4.y = 380;
  descarga.x = 350;descarga.y = 480;
  manual.x = 550;manual.y = 505;
  lv1.scaleX = 0.8;lv1.scaleY = 0.8;
  lv2.scaleX = 0.8;lv2.scaleY = 0.8;
  lv3.scaleX = 0.8;lv3.scaleY = 0.8;
  lv4.scaleX = 0.8;lv4.scaleY = 0.8;
  descarga.scaleX = 0.17;descarga.scaleY = 0.17;
  ContainerMenu.addChild(back3);
  ContainerMenu.addChild(lv1);
  ContainerMenu.addChild(lv2);
  ContainerMenu.addChild(lv3);
  ContainerMenu.addChild(lv4);
  ContainerMenu.addChild(bt1);
  ContainerMenu.addChild(bt2);
  ContainerMenu.addChild(bt3);
  ContainerMenu.addChild(bt4);
  ContainerMenu.addChild(descarga);
  ContainerMenu.addChild(manual);
  AllContain.addChild(ContainerMenu);
  sonido();
  manual.addEventListener("click",function(evt){
     window.open("Download/Manual.pdf","Manual","width=500, height=500");
  });
  descarga.addEventListener("click",function(evt){
    window.open("Download/Manual.pdf","Manual","width=600, height=500");
  });
}}
//CARGUE DE PANEL DE INSTRUCCIONES
function instructions(){
    AllContain.removeChild(startContainer);
    AllContain.addChild(instruContainer);
    sonido();
}
//FUNCION PARA DAR INICIO AL JUEGO
function StartGame(){
    vidas = 3;
    escenario();
    director();
    startPause();
    startLose();
    startWin();
    sonido();
  }
//FUNCION PARA REMOVER ELEMENTOS 
function director(){
    trashContainer.removeAllChildren();
    trashContainer2.removeAllChildren();
    trashContainer3.removeAllChildren();
    EvilContainer.removeAllChildren();
    LevelContainer.removeAllChildren();
    UI();
    indicaNivel();}
//FUNCION PARA INDICAR CADA NIVEL Y CARGUE DE ELEMENTOS
function indicaNivel(){
    BoxLevel = Text_Box.clone(true);
    BoxLevel.x=90;
    BoxLevel.y=30;
      if(nivel==0){
        var LabelLevel = new createjs.Bitmap(queueLoad.getResult("Nivel1"));
        var PtsLabel = new createjs.Text("Debe completar una puntuación de 500 pts\n\npara pasar el nivel. Las hojas y ramas no\n\ntienen puntuación ni son clickeables.\n\n\nLas basuras tienen una distribución de\n\npuntuación diferente.", "40pt TipoYuma", "#663333");}
      if(nivel==1){
        var LabelLevel = new createjs.Bitmap(queueLoad.getResult("Nivel2"));
        var PtsLabel = new createjs.Text("Debe completar una puntuación de 800 pts\n\npara pasar el nivel. Las hojas y ramas no\n\ntienen puntuación ni son clickeables.\n\n\nLas basuras tienen una distribución de\n\npuntuación diferente.", "40pt TipoYuma", "#663333");}
      if(nivel==2){
        var LabelLevel = new createjs.Bitmap(queueLoad.getResult("Nivel3"));
        var PtsLabel = new createjs.Text("Debe completar una puntuación de 1200 pts\n\npara pasar el nivel. Las hojas y ramas no\n\ntienen puntuación ni son clickeables.\n\n\nLas basuras tienen una distribución de\n\npuntuación diferente.", "40pt TipoYuma", "#663333");}
      if(nivel==3){
        var LabelLevel = new createjs.Bitmap(queueLoad.getResult("Nivel4"));
        var PtsLabel = new createjs.Text("Debe completar una puntuación de 1500 pts\n\npara pasar el nivel. Las hojas y ramas no\n\ntienen puntuación ni son clickeables.\n\n\nLas basuras tienen una distribución de\n\npuntuación diferente.", "40pt TipoYuma", "#663333");}
      
      var LabelStart = new createjs.Bitmap(queueLoad.getResult("Comenzar"));
      sig = new createjs.Bitmap(queueLoad.getResult("Botonjugar"));
      sig.addEventListener("click",function(evt){
        LevelContainer.removeAllChildren();
        LevelContainer.addChild(BoxLevel);
        LevelContainer.addChild(LabelStart);
        var manzana = new createjs.Bitmap(queue.getResult("Manzana"));
        var botella = new createjs.Bitmap(queue.getResult("Botella"));
        var pila = new createjs.Bitmap(queue.getResult("Pila"));
        var toxico = new createjs.Bitmap(queue.getResult("Toxico")); 
        manzana.x = 150;manzana.y = 100;
        pila.x = 160;pila.y=250;
        botella.x = 510;botella.y = 100;
        toxico.x = 480;toxico.y = 250; 
        botella.scaleX = 0.8;botella.scaleY = 0.8;
        LevelContainer.addChild(manzana);
        LevelContainer.addChild(botella);
        LevelContainer.addChild(pila);
        LevelContainer.addChild(toxico);
        for(var i =0; i<4;i++){
        objeto [i] = new createjs.Text("","55pt TipoYuma","#663333");
        if(i == 0){
          objeto [i].x = 160;objeto [i].y = 110;
          objeto [i].text = "= 10 puntos";}
        else if(i == 1){
          objeto [i].x = 160;objeto [i].y = 270;
          objeto [i].text= "= 30 puntos ";}
        else if(i == 2){
          objeto [i].x = 540;objeto [i].y = 110;
          objeto [i].text = "= 20 puntos";}
        else if(i == 3){
          objeto [i].x = 540;objeto [i].y = 270;
          objeto [i].text = "= 40 puntos";}
          LevelContainer.addChild(objeto[i]);}
      });
      LabelStart.addEventListener("click",function(event){
      GeneradorEvil();
      hoja = new createjs.Bitmap(queue.getResult("Hoja"));
      rama = new createjs.Bitmap(queue.getResult("Rama"));
      lanzaVarios();
      AllContain.removeChild(LevelContainer);
      gen4BlurContainer.uncache();
      AllContain.addChild(pauseButton);
    });
    LabelLevel.x = 280;
    LabelLevel.y = 70;
    sig.x=760;
    sig.y=480;
    LabelStart.x = 260;
    LabelStart.y = 420;
    LevelContainer.addChild(BoxLevel);
    LevelContainer.addChild(LabelLevel);
    PtsLabel.x = 160;
    PtsLabel.y = 180;
    LevelContainer.addChild(PtsLabel);
    LevelContainer.addChild(sig);
    createjs.Ticker.setPaused(false);
    gen4BlurContainer.addChildAt(EvilContainer,1);
    gen4BlurContainer.addChildAt(bridgeContainer,2);
    gen4BlurContainer.addChildAt(trashContainer,3);
    gen4BlurContainer.addChildAt(capaRio,4);
    gen4BlurContainer.addChildAt(trashContainer2,5);
    gen4BlurContainer.addChildAt(capaRio2,6);
    gen4BlurContainer.addChildAt(trashContainer3,7);
    gen4BlurContainer.addChildAt(capaRio3,8);
    AllContain.addChildAt(gen4BlurContainer,0);
    AllContain.addChildAt(ContainerUI,1);
    AllContain.addChildAt(LevelContainer,2);
  }
//FUNCION PANTALLA FINAL
function Screenfinish(){
    finishcontain = new createjs.Container();
    var back5 = Background.clone(true);
    var Boxwin = Text_Box.clone(true);
    var LabelLevel = new createjs.Text("Felicidades!", "111pt TipoYuma", "#663333");
    var LabelStart = new createjs.Text("acabas de salvar \n\nel r\u00edo Yuma \n\nde la contaminación", "57pt TipoYuma", "#705135");
    var Labeljugar = new createjs.Bitmap(queue.getResult("Volvera"));
    Boxwin.x=120;
    Boxwin.y=40;
    LabelLevel.x = 300;
    LabelLevel.y = 40;
    LabelStart.x = 500;
    LabelStart.y = 250;
    LabelStart.textAlign = 'center';
    LabelStart.textBaseline = 'middle';
    Labeljugar.x = 420;   
    Labeljugar.y = 447;
    Labeljugar.scaleX = 0.6;
    Labeljugar.scaleY = 0.6;
    Labeljugar.addEventListener("click",function(event){
      n1=0;n2=0;n3=0;n4=0;
      nivel==0;
      AllContain.removeChild(finishcontain);
      StartScreen();
    });
    finishcontain.addChild(back5);
    finishcontain.addChild(Boxwin);
    finishcontain.addChild(Labeljugar);
    finishcontain.addChild(LabelStart);
    finishcontain.addChild(LabelLevel);
    AllContain.addChild(finishcontain);
    sonido();
  }

//FUNCION PARA ESTABLECER LOS ELEMENTOS DEL ESCENARIO DE JUEGO
function escenario(){
      ContainerBackground = new createjs.Container();
      bridgeContainer = new createjs.Container();
      var bitmap = new createjs.Bitmap(queue.getResult("Background"));
      var bridge = new createjs.Bitmap(queue.getResult("Puente"));
      var logo = new createjs.Bitmap(queue.getResult("Logo"));
      capaRio = new createjs.Container();
      capaRio2 = new createjs.Container();
      capaRio3 = new createjs.Container();
      var capa1rio1 = new createjs.Bitmap(queue.getResult("RioCapa1"));
      capa1rio1.x = 0;
      capa1rio1.y = 470;
      var capa1rio2 = capa1rio1.clone(true);
      capa1rio2.x = -999;
      capa1rio2.y = 470;
      var capa2rio1 = new createjs.Bitmap(queue.getResult("RioCapa2"));
      capa2rio1.x = 0;
      capa2rio1.y = 530;
      var capa2rio2 = capa2rio1.clone(true);
      capa2rio2.x = -999;
      capa2rio2.y = 530;
      var capa3rio1 = new createjs.Bitmap(queue.getResult("RioCapa3"));
      capa3rio1.x = 0;
      capa3rio1.y = 580;
      var capa3rio2 =  capa3rio1.clone(true);
      capa3rio2.x = -999;
      capa3rio2.y = 580;
      bitmap.x = 0;
      bitmap.y = 0;
      bridge.y=150;
      bridge.scaleY=0.8;
      logo.x = 700;      
      logo.y = 20;
      ContainerBackground.addChild(bitmap);
      bridgeContainer.addChild(bridge);
      bridgeContainer.addChild(logo);       
      capaRio.addChild(capa1rio1,capa1rio2);
      capaRio2.addChild(capa2rio1,capa2rio2);
      capaRio3.addChild(capa3rio1,capa3rio2);
      gen4BlurContainer.addChildAt(ContainerBackground,0);
      AllContain.name="full";
      var bFull = AllContain.getBounds();
      createjs.Tween.get(capaRio, { loop: true }).to({x: canvas.width }, 20000, createjs.Ease.linear);
      createjs.Tween.get(capaRio2, { loop: true }).to({x: canvas.width }, 15000, createjs.Ease.linear);
      createjs.Tween.get(capaRio3, { loop: true }).to({x: canvas.width }, 10000, createjs.Ease.linear);}
    //FUNCION PARA ELEMENTOS INTERACTIVOS 
  function UI(){
      PuntosLabel = new createjs.Text("0000", "36px TipoYuma", "#663333");
      NivelLavel = new createjs.Text("", "36px TipoYuma", "#663333");     
      level = new createjs.Bitmap(queue.getResult("Level")); 
      level.x = 10;
      level.y = 520;
      level.scaleX = 0.5;
      level.scaleY = 0.5;         
      PuntosLabel.x = 500;
      PuntosLabel.y = 20;
      NivelLavel.x = 35;      
      NivelLavel.y = 530;     
      Puntuacion=0;
      if(nivel==0)
        NivelLavel.text = "Nv 1";
      if(nivel==1)
        NivelLavel.text = "Nv 2";
      if(nivel == 2)
        NivelLavel.text = "Nv 3";
      if(nivel == 3)
        NivelLavel.text = "Nv 4";        
      var dataLife = {
          images: [queue.getResult("Hearts")],
          frames: {width:(98/2), height:45},
          animations: {
              stand:0,
              run:[1,4],
              jump:[6,8,"run"],
              attack:[4,8,"Attack"]
          }};
      var spriteSheet = new createjs.SpriteSheet(dataLife, "Attack");
      ContainerUI = new createjs.Container();
      for(var i =0; i<vidas;i++){
        life [i]= new createjs.Sprite(spriteSheet);
        life[i].x=(i*50)+10;        
        life[i].y=20;
        ContainerUI.addChild(life[i]);}
        console.log("Life"+flagLife);
      flagLife = vidas-1; 
        console.log("Life"+flagLife);
      ContainerUI.addChild(PuntosLabel);    
      ContainerUI.addChild(level);          
      ContainerUI.addChild(NivelLavel);}
      //FUNCION PANEL DE PERDISTE
function startLose(){
      OverContain= new createjs.Container();
      var over = new createjs.Bitmap(queue.getResult("VIntenrar"));
      over.y=70;
      over.x=120;
      var si =  new createjs.Bitmap(queue.getResult("SiBoton"));
      si.y=350;
      si.x=300;
      var no =  new createjs.Bitmap(queue.getResult("NoBoton"));
      no.y=350;
      no.x=500;
      OverContain.addChild(over);
      OverContain.addChild(si);
      OverContain.addChild(no);
      si.addEventListener("click",function(){
        AllContain.removeChild(OverContain);
        capaRio.x = capaRio2.x= capaRio3.x =0;
        createjs.Tween.get(capaRio, { loop: true }).to({x: 1000 }, 20000, createjs.Ease.linear);
        createjs.Tween.get(capaRio2, { loop: true }).to({x: 1000 }, 15000, createjs.Ease.linear);
        createjs.Tween.get(capaRio3, { loop: true }).to({x: 1000 }, 10000, createjs.Ease.linear);
        clear();
        destruction();
        preload();
      });
      no.addEventListener("click",function(){
        clear();
        destruction();
        OverContain.removeAllChildren();
        gameoverno();
      });}
//FUNCION PARA QUITAR ELEMENTOS DE CONTENEDORES
function destruction(){
    trashContainer.removeAllChildren();
    trashContainer2.removeAllChildren();
    trashContainer3.removeAllChildren();
    EvilContainer.removeAllChildren();
    bridgeContainer.removeAllChildren();
    gen4BlurContainer.removeAllChildren();
    AllContain.removeAllChildren();
    stage.removeChild();
}
//FUNCION PARA PANEL PRINCIPAL
function StartScreen(){
  Background = new createjs.Bitmap(queueLoad.getResult("BackLoad"));
  var ButtonStart = new createjs.Bitmap(queueLoad.getResult("ButtonStart"));
  ButtonStart.addEventListener("click",function(evt){
    instructions();
    });
  var b = ButtonStart.getBounds();
  ButtonStart.x = 350; 
  ButtonStart.y = 400;
  startContainer.addChild(Background);
  startContainer.addChild(ButtonStart);
  AllContain.addChild(startContainer);
  sonido();
}
//FUNCION PARA RECARGAR EL PANEL DEL JUEGO AL GANAR
function startWin(){
      WinContain = new createjs.Container();
      var textwin = Text_Box.clone(true);
      var win = new createjs.Bitmap(queue.getResult("Ganaste"));
      var continuar = new createjs.Bitmap(queue.getResult("Continuar"));
      var tw = new createjs.Text("DESECHOS RECOLECTADOS","55pt TipoYuma","#663333");
      var manzana = new createjs.Bitmap(queue.getResult("Manzana"));
      var botella = new createjs.Bitmap(queue.getResult("Botella"));
      var pila = new createjs.Bitmap(queue.getResult("Pila"));
      var toxico = new createjs.Bitmap(queue.getResult("Toxico"));      
      textwin.x = 90;textwin.y = 30;
      win.y=70;win.x=280;
      win.scaleX = 0.6;win.scaleY = 0.6;
      tw.x = 260;tw.y = 140;
      manzana.x = 260;manzana.y = 220;
      pila.x = 270;pila.y=350;
      botella.x = 530;botella.y = 220;
      toxico.x = 500;toxico.y = 350; 
      botella.scaleX = 0.8;botella.scaleY = 0.8;
      continuar.x = 350;continuar.y = 480;
      continuar.scaleX=0.4;continuar.scaleY=0.4;   
      WinContain.addChild(textwin);
      WinContain.addChild(win);
      WinContain.addChild(tw);
      WinContain.addChild(manzana);
      WinContain.addChild(pila);
      WinContain.addChild(botella);
      WinContain.addChild(toxico);
      WinContain.addChild(continuar);
      continuar.addEventListener("click",function(){
        destruction();
        clear();
        AllContain.removeChild(WinContain);
        organico=0;inorganico=0;peligroso=0;electrico=0;
        capaRio.x = capaRio2.x= capaRio3.x =0;
        createjs.Tween.get(capaRio, { loop: true }).to({x: 1000 }, 20000, createjs.Ease.linear);
        createjs.Tween.get(capaRio2, { loop: true }).to({x: 1000 }, 15000, createjs.Ease.linear);
        createjs.Tween.get(capaRio3, { loop: true }).to({x: 1000 }, 10000, createjs.Ease.linear);
        menu();
        });
      for(var i =0; i<4;i++){
        objeto [i] = new createjs.Text("","55pt TipoYuma","#663333");
        if(i == 0){
          objeto [i].x = 340;objeto [i].y = 240;
          objeto [i].text = "X "+organico;}
        else if(i == 1){
          objeto [i].x = 340;objeto [i].y = 370;
          objeto [i].text= "X "+inorganico;}
        else if(i == 2){
          objeto [i].x = 600;objeto [i].y = 240;
          objeto [i].text = "X "+electrico;}
        else if(i == 3){
          objeto [i].x = 600;objeto [i].y = 370;
          objeto [i].text = "X "+peligroso;}
        WinContain.addChild(objeto[i]);}}
//FUNCIONES PARA PAUSAR EL JUEGO
function startPause(){
     flagPause=0;
      var dataPause= {
          images: [queue.getResult("Pausa_Cont")],
          frames: {width:(68/2), height:43},
          animations: {
              stand:0,
              run:[1,4],
              jump:[6,8,"run"],
              attack:[4,8,"Attack"]
          }};
      var spriteSheet = new createjs.SpriteSheet(dataPause, "Attack");
      pauseButton = new createjs.Sprite(spriteSheet);
      pauseButton.gotoAndStop(1);
      pauseButton.y=540; 
      pauseButton.x=950;  
      AllContain.addChild(pauseButton);
      pauseButton.addEventListener("click", function(event) {
        if(flagPause==0)
        pauser(); 
        else
          closePauser();});
      var pauseImg = new createjs.Bitmap(queue.getResult("Pausa"));
      pauseImg.x=180;  
      pauseImg.y=180;
      pauseImg.addEventListener("click",function (event){closePauser();});
      PauseContain = new createjs.Container();
      PauseContain.addChildAt(pauseImg);}
//ACCIONES DE PAUSA
function pauser(){
    createjs.Ticker.setPaused(true);
    clearInterval(ControlTiempo);
    pauseButton.gotoAndStop(0);
    AllContain.addChildAt(PauseContain,3);
    flagPause=1;
    blur();}
//FUNCION PARA REANUDAR EL JUEGO
function closePauser(){
    ControlTiempo = setInterval(Evil, tiempoBasura);
    AllContain.removeChild(PauseContain);
    pauseButton.gotoAndStop(1);
    createjs.Ticker.setPaused(false);
    flagPause=0;
    unblur();}
//FUNCION PARA PASAR INSTRUCCIONES
function InsNext(){
    if(carryIns>=0&&carryIns<InstrucText.length){
      instText.text = InstrucText[carryIns];
      carryIns++;}
    if(carryIns>= InstrucText.length){
      carryIns=InstrucText.length-1;
      menu();}}
//FUNCION PARA RETROCEDER INSTRUCCIONES
function InsPrev(){
    if(carryIns>=0&&carryIns<InstrucText.length){
      if(carryIns==InstrucText.length-1){}
      carryIns--;
      if(carryIns>=0)
      instText.text = InstrucText[carryIns];}
    if(carryIns<0){
      carryIns=0;}}
//FUNCION PARA DETERMINAR TIEMPO DE GENERAR VILLANO
function GeneradorEvil(){
    if (nivel == 0)
      tiempoBasura = 2300;
    if (nivel == 1)
      tiempoBasura = 2000;
    if(nivel == 2)
      tiempoBasura = 1700;
    if(nivel == 3)
      tiempoBasura = 1500;    
    ControlTiempo = setInterval(Evil, tiempoBasura);}  
//FUNCION GENERADORA DE ACCIONES DEL VILLANO
function Evil(){
    var dataEvil = {
          images: [queue.getResult("Villano")],
          frames: {width:(600/8), height:132},
          animations: {
              stand:0,
              run:[1,4],
              jump:[6,8,"run"],
              attack:[4,8,"Attack"]}};
    var dataEvil2 = {
        images: [queue.getResult("Villano2")],
        frames: {width:(1536/6),height:256},
        animations: {
            stand:0,
            run:[1,4],
            jump:[6,8,"run"],
            attack:[4,8,"Attack"]}};
      var spriteSheet = new createjs.SpriteSheet(dataEvil, "Attack");
      var spriteSheet2 = new createjs.SpriteSheet(dataEvil2, "Attack");
      Villano = new createjs.Sprite(spriteSheet);
      Villano.play();
      Villano.scaleX=0.8;
      Villano.scaleY=0.8;
      Villano.x = -100;
      Villano.y= 100;
      Villano2 = new createjs.Sprite(spriteSheet2);
      Villano2.play();
      Villano2.scaleX=0.4;
      Villano2.scaleY=0.4;
      Villano2.x = -100;
      Villano2.y= 100;
    
    var randomDirection = Math.floor((Math.random() * 2));
    if(randomDirection==0){
      Villano.x = -100;
      createjs.Tween.get(Villano, { loop: false }).to({ x: 1000 }, 7000, createjs.Ease.linear);
      arrojaBasuraClock = setTimeout(Basura,1000);}
    if(randomDirection==1){
      Villano.scaleX=-1;
      Villano.x = 1200;
      createjs.Tween.get(Villano, { loop: false }).to({ x: 0 }, 7000, createjs.Ease.linear);
      arrojaBasuraClock = setTimeout(Basura,6000);}
    
    var randomDirection2 = Math.floor((Math.random()*2));
    if(randomDirection2==0){
    Villano2.x = -100;
    createjs.Tween.get(Villano2, { loop: false}).to({ x: 1500}, 7000, createjs.Ease.linear);
    }
    if(randomDirection2==1){
      Villano2.x = 1200;
      Villano2.scaleX=-0.4;
      Villano2.scaleY=0.4;
      createjs.Tween.get(Villano2, { loop: false }).to({ x: -500 }, 7000, createjs.Ease.linear);}
    createjs.Ticker.setFPS(10);
    EvilContainer.addChild(Villano);
    EvilContainer.addChild(Villano2);}
//FUNCION PARA LA PUNTUACION 
function SumaPuntos(){
    Puntuacion += puntos;
    PuntosLabel.text = Puntuacion;
    if(nivel == 0 && Puntuacion >= 500){
      ganaste();
      n1=1;
      AllContain.removeChild(pauseButton);}
    if(nivel == 1 && Puntuacion >= 800){
      ganaste();
      n2=1;
      AllContain.removeChild(pauseButton);}
    if(nivel == 2 && Puntuacion >= 1200){
      ganaste();
      n3=1;
      AllContain.removeChild(pauseButton);}
    if(nivel == 3 && Puntuacion >= 1500){
      ganaste();
      n4=1;
      AllContain.removeChild(pauseButton); }}
//FUNCION PARA OPACAR PANTALLA
function blur(){
  var blurFilter = new createjs.BlurFilter(5, 5, 1);
  gen4BlurContainer.filters=[blurFilter];
  var bounds = gen4BlurContainer.getBounds();
  gen4BlurContainer.cache(bounds.x, bounds.y, bounds.width, bounds.height);}
//FUNCION PARA DESOPACAR PANTALLA
function unblur(){
  gen4BlurContainer.uncache();}
//FUNCION PARA QUITAR ELEMENTOS Y ACCIONES
function clear(){
    clearInterval(ControlTiempo);
    clearTimeout(arrojaBasuraClock);
    clearInterval(controlHojas);
    createjs.Tween.removeAllTweens();
    trashContainer.removeAllChildren();
    trashContainer2.removeAllChildren();
    trashContainer3.removeAllChildren();
    EvilContainer.removeAllChildren();
    LevelContainer.removeAllChildren();
    ContainerUI.removeAllChildren();
    AllContain.removeChild(trashContainer);
    AllContain.removeChild(trashContainer2);
    AllContain.removeChild(trashContainer3);
    AllContain.removeChildAt(1);//capa villano
    AllContain.removeChildAt(3);//capa basura
    AllContain.removeChildAt(4);//capa vida
    AllContain.removeChildAt(5);//capa puntaje
    AllContain.removeChildAt(7);
    vidas = 3;
}
//FUNCION PARA MOSTRAR PANEL DE GANAR
function ganaste(){
    blur();
    clear();
    startWin();
    AllContain.addChild(WinContain);}
//FUNCION PARA MOSTRAR PANEL DE PERDER
function gameover(){
    blur();
    clear();
    AllContain.addChild(OverContain);}
//FUNCION GAMEOVER BOTON NO 
function gameoverno(){
  OverContain= new createjs.Container();
  var back4 = new createjs.Bitmap(queueLoad.getResult("nover"));
  var fin = new createjs.Bitmap(queue.getResult("GameOver"));
  var ini = new createjs.Bitmap(queue.getResult("Volverinicio"));
  fin.x = 200;
  fin.y = 200;
  fin.scaleX = 0.8;
  fin.scaleY = 0.8;
  ini.x = 600;
  ini.y = 470;
  OverContain.addChild(back4);
  OverContain.addChild(fin);
  OverContain.addChild(ini);
  AllContain.addChild(OverContain);
  sonido();
  ini.addEventListener("click", function(event){
    AllContain.removeChild(OverContain);
    StartScreen();
  });}
//FUNCION PARA ARROJAR BASURA   
function Basura(){
        if(nivel == 0){
          VelBasura = 7000;}
        if(nivel == 1){
          VelBasura = 6000;}
        if(nivel == 2){
          VelBasura = 5000;}
        if(nivel == 3){
          VelBasura = 4000;}
        var tipoBolsa,anchoSprite,altoSprite,framesSprite;
        tipoBolsa=queue.getResult("Basura");
        anchoSprite =364;
        altoSprite = 123;
        framesSprite = 4;
        var data = {
          images: [tipoBolsa],
          frames: {width:(anchoSprite/framesSprite), height:altoSprite},
          animations: {
              stand:0,
              run:[1,24],
              jump:[6,8,"run"]}};
        var spriteSheet = new createjs.SpriteSheet(data, "run");
        var animate = new createjs.Sprite(spriteSheet);
        var basuranivel = Math.floor((Math.random() * 4));
        animate.gotoAndStop(basuranivel);
        createjs.Ticker.setFPS(10);
        animate.scaleX=0.8;
        animate.rotation = 10;
        var currentTween = animate.scaleY=0.8;
        var randomLayout =Math.floor((Math.random() * 3));
        if(randomLayout == 0){
          trashContainer.addChild(animate);
          createjs.Tween.get(animate, { loop: false }).to({y: 410}, 1200, createjs.Ease.linear).to({x: 1020 }, VelBasura, createjs.Ease.linear).call(Health);
          animate.addEventListener("click",function(event){
          trashContainer.removeChild(event.target);
          createjs.Tween.removeTweens(animate);
          if(basuranivel == 0){
            puntos = 10;
            organico+=1;}
          else if(basuranivel == 1){
            puntos = 20;
            inorganico+=1;}
          else if(basuranivel == 2){
            puntos = 30;
            electrico+=1;}
          else if(basuranivel == 3){
            puntos = 40;
            peligroso+=1;}
          SumaPuntos();});}
       else if(randomLayout == 1){
          trashContainer2.addChild(animate);
          createjs.Tween.get(animate, { loop: false }).to({y: 480}, 1200, createjs.Ease.linear).to({x: 1020 }, VelBasura, createjs.Ease.linear).call(Health);
          animate.addEventListener("click",function(event){
          trashContainer2.removeChild(event.target);
          createjs.Tween.removeTweens(animate);
          if(basuranivel == 0){
            puntos = 10;
            organico +=1;}
          else if(basuranivel == 1){
            puntos = 20;
            inorganico+=1;}
          else if(basuranivel == 2){
            puntos = 30;
            electrico+=1;}
          else if(basuranivel == 3){
            puntos = 40;
            peligroso+=1;}
          SumaPuntos();});}
        else if(randomLayout == 2){
          trashContainer3.addChild(animate);
          createjs.Tween.get(animate, { loop: false }).to({y: 520}, 1200, createjs.Ease.linear).to({x: 1020 }, VelBasura, createjs.Ease.linear).call(Health);   
            animate.addEventListener("click",function(event){
              trashContainer3.removeChild(event.target);
              createjs.Tween.removeTweens(animate);
               if(basuranivel == 0){
            puntos = 10;
            organico+=1;}
          else if(basuranivel == 1){
            puntos = 20;
            inorganico+=1;}
          else if(basuranivel == 2){
            puntos = 30;
            electrico+=1;}
          else if(basuranivel == 3){
            puntos = 40;
            peligroso+=1;}
              SumaPuntos();});}}
//FUNCION PARA VALIDAR VIDA
function Health(){
  vidas -= 1;
  if(vidas <= 0){
    gameover();
  }
  else{perdervida();}} 
//FUNCION PARA QUITAR VIDA     
function perdervida(){
  console.log("Life1"+flagLife);
  life[flagLife].gotoAndStop(1);
  flagLife--;
  console.log("Life1"+flagLife);}
//FUNCION PARA TIEMPO HOJAS Y RAMAS
function lanzaVarios(){
controlHojas = setInterval(VariosElementos, 4000);
}
//FUNCION PARA HOJAS Y RAMAS
function VariosElementos(){
var Elemento;
        var randomVarios = Math.floor((Math.random() * 2));
        if(randomVarios == 0){
            Elemento = hoja.clone(true);
            Elemento.scaleX = 2.3;
            Elemento.scaleY = 2.3;}
        else if(randomVarios == 1)
            Elemento = rama.clone(true);
        randomVarios = Math.floor((Math.random()*3));
        if(randomVarios == 0)
        Elemento.y= 440;
        else if(randomVarios == 1)
        Elemento.y= 510;
        else if(randomVarios == 2)
        Elemento.y= 540;
        Elemento.x= -100;
        createjs.Tween.get(Elemento, { loop: false }).to({x:1020}, 12000, createjs.Ease.linear);
        if(randomVarios == 0)
        trashContainer.addChild(Elemento);
        else if(randomVarios == 1)
        trashContainer2.addChild(Elemento);
        else if(randomVarios == 2)
        trashContainer3.addChild(Elemento);}