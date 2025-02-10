class MarvelComponent extends HTMLElement {
    constructor() {
      super();
    }
    render() {
      this.innerHTML = /*html*/ `
        <style>
          @import url("./styles/style.css");
        </style>
        <div class="card" onclick="openModal('Spider-Man')">
         <img src="spider-man.jpg" alt="Spider-Man">
        <div class="card-body">
            <h3>Spider-Man</h3>
        <p>Peter Parker, Nueva York</p>
  </div>
</div>

<div class="card" onclick="openModal('Iron Man')">
  <img src="iron-man.jpg" alt="Iron Man">
  <div class="card-body">
      <h3>Iron Man</h3>
      <p>Tony Stark, Nueva York</p>
  </div>
</div>

<!-- Modal Content -->
<div id="myModal" class="modal">
  <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <div id="modalContent"></div>
  </div>
</div>
        
      `;
    }
  }

customElements.define('marvel-component', MarvelComponent);