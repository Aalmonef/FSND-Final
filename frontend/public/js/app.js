$(document).ready(function(){
    $('#movies').hide();
    $('#actors').hide();

    $('#movies_list').on('click', function(event){
        $('#gated-content').hide();
        $.ajax({
            method: 'GET',
            url: 'https://fsndfinal.herokuapp.com/movies',
            success: function(movie){
                $('#title').text(movie.title)
                $('#date').text(movie.release_date)
                console.log(movie)
            }
        })
        $('#movies').show();
    })
});