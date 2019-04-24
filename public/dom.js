document.getElementById('button').addEventListener('click', function(event) {
  event.preventDefault();
  fetchFun();
});

  function fetchFun(){
    var inputValue = document.getElementById("input").value;
    fetch('/search?q='+inputValue)
    .then(function(response) {
      console.log('This is response: ', response.body);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      document.getElementById('input').textContent = data;
    })
    .catch(function(error) {
      console.log('This is an error(Jazz): ', error);
    })
  }
