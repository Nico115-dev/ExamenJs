# Proyecto de Visualización de Personajes DC y Marvel

Este proyecto tiene como objetivo desarrollar una página web interactiva y dinámica centrada en la visualización de personajes emblemáticos de los universos de DC y Marvel. Los personajes estarán organizados por su casa de producción, lo que permitirá a los usuarios explorar fácilmente los héroes y villanos más conocidos de cada franquicia. Cada personaje contará con una ficha detallada que incluirá información relevante, como su origen, poderes, habilidades, historia en los cómics, apariciones en el cine y otras curiosidades que los fans puedan disfrutar.

## Objetivo

El propósito de este proyecto es ofrecer a los usuarios una plataforma en la que puedan explorar y aprender sobre los personajes de los universos de DC y Marvel de manera interactiva. La aplicación permite la visualización y edición de personajes, con la capacidad de agregar nuevos héroes o villanos a la base de datos.

## Funcionalidades Principales

- **Visualización de Personajes:** Los personajes se muestran organizados por casa de producción (DC o Marvel). Cada uno tiene una tarjeta con su imagen, nombre y detalles básicos.
- **Detalles del Personaje:** Al hacer clic en una tarjeta, se abrirá un modal con información completa sobre el personaje, como su nombre real, poderes, habilidades, historia en los cómics, apariciones en el cine y curiosidades.
- **Formulario para Agregar Personajes:** Los usuarios pueden agregar nuevos personajes a la base de datos, completando un formulario con los detalles relevantes.
- **Edición y Eliminación:** Los usuarios pueden editar o eliminar personajes ya existentes desde las tarjetas de personajes.

### Tecnologías Utilizadas

- **HTML:** Estructura de la página.
- **CSS:** Estilización y diseño de la interfaz.
- **JavaScript:** Lógica de la página, manejo de eventos, y consumo de la API para obtener los personajes.
- **Fetch API:** Para hacer peticiones HTTP a un servidor local donde se alojan los datos de los personajes.
- **Web Components:** Para crear elementos personalizados en la página, como las tarjetas de personajes y formularios interactivos.

### API

La URL de la API es: `http://localhost:3000/Marvel`.

### Funcionalidades del Formulario de Agregar Personaje

- El formulario permite ingresar información sobre el personaje, incluyendo nombre, origen, poderes, habilidades, historia en los cómics, apariciones en el cine y curiosidades.
- Los campos se validan para asegurarse de que los datos sean correctos y estén completos antes de enviarlos al servidor.
- Al enviar el formulario, los datos se almacenan en el servidor y el formulario se cierra automáticamente.
