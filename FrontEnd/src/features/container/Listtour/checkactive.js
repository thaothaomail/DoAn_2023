let actives = document.querySelectorAll('li');
actives.forEach(active => {
    active.addEventListener('click', function () {
        console.log("ok");
        actives.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    })
})