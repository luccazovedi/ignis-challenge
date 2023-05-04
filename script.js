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

  var classificacao = {};

  for (var i = 0; i < jogos.length; i++) {
    var resultado = Math.floor(Math.random() * 3);
    var mandante = jogos[i].split(' vs ')[0].trim();
    var visitante = jogos[i].split(' vs ')[1].split(' - ')[0].trim();

    if (!classificacao[mandante]) {
      classificacao[mandante] = {
        pontos: 0,
        vitorias: 0,
        derrotas: 0,
        empates: 0,
      };
    }

    if (!classificacao[visitante]) {
      classificacao[visitante] = {
        pontos: 0,
        vitorias: 0,
        derrotas: 0,
        empates: 0,
      };
    }

    if (resultado === 0) {
      classificacao[mandante].pontos += 1;
      classificacao[mandante].empates += 1;

      classificacao[visitante].pontos += 1;
      classificacao[visitante].empates += 1;
    } else if (resultado === 1) {
      classificacao[mandante].pontos += 3;
      classificacao[mandante].vitorias += 1;
      classificacao[visitante].derrotas += 1;
    } else {
      classificacao[visitante].pontos += 3;
      classificacao[visitante].vitorias += 1;
      classificacao[mandante].derrotas += 1;
    }
  }

  var classificacaoArray = [];

  for (var time in classificacao) {
    classificacaoArray.push({
      time: time,
      pontos: classificacao[time].pontos,
      vitorias: classificacao[time].vitorias,
      derrotas: classificacao[time].derrotas,
      empates: classificacao[time].empates,
    });
  }

  classificacaoArray.sort(function (a, b) {
    return b.pontos - a.pontos;
  });

  var classificacaoContainer = document.getElementById(
    'classificacaoContainer'
  );
  classificacaoContainer.style.display = 'block';

  var classificacaoDiv = document.getElementById('classificacao');
  classificacaoDiv.innerHTML = '';

  var table = document.createElement('table');
  table.classList.add('table', 'table-striped');

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

  var tbody = document.createElement('tbody');
  for (var i = 0; i < classificacaoArray.length; i++) {
    var posicao = i + 1;
    var time = classificacaoArray[i].time;
    var pontos = classificacaoArray[i].pontos;
    var vitorias = classificacaoArray[i].vitorias;
    var derrotas = classificacaoArray[i].derrotas;
    var empates = classificacaoArray[i].empates;

    var row = document.createElement('tr');
    row.innerHTML = `
  <td>${posicao}</td>
  <td>${time}</td>
  <td>${pontos}</td>
  <td style="color: #229e22;">${vitorias}</td>
  <td style="color: #d13838;">${derrotas}</td>
  <td style="color: #1f7da8;">${empates}</td>
`;
    tbody.appendChild(row);
  }
  table.appendChild(tbody);

  classificacaoDiv.appendChild(table);
}
