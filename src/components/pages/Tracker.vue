<template>
<div>
  <h1 class="title"><b>CONTEMPLEM....</b></h1>
  <br>

  <section class="hero is-dark is-bold">
    <div class="hero-body">
      <div class="container">
        <br><br>
        <div class="columns has-text-centered">
          <div class="column">
            <img src="static/images/decktracker1.png">
          </div>
          <div class="column">
            <img src="static/images/decktracker2.png">
          </div>
          <div class="column">
            <img src="static/images/decktracker3.png">
          </div>
        </div>
      </div>
    </div>
  </section>
  <br><br>
  <div class="has-text-centered">
    <h1 class="title">... O <b>DECKTRACKER!</b></h1>
    <h2 class="subtitle">Exclusivo para jogadores com a memória fraca</h2>
  </div>
  <br>

  <br><br><br>

  <div class="info">
    <h1 class="title">Como funciona?</h1>
    <p>
      O DECKTRACKER "escuta" por padrões de comunicação de rede enquanto você joga FAERIA, identificando quais cartas foram reveladas. Portanto, a medida que as cartas são compradas por você ou são reveladas pelo oponente elas são contabilizadas. Note que não
      é possível saber em hipótese alguma qual carta o oponente comprou até que ela seja revelada. Mesmo se fosse possível, nós não revelaríamos a você :)
    </p>
    <br><br>
    <h1 class="title">Isto é experimental</h1>
    <p>
      Como dissemos, o DECKTRACKER procura por padrões de comunicação de rede enquanto joga FAERIA. Desta forma, caso o FAERIA seja reconstruído ou o padrão seja modificado, o DECKTRACKER não funcionará. Além disso, cartas recém lançadas não constarão na lista.
      Pois, precisamos de ajuda de alguns Yaks para atualizar o DECKTRACKER frequentemente. Você pode colaborar reportando bugs no Canal Discord <a href="https://discord.gg/R5g3PwW">#card17</a>
    </p>
    <br><br>
    <h1 class="title">Ok, entendi ...</h1>
    <br><br>
  </div>

  <div class="columns download has-text-centered">
    <div class="column">
      <span class="sistema windows"><i class="fa fa-windows"></i></span><br>
      <a class="button" href="/card17-tracker-windows.zip"><span class="icon"><i class="fa fa-download"></i></span><span>Download</span></a>
      <br><br>

      <p>
        <span class="tag is-warning is-small">Nota</span>
        <p>Você deve instalar <a href="http://www.win10pcap.org/download/Win10Pcap-v10.2-5002.msi">Win10Pcap</a> <br> <b>antes</b> do Deck Tracker</p>
      </p>
    </div>
    <div class="column">
      <span class="sistema osx"><i class="fa fa-apple"></i></span><br>
      <a class="button" href="/card17-tracker-osx.zip"><span class="icon"><i class="fa fa-download"></i></span><span>Download</span></a>
      <br><br>
      <p>
        <span class="tag is-warning is-small">Nota</span>
        <p>Atualmente funciona somente<br> no "modo janela"</p>
      </p>
    </div>
    <div class="column">
      <span class="sistema linux"><i class="fa fa-linux"></i></span><br>
      <a class="button" href="/card17-tracker-linux.zip"><span class="icon"><i class="fa fa-download"></i></span><span>Download</span></a>
      <br><br>
      <p>
        <span class="tag is-warning is-small">Nota</span>
        <p>Vamos jogar? <br> :)</p>
      </p>
    </div>
  </div>
  <br><br><br><br>
  <div class="columns has-text-centered">
    <div class="is-one-quarter">
      <img src="static/images/yak0.png" style="width:80px">
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'tracker-page'
}
</script>



<style scoped>
.hero img {
  /*display: none;*/
  /*padding-top: 5px;*/
  border-radius: 5px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 5px;
}

.subtitle {
  margin-top: 10px;
}

.info h1 {
  text-transform: uppercase;
}

.info p {
  line-height: 180%;
}

.download .sistema {
  font-size: 120pt;
}

.download .sistema.windows {
  color: #687682;
}

.download .sistema.linux {
  color: #687682;
}

.download .sistema.osx {
  color: #687682;
}
</style>
