async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let currentDate = `${day}-${month}-${year}__${hour}:${minutes}:${seconds}`;

    link.download = `${currentDate}.jpeg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

window.addEventListener("btn", function (e) {
    console.log(e.index)
    if (e.pressed){
        switch (e.index){
            case 0:
                downloadImage('http://raspberrypi.local:8080/?action=snapshot')
                break
            case 3:
                el = document.getElementById("logs");
                el.innerHTML = ''
                break
        }
    }
})

