function calificar() {
    // se le asigna el genero al que corresponde cada grupo
    const generos = ['Rock',
    'hip hop',
    'Reggaetón',
    'Corridos tumbados',
    'Flamenco',
    'Pop',];

    // se le asigna un valor a cada genero
    const valores = tf.tensor2d([
        [1, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1],
    ]);

    // se captura los datos del usuario y se convierten en un tensor
    const user_votes = tf.tensor2d([
      [
        parseFloat(document.getElementById("soda").value),
        parseFloat(document.getElementById("peso").value),
        parseFloat(document.getElementById("decadentes").value),
        parseFloat(document.getElementById("shakira").value),
        parseFloat(document.getElementById("ntvg").value),
        parseFloat(document.getElementById("top").value),
        parseFloat(document.getElementById("rosalia").value),
      ],
    ]);

    // se calcula la calificacion
    const calificacion = tf.matMul(user_votes, valores);

    // se obtiene los generos con mayor calificacion
    const top_user_features = tf.topk(calificacion, generos.length);

    const top_genres = top_user_features.indices.arraySync()[0];

    const rankedGenres = top_genres.map((index) => generos[index]);

    // Mostrar el resultado en la página
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<p>
          <em>
          Según tus respuesta, tus géneros musicales favoritos son: ${rankedGenres.join(", ")}
          </em>
          </p>`;
  }