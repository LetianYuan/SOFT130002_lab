const works = [
    {
        author: "Micheal Jackson",
        lifetime: "1022-1055",
        tips: "Human",
        photos: ["human1.jpg", "human2.jpg", "human3.jpg"]
    },
    {
        author: "Maria JK",
        lifetime: "1920-2001",
        tips: "Classical",
        photos: ["classical1.jpg", "classical2.jpg"]
    },
    {
        author: "John Herry UY",
        lifetime: "1894-1928",
        tips: "Abstract",
        photos: ["abstract1.jpg", "abstract2.jpg", "abstract3.jpg", "abstract4.jpg", "abstract5.jpg"]
    },
    {
        author: "Coco",
        lifetime: "1777-1799",
        tips: "Beauty",
        photos: ["beauty1.jpg", "beauty2.jpg"]
    }
];
const container = document.getElementsByClassName("flex-container justify")[0];
for(let i = 0; i < works.length; i++)
{
    //生成节点元素
    let section = document.createElement("div");
    let genre = document.createElement("h4");
    let authorBox = document.createElement("div");
    let author = document.createElement("h3");
    let lifetime = document.createElement("h5");
    let photoBox = document.createElement("div");
    let photoBoxTitle = document.createElement("h3");
    let button = document.createElement("button");
    //建立DOM
    section.appendChild(genre);
    section.appendChild(authorBox);
    authorBox.appendChild(author);
    authorBox.appendChild(lifetime);
    section.appendChild(photoBox);
    photoBox.appendChild(photoBoxTitle);
    section.appendChild(button);
    //生成内容与CSS属性
    section.setAttribute("class", "item");

    genre.innerHTML = "Genre : " + works[i].tips;

    authorBox.setAttribute("class", "inner-box");

    author.appendChild(document.createTextNode(works[i].author + " "));
    author.style.display = "inline";

    lifetime.appendChild(document.createTextNode("lifetime:" + works[i].lifetime));
    lifetime.style.display = "inline";
    lifetime.style.marginLeft = "1em";

    for(let j = 0; j < works[i].photos.length; j++)
    {
        let img = document.createElement("img");
        img.setAttribute("class", "photo");
        img.setAttribute("src", works[i].photos[j]);
        photoBox.appendChild(img);
    }
    photoBox.setAttribute("class", "inner-box");
    photoBoxTitle.appendChild(document.createTextNode("Popular Photos"));

    button.appendChild(document.createTextNode("Visit"));

    container.appendChild(section);
}