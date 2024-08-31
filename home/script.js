// ?vs_currency=usd&order=market_cap_desc&per_page=100&page=1
//const BASE_URL = "https://api.coingecko.com/api/v3/coins/markets";
const BASE_URL = "https://66d2cb18184dce1713ce6c31.mockapi.io/api/cryptos/user"


async function fetchPosts() {
    try {
        const response = await fetch(`${BASE_URL}`);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error(error);
    }
}

async function fillTable() {
    const tbody = document.querySelector("#table-body");
    const posts = await fetchPosts();
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
            trEl.querySelector("img[src='../assets/icons/up.svg']").classList.remove("hidden");
            trEl.querySelector("img[src='../assets/icons/up.svg']").parentElement.style.color = "green";

        }
        if (post.price_change_percentage_24h < 0) {
            trEl.querySelector("img[src='../assets/icons/down.svg']").classList.remove("hidden");
        }

        console.log(post);
        tbody.append(trEl);
    });
}

fillTable();