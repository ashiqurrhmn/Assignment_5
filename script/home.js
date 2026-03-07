const cardsContainer = document.getElementById("card-container");
const countCards = document.getElementById("count-cards");
const loadingSpinner = document.getElementById("loading-spinner");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

let allCards = [];

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  cardsContainer.innerHTML = "";
}
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

async function loadCards() {
  showLoading();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const items = await res.json();
  hideLoading();
  allCards = items.data;
  displayCards(items.data);
}
function displayCards(cards) {
  cardsContainer.innerHTML = "";
  countCards.innerHTML = `<h3 class="text-[20px] font-bold">${cards.length} Issues</h3>`;
  cards.forEach((card) => {
    const data = document.createElement("div");
    data.addEventListener("click", () => {
      loadModalData(card.id);
    });
    data.innerHTML = `
    <div class=" bg-white rounded-t-lg p-3 space-y-3 shadow border-t-3 ${card.status === "open" ? "border-green-600" : "border-purple-600"} ">
        <div class="flex justify-between">
          ${card.status === "open" ? '<img src="./assets/Open-Status.png" alt="" />' : '<img src="./assets/Closed- Status .png" alt="" />'}
          <h4 class="${
            card.priority === "high"
              ? "text-red-500 bg-red-100"
              : card.priority === "medium"
                ? "text-yellow-500 bg-yellow-100"
                : "text-gray-500 bg-gray-100"
          } px-4 rounded-3xl text-center text-[14px]">
            ${card.priority.toUpperCase()}
          </h4>
        </div>
        <p class="text-[14px] font-semibold line-clamp-1">
          ${card.title}
        </p>
        <p class="text-[12px] text-[#64748B] line-clamp-2">
          ${card.description}
        </p>
        <div class="flex gap-2">
          <div class="flex gap-1">
            <h4
              class="${card.labels[0] === "bug" ? "text-red-500 bg-red-100" : card.labels[0] === "enhancement" ? "text-green-500 bg-green-100" : "text-blue-500 bg-blue-100"} text-[12px] rounded-3xl text-center flex items-center gap-1 px-2"
            >
              ${card.labels[0] === "bug" ? '<i class="fa-solid fa-bug"></i>' : card.labels[0] === "enhancement" ? '<i class="fa-solid fa-snowflake"></i>' : '<i class="fa-regular fa-clipboard"></i>'} ${card.labels[0].toUpperCase()}
            </h4>
          </div>
          <div class="flex gap-1">
          ${
            card.labels[1]
              ? `
            <h4 class="text-[#D97706] bg-[#FFF8DB] text-[12px] rounded-3xl text-center flex items-center gap-1 px-2">
             <i class="fa-solid fa-life-ring"></i> ${card.labels[1].toUpperCase()}
            </h4>
            `
              : ""
          }
            
          </div>
        </div>
      </div>
      <div class="mt-0.5 bg-white rounded-b-lg p-3 shadow">
          
        <p class="text-[12px] text-[#64748B]">#${card.id} by ${card.author}</p>
        <p class="text-[12px] text-[#64748B]">${card.createdAt}</p>
        
      </div>
    `;
    cardsContainer.append(data);
  });
}

function resetButtons() {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");
}

allBtn.addEventListener("click", function () {
  resetButtons();
  allBtn.classList.add("btn-primary");
  displayCards(allCards);
});

openBtn.addEventListener("click", function () {
  resetButtons();
  openBtn.classList.add("btn-primary");
  const openCards = allCards.filter((card) => card.status === "open");
  displayCards(openCards);
});

closedBtn.addEventListener("click", function () {
  resetButtons();
  closedBtn.classList.add("btn-primary");
  const closedCards = allCards.filter((card) => card.status === "closed");
  displayCards(closedCards);
});

async function loadModalData(id) {

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const result = await res.json();

  const card = result.data;

  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `
        <h3 class="text-2xl font-bold">${card.title}</h3>

        <div class="flex gap-2">
          <h4 class="text-[12px] font-medium ${card.status === "open" ? "bg-green-600" : "bg-purple-600"} text-white rounded-2xl text-center px-4">
            ${card.status === "open" ? "Opened" : "Closed"}
          </h4>

          <p class="text-[12px] text-gray-400">
            • Opened by ${card.author} • ${card.createdAt}
          </p>
        </div>
        <div class="flex gap-2 my-6">
        <div class="flex gap-1">
            <h4
              class="${card.labels[0] === "bug" ? "text-red-500 bg-red-100" : card.labels[0] === "enhancement" ? "text-green-500 bg-green-100" : "text-blue-500 bg-blue-100"} text-[12px] rounded-3xl text-center flex items-center gap-1 px-2"
            >
              ${card.labels[0] === "bug" ? '<i class="fa-solid fa-bug"></i>' : card.labels[0] === "enhancement" ? '<i class="fa-solid fa-snowflake"></i>' : '<i class="fa-regular fa-clipboard"></i>'} ${card.labels[0].toUpperCase()}
            </h4>
          </div>
          <div class="flex gap-1">
          ${
            card.labels[1]
              ? `
            <h4 class="text-[#D97706] bg-[#FFF8DB] text-[12px] rounded-3xl text-center flex items-center gap-1 px-2">
             <i class="fa-solid fa-life-ring"></i> ${card.labels[1].toUpperCase()}
            </h4>
            `
              : ""
          }
            
          </div>
          </div>

        <p class="text-gray-400">${card.description}</p>

        <div class="flex gap-22 my-6 p-5 bg-[#F8FAFC] rounded-lg">
          <div>
            <p class="text-gray-400">Assignee:</p>
            <p class="font-semibold">${card.assignee || "Unassigned"}</p>
          </div>

          <div>
            <p class="text-gray-400">Priority:</p>
            <p class="text-white ${card.priority === "high" ? "bg-red-500" : card.priority === "medium" ? "bg-yellow-500" : "bg-gray-500"} rounded-2xl text-center px-3">
              ${card.priority.toUpperCase()}
            </p>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
  `;

  card_modal.showModal();
}

loadCards();
