class MarvelComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    const characters = await this.loadData();
    this.innerHTML = /*html*/ `
      <style>
        @import url("./styles/style.css");
      </style>
      <header>
        <button id="addHeroButton">Agregar Superhéroe</button>
        <div id="formContainer" class="form-container" style="display: none;">
          <h2>Crear Superhéroe</h2>
          <form id="heroForm">
            <input type="hidden" id="heroId" />  <!-- Este campo será usado para identificar al héroe -->
            <label for="nombre">nombre:</label>
            <input type="text" id="nombre" name="nombre" required/>
            <label for="origen">origen:</label>
            <input type="text" id="origen" name="origen" required />
            <label for="imagen">imagen:</label>
            <input type="text" id="imagen" name="imagen" required />
            <label for="poderes">poderes (separados por comas):</label>
            <input type="text" id="poderes" name="poderes" required />
            <label for="habilidades">habilidades (separados por comas):</label>
            <input type="text" id="habilidades" name="habilidades" required />
            <label for="historia_comics">Historia en los cómics:</label>
            <textarea id="historia_comics" name="historia_comics" required></textarea>
            <label for="apariciones_cine">Apariciones en cine (separados por comas):</label>
            <input type="text" id="apariciones_cine" name="apariciones_cine" required />
            <label for="curiosidades">Curiosidades (separados por comas):</label>
            <input type="text" id="curiosidades" name="curiosidades" required />
            <button type="submit">Guardar</button>
            <button type="button" id="cancelButton">Cancelar</button>
          </form>
        </div>
      </header>

      <div class="cards-container">
        ${characters.map((character) => `
          <div class="card" data-id="${character.id}">
            <img src="${character.imagen}" alt="${character.nombre}">
            <div class="card-body">
              <h3>${character.nombre}</h3>
              <p>${character.origen}</p>
            </div>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
          </div>
        `).join('')}
      </div>

      <div id="myModal" class="modal" style="display: none;">
        <div class="modal-content">
          <span class="close">&times;</span>
          <div id="modalContent"></div>
        </div>
      </div>
    `;

    this.addEventListeners(characters);
  }

  async loadData() {
    const response = await fetch('http://localhost:3000/Marvel');
    const data = await response.json();
    console.log('Respuesta de la API:', data);
    return data;
  }

  addEventListeners(characters) {
    const addHeroButton = this.querySelector('#addHeroButton');
    addHeroButton.addEventListener('click', () => this.toggleForm(true));

    const cancelButton = this.querySelector('#cancelButton');
    cancelButton.addEventListener('click', () => this.toggleForm(false));

    const form = this.querySelector('#heroForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveHero();
    });

    // Mostrar detalles del héroe en el modal
    this.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-id');
        this.showHeroDetailsInModal(id, characters);
      });
    });

    const modal = this.querySelector('#myModal');
    const closeBtn = this.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });

    // Editar un héroe
    this.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const id = card.getAttribute('data-id');
        this.editHero(id, characters);
        e.stopPropagation();  // Para evitar que se abra el modal al hacer clic en "Editar"
      });
    });

    // Eliminar un héroe
    this.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const id = card.getAttribute('data-id');
        this.deleteHero(id);
        e.stopPropagation();  // Para evitar que se abra el modal al hacer clic en "Eliminar"
      });
    });
  }

  showHeroDetailsInModal(id, characters) {
    const modal = this.querySelector('#myModal');
    const modalContent = modal.querySelector('#modalContent');
    const character = characters.find(c => c.id == id);

    modalContent.innerHTML = `
      <h2>${character.nombre}</h2>
      <img src="${character.imagen}" alt="${character.nombre}" style="max-width: 100%; height: auto;">
      <p><strong>Origen:</strong> ${character.origen}</p>
      <p><strong>Poderes:</strong> ${character.poderes.join(', ')}</p>
      <p><strong>Habilidades:</strong> ${character.habilidades.join(', ')}</p>
      <p><strong>Historia en los cómics:</strong> ${character.historia_comics}</p>
      <p><strong>Apariciones en cine:</strong> ${character.apariciones_cine.join(', ')}</p>
      <p><strong>Curiosidades:</strong> ${character.curiosidades.join(', ')}</p>
    `;

    modal.style.display = 'block';
  }

  async saveHero() {
    const form = this.querySelector('#heroForm');
    const heroId = form.heroId.value;
    const newHero = {
      nombre: form.nombre.value,
      origen: form.origen.value,
      imagen: form.imagen.value,
      poderes: form.poderes.value.split(',').map(p => p.trim()),
      habilidades: form.habilidades.value.split(',').map(h => h.trim()),
      historia_comics: form.historia_comics.value,
      apariciones_cine: form.apariciones_cine.value.split(',').map(a => a.trim()),
      curiosidades: form.curiosidades.value.split(',').map(c => c.trim())
    };

    if (heroId) {
      // Si heroId existe, significa que estamos actualizando un héroe existente
      const response = await fetch(`http://localhost:3000/Marvel/${heroId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHero)
      });

      const updatedCharacter = await response.json();
      console.log('Héroe actualizado:', updatedCharacter);
    } else {
      // Si no existe heroId, significa que estamos creando un nuevo héroe
      const response = await fetch('http://localhost:3000/Marvel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHero)
      });

      const newCharacter = await response.json();
      console.log('Héroe guardado:', newCharacter);
    }

    this.toggleForm(false);
    this.render();
  }

  async editHero(id, characters) {
    const character = characters.find(c => c.id == id);
    const form = this.querySelector('#heroForm');
    form.heroId.value = character.id;  // Guardamos el id del héroe que estamos editando
    form.nombre.value = character.nombre;
    form.origen.value = character.origen;
    form.imagen.value = character.imagen;
    form.poderes.value = character.poderes.join(', ');
    form.habilidades.value = character.habilidades.join(', ');
    form.historia_comics.value = character.historia_comics;
    form.apariciones_cine.value = character.apariciones_cine.join(', ');
    form.curiosidades.value = character.curiosidades.join(', ');

    this.toggleForm(true);
  }

  async deleteHero(id) {
    const response = await fetch(`http://localhost:3000/Marvel/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log('Héroe eliminado');
      this.render();
    } else {
      console.error('Error al eliminar el héroe');
    }
  }

  toggleForm(show) {
    const formContainer = this.querySelector('#formContainer');
    formContainer.style.display = show ? 'block' : 'none';
  }
}

customElements.define('marvel-component', MarvelComponent);
