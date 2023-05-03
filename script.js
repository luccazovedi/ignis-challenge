function gerarTorneio() {
  var timesTextArea = document.getElementById('times');
  var times = timesTextArea.value.trim().split('\n');
  
  var jogos = [];
  var avisoTimes = document.getElementById('avisoTimes');
  var avisoCardBody = avisoTimes.querySelector('.card-body');

  if (times.length < 2) {
    avisoCardBody.classList.remove('slide-out');
    avisoCardBody.classList.add('slide-in');
    avisoTimes.style.display = 'block';

    setTimeout(function () {
      avisoCardBody.classList.remove('slide-in');
      avisoCardBody.classList.add('slide-out');
      setTimeout(function () {
        avisoTimes.style.display = 'none';
      }, 300);
    }, 3000);

    return;
  }

  for (var i = 0; i < times.length; i++) {
    var timeA = times[i].split(';')[0].trim();
    var cidadeA = times[i].split(';')[1].trim();

    for (var j = i + 1; j < times.length; j++) {
      var timeB = times[j].split(';')[0].trim();
      var cidadeB = times[j].split(';')[1].trim();

      var jogoIda = timeA + ' vs ' + timeB + ' - ' + cidadeA + ' - Rodada 1';
      var jogoVolta = timeB + ' vs ' + timeA + ' - ' + cidadeB + ' - Rodada 2';

      if (cidadeA === cidadeB) {
        jogoIda += '   (RODADA DUPLA)';
        jogoVolta += '   (RODADA DUPLA)';
      }
      jogos.push(jogoIda);
      jogos.push(jogoVolta);
    }
  }
  var jogosContainer = document.getElementById('jogosContainer');
  jogosContainer.style.display = 'block';

  var jogosDiv = document.getElementById('jogos');
  jogosDiv.innerHTML = '';

  var row = document.createElement('div');
  row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-2');

  for (var i = 0; i < jogos.length; i++) {
    var jogoDiv = document.createElement('div');
    jogoDiv.classList.add('card', 'mb-3', 'col');

    var jogoCardBody = document.createElement('div');
    jogoCardBody.classList.add('card-body');

    var jogoText = document.createElement('p');
    jogoText.classList.add('card-text');
    jogoText.textContent = jogos[i];

    jogoCardBody.appendChild(jogoText);
    jogoDiv.appendChild(jogoCardBody);

    row.appendChild(jogoDiv);
  }
  jogosDiv.appendChild(row);


  var classificacaoContainer = document.getElementById(
    'classificacaoContainer'
  );
  classificacaoContainer.style.display = 'block';

  var classificacaoDiv = document.getElementById('classificacao');
  classificacaoDiv.innerHTML = '';

  var table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  // Cabeçalho da tabela
  var thead = document.createElement('thead');
  thead.innerHTML = `
<tr>
  <th>Posição</th>
  <th>Time</th>
  <th>Pontos</th>
  <th>Vitórias</th>
  <th>Derrotas</th>
  <th>Empates</th>
</tr>
`;
  table.appendChild(thead);

}