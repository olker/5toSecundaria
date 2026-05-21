    function entrarAlSitio() {
      document.getElementById('pantalla-bienvenida').style.display = 'none';
      document.getElementById('main-layout').style.display = 'flex';
    }

    function abrirEditor() {
      document.getElementById('main-layout').style.display = 'none';
      document.getElementById('editor-pantalla').style.display = 'flex';
      cargarProyectoGuardado();
    }

    function cerrarEditor() {
      if(confirm("¿Salir del editor? Los cambios no guardados se perderán.")) {
        document.getElementById('editor-pantalla').style.display = 'none';
        document.getElementById('main-layout').style.display = 'flex';
      }
    }

    
    const btnCartas = document.getElementById('btnCartas');
    const btnFichas = document.getElementById('btnFichas');
    const secCartas = document.getElementById('historial-cartas');
    const secFichas = document.getElementById('historial-fichas');

    btnCartas.addEventListener('click', function(e) {
      e.preventDefault();
      if (secCartas.classList.contains('activa')) {
        secCartas.classList.remove('activa');
      } else {
        secCartas.classList.add('activa');
        secFichas.classList.remove('activa');
      }
    });

    btnFichas.addEventListener('click', function(e) {
      e.preventDefault();
      if (secFichas.classList.contains('activa')) {
        secFichas.classList.remove('activa');
      } else {
        secFichas.classList.add('activa');
        secCartas.classList.remove('activa');
      }
    });

    
    const canvas = document.getElementById('canvas');
    let elementoSeleccionado = null;
    let offsetX = 0;
    let offsetY = 0;
    let menu = null;
    let btnBorrar = null;
    let btnAjustar = null;

 
function agregarTexto(){

const nuevoDiv = document.createElement('div');

nuevoDiv.className='editable-item';

nuevoDiv.style.top='150px';

nuevoDiv.style.left='150px';

const texto = document.createElement('div');

texto.className='editable-text';

texto.contentEditable=true;

texto.innerHTML='Doble click para escribir';

texto.addEventListener('dblclick', ()=>{

textoSeleccionado = texto;

texto.contentEditable = true;

texto.focus();

/* ABRIR MODAL */
document.getElementById(
'editor-texto-modal'
).style.display='block';

});


const resizeHandle = document.createElement('div');

resizeHandle.className='resize-handle';

nuevoDiv.appendChild(texto);

nuevoDiv.appendChild(resizeHandle);

canvas.appendChild(nuevoDiv);

hacerArrastrable(nuevoDiv);

}
/* =========================
MENU CLICK DERECHO
========================= */

document.getElementById('menu-borrar').onclick=function(){

if(elementoSeleccionado){

elementoSeleccionado.remove();

}

document.getElementById('custom-context-menu').style.display='none';

};

document.getElementById('menu-ajustar').onclick=function(){

if(!elementoSeleccionado) return;

const ancho=prompt(
'Nuevo ancho',
elementoSeleccionado.offsetWidth
);

const alto=prompt(
'Nuevo alto',
elementoSeleccionado.offsetHeight
);

if(ancho){

elementoSeleccionado.style.width=ancho+'px';

}

if(alto){

elementoSeleccionado.style.height=alto+'px';

}

};

document.getElementById('menu-editor-texto').onclick=function(){

if(!elementoSeleccionado) return;

textoSeleccionado=
elementoSeleccionado.querySelector('.editable-text');

if(!textoSeleccionado){

alert('Este elemento no es texto');

return;

}

document.getElementById('editor-texto-modal').style.display='block';

document.getElementById('custom-context-menu').style.display='none';

};

/* =========================
CERRAR MODAL
========================= */

function cerrarEditorTexto(){
  function cerrarEditorTexto(){
    function aplicarCambiosTexto(){

if(!textoSeleccionado) return;

const color =
document.getElementById(
'texto-color'
).value;

const font =
document.getElementById(
'texto-font'
).value;

const size =
document.getElementById(
'texto-size'
).value;

const deco =
document.getElementById(
'texto-deco'
).value;

/* COLOR */
textoSeleccionado.style.color=color;

/* FUENTE */
textoSeleccionado.style.fontFamily=font;

/* TAMAÑO */
textoSeleccionado.style.fontSize=size+'px';

/* RESETEAR */
textoSeleccionado.style.fontWeight='normal';

textoSeleccionado.style.fontStyle='normal';

textoSeleccionado.style.textDecoration='none';

/* DECORACIONES */

if(deco==='bold'){

textoSeleccionado.style.fontWeight='bold';

}

if(deco==='italic'){

textoSeleccionado.style.fontStyle='italic';

}

if(deco==='underline'){

textoSeleccionado.style.textDecoration='underline';

}

}

document.getElementById(
'editor-texto-modal'
).style.display='none';

}

document.getElementById(
'editor-texto-modal'
).style.display='none';

}

    
    function agregarImagen() {
      const url = prompt("Pega la URL de la imagen (ej. https://via.placeholder.com/200):");
      if (!url) return;

      const nuevoDiv = document.createElement('div');
      nuevoDiv.className = 'editable-item';
      nuevoDiv.style.top = '200px';
      nuevoDiv.style.left = '200px';
      nuevoDiv.style.width = '200px';

      const img = document.createElement('img');
      img.src = url;
      img.className = 'editable-img';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.pointerEvents = 'none';
      
      const resizeHandle = document.createElement('div');
      resizeHandle.className = 'resize-handle';

      nuevoDiv.appendChild(img);
      nuevoDiv.appendChild(resizeHandle);
      canvas.appendChild(nuevoDiv);
      
      hacerArrastrable(nuevoDiv);
    }

    
    function hacerArrastrable(elmnt) {
   
      elmnt.onmousedown = null;
      elmnt.oncontextmenu = null;
      elmnt.ondblclick = null;

    
      elmnt.oncontextmenu = function(e) {
        e.preventDefault(); 
        
      
        const menu = document.getElementById('custom-context-menu');
        const btnBorrar = document.getElementById('menu-borrar');
        const btnAjustar = document.getElementById('menu-ajustar');

        if (!menu) return; 
        
        menu.style.display = 'none';

       
        const esImagen = elmnt.querySelector('img');
        if (esImagen) {
          btnAjustar.style.display = 'block';
        } else {
          btnAjustar.style.display = 'none';
        }

       
        const x = e.clientX;
        const y = e.clientY;
        
       
        const maxX = window.innerWidth - 160;
        const maxY = window.innerHeight - 120;
        
        menu.style.left = (x > maxX ? x - 160 : x) + 'px';
        menu.style.top = (y > maxY ? y - 120 : y) + 'px';
        
        menu.style.display = 'block';

        
        elementoSeleccionado = elmnt;
      };

      
      elmnt.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        
        const handle = elmnt.querySelector('.resize-handle');
        if (handle && e.target === handle) {
          resizeElement(e);
          return;
        }

        
        if (e.target.isContentEditable) return;

        elementoSeleccionado = elmnt;
        offsetX = e.clientX - elmnt.getBoundingClientRect().left;
        offsetY = e.clientY - elmnt.getBoundingClientRect().top;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        const top = (e.clientY - offsetY);
        const left = (e.clientX - offsetX);
        
        if (top >= 0 && left >= 0) {
          elmnt.style.top = top + "px";
          elmnt.style.left = left + "px";
        }
      }

      function resizeElement(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = elmnt.offsetWidth;
        const startHeight = elmnt.offsetHeight;

        function doResize(e) {
          const newWidth = startWidth + (e.clientX - startX);
          const newHeight = startHeight + (e.clientY - startY);
          if (newWidth > 50 && newHeight > 50) {
            elmnt.style.width = newWidth + "px";
            elmnt.style.height = newHeight + "px";
          }
        }

        function stopResize() {
          document.onmousemove = null;
          document.onmouseup = null;
        }

        document.onmousemove = doResize;
        document.onmouseup = stopResize;
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        elementoSeleccionado = null;
      }
    }

   
    window.addEventListener('DOMContentLoaded', function() {
      menu = document.getElementById('custom-context-menu');
      btnBorrar = document.getElementById('menu-borrar');
      btnAjustar = document.getElementById('menu-ajustar');

      if (btnBorrar) {
        btnBorrar.addEventListener('click', function() {
          if (elementoSeleccionado) {
            if (confirm("¿Eliminar este elemento?")) {
              elementoSeleccionado.remove();
            }
          }
          if(menu) menu.style.display = 'none';
        });
      }

      if (btnAjustar) {
        btnAjustar.addEventListener('click', function() {
          if (elementoSeleccionado) {
            const ancho = prompt("Nuevo ancho (px):", elementoSeleccionado.offsetWidth);
            const alto = prompt("Nuevo alto (px):", elementoSeleccionado.offsetHeight);
            
            if (ancho && alto) {
              elementoSeleccionado.style.width = ancho + "px";
              elementoSeleccionado.style.height = alto + "px";
            }
          }
          if(menu) menu.style.display = 'none';
        });
      }

      
      document.addEventListener('click', function(e) {
        if (menu && !menu.contains(e.target) && e.target !== elementoSeleccionado) {
          menu.style.display = 'none';
        }
      });
    });

  
    function guardarProyecto() {
      const contenido = canvas.innerHTML;
      console.log("Diseño guardado:", contenido);
      alert("¡Diseño guardado! (Revisa la consola para ver el código HTML generado)");
      localStorage.setItem('miProyectoRPG', contenido);
    }

    function cargarProyectoGuardado() {
      const guardado = localStorage.getItem('miProyectoRPG');
      if (guardado) {
        canvas.innerHTML = guardado;
      }
      const items = canvas.querySelectorAll('.editable-item');
      items.forEach(item => hacerArrastrable(item));
    }

   
    function cambiarFondo() {
      const picker = document.getElementById('color-picker');
      if (picker) {
        if (picker.style.display === 'block') {
          picker.style.display = 'none';
        } else {
          picker.style.display = 'block';
        }
      }
    }

    function aplicarColor(color) {
      document.getElementById('canvas').style.backgroundColor = color;
      const picker = document.getElementById('color-picker');
      if (picker) picker.style.display = 'none';
    }

    function agregarImagenFondo() {
      const url = document.getElementById('url-fondo').value;
      if(url) {
        document.getElementById('canvas').style.backgroundImage = `url('${url}')`;
        document.getElementById('canvas').style.backgroundColor = 'transparent';
        const picker = document.getElementById('color-picker');
        if (picker) picker.style.display = 'none';
      }
    }

   
    window.onload = function() {
      cargarProyectoGuardado();
    };