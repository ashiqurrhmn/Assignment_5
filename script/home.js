const cardsContainer = document.getElementById("card-container");
const countCards = document.getElementById("count-cards");
const loadingSpinner = document.getElementById("loading-spinner");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

let allCards = [];

function showLoading(){
    loadingSpinner.classList.remove("hidden");
    cardsContainer.innerHTML = "";
}
function hideLoading(){
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
  cards.forEach((card) => {
    const data = document.createElement("div");
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
          } px-4 rounded-3xl text-center">
            ${card.priority}
          </h4>
        </div>
        <p class="text-[14px] font-semibold">
          ${card.title}
        </p>
        <p class="text-[12px] text-[#64748B] line-clamp-2">
          ${card.description}
        </p>
        <div class="flex gap-2">
          <div class="flex gap-1">
            <h4
              class="text-[#D97706] bg-[#FFF8DB] rounded-3xl text-center flex items-center gap-1 px-2"
            >
              ${card.labels[0]}
            </h4>
          </div>
          <div class="flex gap-1">
          ${
            card.labels[1]
              ? `
            <h4 class="text-[#D97706] bg-[#FFF8DB] rounded-3xl text-center flex items-center gap-1 px-2">
              ${card.labels[1]}
            </h4>
            `
              : ""
          }
            
          </div>
        </div>
      </div>
      <div class="mt-0.5 bg-white rounded-b-lg p-3 shadow">
        <div class="flex justify-between">
          <div>
        <p class="text-[12px] text-[#64748B]">#${card.id} by ${card.author}</p>
        <p class="text-[12px] text-[#64748B]">Assignee: ${card.assignee || "Unassigned"}</p>
        </div>
        <div>
        <p class="text-[12px] text-[#64748B]">Created: ${card.createdAt}</p>
        <p class="text-[12px] text-[#64748B]">Updated: ${card.updatedAt}</p>
        </div>
      </div>
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
  openBtn.classList.remove("text-[#64748B]");
  openBtn.classList.add("btn-primary");
  const openCards = allCards.filter((card) => card.status === "open");
  displayCards(openCards);
});

closedBtn.addEventListener("click", function () {
  resetButtons();
  closedBtn.classList.remove("text-[#64748B]");
  closedBtn.classList.add("btn-primary");
  const closedCards = allCards.filter((card) => card.status === "closed");
  displayCards(closedCards);
});


loadCards();
