const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets";
const theadElTr = document.querySelector("thead tr");
const searchInput = document.querySelector("#search-input");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const count = document.querySelector(".count");

let page = 1;
async function fetchPosts(page) {
    try {
        document.querySelector(".loader").classList.remove("hidden");
        const response = await fetch(
            `${BASE_URL}?vs_currency=usd&order=market_cap_desc&per_page=30&page=${page}`
        );
        document.querySelector(".loader").classList.add("hidden");
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fillTable(page) {
    const tbody = document.querySelector("#table-body");
    const posts = await fetchPosts(page);
    tbody.innerHTML = "";
    posts.forEach((post) => {
        let trEl = document.createElement("tr");
        trEl.innerHTML = `
            <tr>
                <td>${post.market_cap_rank}</td>
                <td>
                    <img 
                        src="${post.image}"
                        alt=""/>
                    
                        ${post.name}
                </td>
                <td>$${post.current_price}</td>
                <td>
                    ${post.price_change_percentage_24h}
                    <img class="hidden" src="../assets/icons/down.svg" alt="" />
                    <img class="hidden" src="../assets/icons/up.svg" alt="">
                </td>
                <td>$${post.market_cap}</td>
            </tr>
        `;

        if (post.price_change_percentage_24h > 0) {
            trEl.querySelector(
                "img[src='../assets/icons/up.svg']"
            ).classList.remove("hidden");
            trEl.querySelector(
                "img[src='../assets/icons/up.svg']"
            ).parentElement.style.color = "green";
        }
        if (post.price_change_percentage_24h < 0) {
            trEl.querySelector(
                "img[src='../assets/icons/down.svg']"
            ).classList.remove("hidden");
        }
        tbody.append(trEl);
    });
}

let sortOrder = "desc";
function sortTable(sortOrder, num ,string = false) {
    const number = parseInt(num);
    const tbody = document.querySelector("#table-body");
    const rows = tbody.querySelectorAll("tr");
    if (string) {
        const sortedRows = Array.from(rows).sort((a, b) => {
            const aCol = a.querySelectorAll("td")[number].textContent;
            const bCol = b.querySelectorAll("td")[number].textContent;
            if (sortOrder === "asc") {
                return aCol > bCol ? 1 : -1;
            } else {
                return aCol < bCol ? 1 : -1;
            }
        });
        tbody.innerHTML = "";
        sortedRows.forEach((row) => {
            tbody.append(row);
        });
        return;
    }
    const sortedRows = Array.from(rows).sort((a, b) => {
        const aCol = a.querySelectorAll("td")[number].textContent.replace(/[^0-9.-]+/g, "");
        const bCol = b.querySelectorAll("td")[number].textContent.replace(/[^0-9.-]+/g, "");
        if (sortOrder === "asc") {
            return  Number(aCol) > Number(bCol) ? 1 : -1;
        } else {
            return Number(aCol) < Number(bCol) ? 1 : -1;
        }
    });
    tbody.innerHTML = "";
    sortedRows.forEach((row) => {
        tbody.append(row);
    });
}

theadElTr.firstElementChild.addEventListener("click", () => {
    sortTable(sortOrder, "0");
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
});

theadElTr.children[1].addEventListener("click", () => {
    sortTable(sortOrder, "1",true);
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
});
theadElTr.children[2].addEventListener("click", () => {
    sortTable(sortOrder, "2");
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
});
theadElTr.children[3].addEventListener("click", () => {
    sortTable(sortOrder, "3");
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
});
theadElTr.children[4].addEventListener("click", () => {
    sortTable(sortOrder, "4");
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
});

searchInput.addEventListener("keyup", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

function prevCheck() {
    if (page === 1) {
        previousButton.disabled = true;
        previousButton.classList.add("disabled");
    } else {
        previousButton.disabled = false;
        previousButton.classList.remove("disabled");
    }
}

previousButton.addEventListener("click", () => {
    if (page > 1) {
        page--;
        count.textContent = `Page ${page}`;
        prevCheck();
        fillTable(page);
    }
});

nextButton.addEventListener("click", () => {
    page++;
    count.textContent = `Page ${page}`;
    prevCheck();
    fillTable(page);
});


prevCheck();
fillTable(page);
