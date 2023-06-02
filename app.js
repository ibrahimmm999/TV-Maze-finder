const form = document.querySelector("#search-form");
const wrapper = document.querySelector(".wrapper");

form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault(); // biar ga auto refresh

    document.querySelectorAll("img").forEach((img) => img.remove());

    const keyword = form.elements.query.value;
    const config = {
      params: { q: keyword },
    }; //query
    const res = await axios.get("https://api.tvmaze.com/search/shows", config);
    console.log(res.data);
    if (wrapper.children.length > 0) {
      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.lastChild);
      }
    }
    getItem(res.data);
    form.elements.query.value = "";
  } catch (error) {
    console.log(error.message);
  }
});

const getItem = (shows) => {
  if (shows.length == 0) {
  } else {
    for (let result of shows) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const p = document.createElement("p");
      img.src = result.show.image.medium;
      p.innerHTML = result.show.name;
      div.classList.add("item");
      wrapper.appendChild(div);
      div.appendChild(img);
      div.appendChild(p);

      const linkWrapper = document.createElement("div");
      const link = document.createElement("a");
      link.classList.add("link-item");
      linkWrapper.classList.add("link-wrapper");
      div.appendChild(linkWrapper);
      linkWrapper.appendChild(link);
      link.href = result.show.url;
      link.target = "_blank"; // open in new tab
      link.innerHTML = "Link";
    }
  }
};

$(".item").hover(
  function () {
    $(".link-wrapper", this).css("display", "block");
  },
  function () {
    $(".link-wrapper", this).css("display", "none");
  }
);
