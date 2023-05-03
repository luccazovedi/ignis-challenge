function gerarTorneio() {
  var timesTextArea = document.getElementById('times');
  var times = timesTextArea.value.trim().split('\n');

  var jogos = [];

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
  row.classList.add('row');

  var rodada1Div = document.createElement('div');
  rodada1Div.classList.add('col-md-6');

  var rodada2Div = document.createElement('div');
  rodada2Div.classList.add('col-md-6');

  for (var i = 0; i < jogos.length; i++) {
    var jogoDiv = document.createElement('div');
    jogoDiv.classList.add('card', 'mb-3');

    var jogoCardBody = document.createElement('div');
    jogoCardBody.classList.add('card-body');

    var jogoText = document.createElement('p');
    jogoText.classList.add('card-text');
    jogoText.textContent = jogos[i];

    jogoCardBody.appendChild(jogoText);
    jogoDiv.appendChild(jogoCardBody);

    if (jogos[i].includes('Rodada 1')) {
      rodada1Div.appendChild(jogoDiv);
    } else if (jogos[i].includes('Rodada 2')) {
      rodada2Div.appendChild(jogoDiv);
    }
  }
  row.appendChild(rodada1Div);
  row.appendChild(rodada2Div);
  jogosDiv.appendChild(row);
}