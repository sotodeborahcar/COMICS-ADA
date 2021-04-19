Querida Debo, 

Felicitaciones por tan excelente trabajo. En general todo funciona bien, el comportamiento es fluido, no hay efectos secundarios inesperados, esta pagina esta lista para ser publicada y usada. Como siempre, la calidad de tus trabajos refleja un nivel de compromiso y talento muy destacable, muy por encima de tu experiencia. 

A nivel visual, la unica observacion que tengo para desktop es que el color del input es muy negro en modo oscuro, y se dificulta saber lo que estoy buscando. Sobre mobile no tengo comentarios porque... responsive no esta implementado! Entiendo que el tiempo no jugó a favor en este TP y que CSS no era el foco de este trabajo, pero hoy por hoy mas del 50% de los usuarios son mobile, y esa cifra puede subir al 70% u 80% cuando se trata de redes sociales. Este es un trabajo hermoso, muy bien hecho, que deberias compartir orgullosa. Pero si lo compartís sin el responsive implementado vas a dejar afuera a muchisimos usuarios, y arruinar la buenisima impresion que deberia dar el excelente codigo que escribiste.  

A nivel comportamiento, algunas cositas que no funcionan como debieran. Si hago click en un comic y luego hago una nueva busqueda, el detalle se sigue viendo. Pasa lo mismo si busco un personaje y luego voy a un comic. El titulo de la seccion dice "personajes" aunque debajo yo vea comics. No se bien qué falló aqui, si fue un descuido, falta de tiempo o un problema que no pudiste resolver. En caso de que sea el ultimo, por favor no dejes de escribirme que te cuento como solucionarlo, o te doy una pista en caso de que no quieras toda la respuesta :D. No lo dejo aqui por si queres verlo vos, pero una ayudita: pensa bien en que momentos de tu aplicacion queremos ocultar la lista de personajes, la lista de comics, el detalle de personajes y el detalle de comics. Y una vez aue tengas eso definido, busca en que funciones tendriamos que ocultarlos.

Otra cosita a comentar es que en la descripcion en el detalle del comic estas asumiendo que vendrá la información que necesitas. Eso es un error, en las APIs en general, y en la de Marvel en particular. Notá que si falta la descripción terminamos viendo "descripción: null" en la web. Cuando trabajamos con APIs, o con información que haya escrito un usuario, *siempre* debemos programar a la defensiva: asumiendo que todo lo que puede salir mal, saldrá mal. Que no vendrá la información que esperamos, que vendrá vacía, o mal formateada.  En lugar de agregar simplemente `description` a la tarjeta, agregamos `description || "No hay descripcion disponible"`, asi nuestro usuario no ve un `null` o un campo vacio. 

Tengo que destacar la excelente implemetacion del modo oscuro que hiciste. Felicitaciones por eso!

Con respecto a tu HTML, usas a la perfeccion las etiquetas semanticas, los nombres de clases son excelentes, y que bien que aprovechaste BEM en el Sass!!! Lo unico que me llama la atencion es cierta cantidad de comentarios en HTML cuya funcion no entiendo. No dejamos comentarios en el codigo final, a menos que sea algo que el lector deba saber, como aclaraciones, titulos, etc. Dejar codigo comentado sin mas (algo que tambien haces en JS con varios console log) no es buena practica, y no deberias hacerlo ni en entregas para Ada, ni en challenges para empresas. Con respecto al SASS, esta impecable: perfecto uso de variables y mixins, me encantaron tus mixins. Parece hecho por alguien con mucha mas experiencia que vos. 

Tu JS esta muy bien. Usas correctamente los conocimientos vistos a lo largo del modulo, tu codigo en general esta bien funcionalizado. Tenes tendencia a la desprolijidad: muchas cosas que deberian estar en HTML estan en JS, muchos comentarios sueltos por ahi, console log no borrados, y algunas variables innecesarias. Un segundo repaso para dejarlo lo mas prolijo posible habria sido bienvenido, aunque entiendo que el tiempo no jugó a favor. 

Con respecto a tu github, celebro que hayas ido trabajando correctamente commit a commit y que tengas varias branches. Quiza quieras mencionar en tu readme que el usuario va a tener que tener LiveServer para ejecutarlo en local. 

Mas alla de estos puntos, insisto en que el codigo es fantastico: solo hago estas observaciones para que quede aun mejor. 

Felicitaciones nuevamente, y seguí asi! 

Con respecto a los restantes factores de evaluacion, 

 
  ✅ Respeta la consigna
  ✅ Respeta el diseño dado
  ✔️ Respeta el funcionamiento
  ❌ Responsive funciona correctamente

  ✅ HTML semántico
  ✅ Código bien indentado
  ✅ Buenos nombres de clases
  ✅ Buenos nombres de funciones y variables
  ✅ Uso de variables (SASS)

  ✅ Buena estructura y separación de archivos (SASS)
  ✅ Correcto uso de estilos anidados (SASS)
  ✅ Nombres de branchs adecuados

  ✅ Componentización de estilos (SASS)
  ✅ Funciones pequeñas
  ✅ Lógica clara y simple
  ✅ Separación clara de manejo de datos y visualización

  ✅ Reutilización de lógica / funciones
  ✅ Commits con mensajes adecuados

Nota final: **9**


