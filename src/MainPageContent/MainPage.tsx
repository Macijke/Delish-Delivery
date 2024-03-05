function MainPage() {
    fetch("http://localhost:3333/restaurations", {
        mode: "cors",
        cache: "no-cache",
        method: "GET"
    }).then(data => {
        data.json().then(json => {
            console.log(json);
        });
    });

    return (
        <div>Ale kongo</div>
    )
}

export default MainPage;