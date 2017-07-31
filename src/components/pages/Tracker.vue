<template>
<div>
  <h1 class="title"><b>{{ $t('tracker.contemplem') }}</b></h1>
  <br>

  <section class="hero is-dark is-bold">
    <div class="hero-body">
      <div class="container">
        <br>
        <div class="columns has-text-centered">
          <div class="column">
            <img :src="`static/images/c0_${$i18n.locale}.png`">
          </div>
          <div class="column">
            <img :src="`static/images/c1_${$i18n.locale}.png`">
          </div>
          <div class="column">
            <img :src="`static/images/c2_${$i18n.locale}.png`">
          </div>
        </div>
      </div>
    </div>
  </section>
  <br><br>
  <div class="has-text-centered">
    <h1 class="title" v-html="$t('tracker.o_decktracker')"></h1>
    <h2 class="subtitle">{{ $t('tracker.exclusivo') }}</h2>
  </div>
  <br>

  <br><br><br>

  <div class="info">
    <h1 class="title"> {{ $t('tracker.como_funciona') }} </h1>
    <p>
      {{ $t('tracker.como_funciona_info') }}
    </p>
    <br><br>
    <h1 class="title">{{ $t('tracker.experimental') }}</h1>
    <p v-html="$t('tracker.experimental_info')"></p>
    <br><br>
    <h1 class="title">{{ $t('tracker.problemas') }}</h1>
    <p v-html="$t('tracker.problemas_info')"></p>

    <br><br>
    <h1 class="title">{{ $t('tracker.entendi') }}</h1>
    <br><br>
  </div>

  <div class="columns download has-text-centered">
    <div class="column">
      <span class="sistema windows"><i class="fa fa-windows"></i></span><br>
      <a class="button" href="/card17-tracker-windows.zip"><span class="icon"><i class="fa fa-download"></i></span><span>Download v1.0.2</span></a>
      <br><br>

      <p>
        <span class="tag is-warning is-small">{{ $t('tracker.nota') }}</span>
        <p v-html="$t('tracker.nota_win')"></p>
      </p>
    </div>
    <div class="column">
      <span class="sistema osx"><i class="fa fa-apple"></i></span><br>
      <a class="button" href="/card17-tracker-osx.zip"><span class="icon"><i class="fa fa-download"></i></span><span>Download v1.0.2</span></a>
      <br><br>
      <p>
        <span class="tag is-warning is-small">{{ $t('tracker.nota') }}</span>
        <p v-html="$t('tracker.nota_osx')"></p>
      </p>
    </div>
    <div class="column">
      <span class="sistema linux"><i class="fa fa-linux"></i></span><br>
      <a class="button" href="/card17-tracker-linux.zip"><span class="icon"><i class="fa fa-download"></i></span><span>Download v1.0.2</span></a>
      <br><br>
      <p>
        <span class="tag is-warning is-small">{{ $t('tracker.nota') }}</span>
        <p v-html="$t('tracker.nota_linux')"></p>
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
