'.bd-example-modal-lg'.on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    const myArray = button.data('whatever').split("_", 4);
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

    var modal = (this)
    modal.find('.modal-title').text('Schema ' + myArray[2])
    modal.set

    showSelectedGrid(myArray[0],myArray[1],myArray[3])
})
