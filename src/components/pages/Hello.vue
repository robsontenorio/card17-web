<template>
<div>


  <div class="columns">
    <div class="column">
      <div class="notification">
        <b>CARD17 - RASTREADOR DE DESEMPENHO PESSOAL </b> <br> Anote os resultados das suas partidas e obtenha informações preciosas para aprimorar seu desempenho no <b>FAERIA</b> :)
        <br><br>
        <b>Feedback</b> <br> Canal Discord <a href="https://discord.gg/R5g3PwW">https://discord.gg/R5g3PwW</a> <br>@pedroca @orebaz
      </div>
    </div>
    <div class="column is-2">
      <h1 class="title">0.4-alpha <small>05/06/2017</small></h1>
      <figure class="image is-128x128"><img src="/static/images/egg.png" /></figure>
    </div>
  </div>

  <br>

  <h2 class="subtitle">ESTATÍSTICAS</h2>
  <progress-bar :percent="95" type="success" :showinfo="true"></progress-bar>

  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Anotação de partidas</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Winrate, vitórias, derrotas</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Desempenho do deck MODO BATALHA (bom contra / ruim contra)</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Jornada PANDORA</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Distribuição de terrenos, faerias</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Excluir decks, partidas</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Internacionalização</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Temporada: resetar estatísticas por temporada</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Colocar decks recém usados no topo</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Arquivar decks</p>

  <br><br>
  <h2 class="subtitle">DECKBUILDER</h2>
  <progress-bar :percent="85" type="success" :showinfo="true"></progress-bar>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Validação deck BATALHA e PANDORA</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Pesquisa de cartas</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> EN</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> BR</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Filtros: cor, raridade, faeria ...</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Novas cartas</p>
  <p><span class="icon"><i class="fa fa-check-square-o "></i></span> Importar decks do Faeria HUB</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Exportar imagem do deck</p>

  <br><br>
  <h2 class="subtitle">PANDORA TIERLIST</h2>
  <progress-bar :percent="0" type="success" :showinfo="true"></progress-bar>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Estatística automatizada dos valores das cartas do MODO PANDORA </p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Quadro resumo</p>

  <br><br>
  <h2 class="subtitle">COMUNIDADE</h2>
  <progress-bar :percent="0" type="success" :showinfo="true"></progress-bar>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Editar perfil</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Perfil público</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Mini blog</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Top decks</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Estatística global consolidada MODO BATALHA</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Estatística global consolidada MODO PANDORA</p>

  <br><br>
  <h2 class="subtitle">CAMPEONATOS</h2>
  <progress-bar :percent="0" type="success" :showinfo="true"></progress-bar>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Gerenciamento de torneios online</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> TEAMS: grupo de jogadores de um clã</p>

  <br><br>
  <h2 class="subtitle">BÔNUS !</h2>
  <small>Depende de interesse da ABRAKAM em colaborar com o projeto</small>
  <br><br>
  <p><span class="icon"><span class="icon"><i class="fa fa-square-o "></i></span></span> Login com ID ABRAKAM / Dados oficiais básicos do seu perfil Faeria</p>
  <p><span class="icon"><i class="fa fa-square-o "></i></span> Decktracker / envio de estatística automática ao CARD17</p>



</div>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: bold;
}
</style>
