@extends('body.main_theme')

@section('main')




<div class="container-fluid mt-2 d-flex justify-content-center">

        <div class="row">


                <form class="form-inline">

                    <button class="btn">Reset</button>
                    <input type="color" value="#00eeff" class="color">
                    <input type="number" id="sizeX" value="15" class="size">
                    <input type="number" id="sizeY" value="15" class="size">

                </form>

        <div class="container0">
            <!-- Here we will add divs representing our pixels -->
        </div>
        </div>


    </form>


</div>






<script>

    const container = document.querySelector('.container0')
    const sizeEl = document.getElementById('sizeX')
    const sizeEl2 = document.getElementById('sizeY')
    const color = document.querySelector('.color')
    const resetBtn = document.querySelector('.btn')

    let sizeX = sizeEl.value
    let sizeY = sizeEl2.value
    let draw = false

    function populate(sizeX,sizeY) {

        let size =sizeY
        if(sizeX>sizeY)
            size=sizeX
        container.style.setProperty('--size', size)

        let counter=0;
        for (let i = 0; i < sizeX; i++)
        {
            for (let i = 0; i < sizeY; i++)
            {

                counter++
                const div = document.createElement('div')
                div.setAttribute("id", counter);
                div.classList.add('pixel')

                div.addEventListener('mouseover', function () {
                    if (!draw) return
                    div.style.backgroundColor = color.value
                })
                div.addEventListener('mousdown', function () {
                    div.style.backgroundColor = color.value
                })

                container.appendChild(div)
            }
        }
    }

    window.addEventListener("mousedown", function(){
        draw = true
    })
    window.addEventListener("mouseup", function(){
        draw = false
    })

    function reset(){
        container.innerHTML = ''
        populate(sizeX,sizeY)
    }

    resetBtn.addEventListener('click', reset)

    sizeEl.addEventListener('keyup', function(){
        sizeX = sizeEl.value
        reset()
    })

    sizeEl2.addEventListener('keyup', function(){
        sizeY = sizeEl2.value
        reset()
    })

    populate(sizeX,sizeY)

</script>






<style>





    .navbar0, .container0{

        width: 1000px;
        border-radius: 3px;
    }
    .navbar0{

        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
     input{
        height: 35px;
        padding: 0 1em;
    }
    .color{
        padding: 0 .25em;
        width: 100px;
        margin: 0 1em;
    }

    .container0{
        --size: 5;
        height: 400px;
        display: grid;
        grid-template-columns: repeat(var(--size), 1fr);
        grid-template-rows: repeat(var(--size), 1fr);
        gap: 1px;

    }
    .pixel{
        background-color: rgb(61, 61, 61);
        border-radius: 2px;
    }
</style>


@endsection

