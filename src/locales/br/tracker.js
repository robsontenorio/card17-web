const messages = {
  contemplem: 'CONTEMPLEM...',
  o_decktracker: '...O <b>DECKTRACKER</b>!',
  exclusivo: 'Exclusivo para jogadores com memória fraca',
  como_funciona: 'Como funciona?',
  como_funciona_info: 'O DECKTRACKER "escuta" por padrões de comunicação durante a partida, identificando quais cartas foram reveladas. Portanto, a medida que as cartas são compradas por você ou são reveladas pelo oponente elas são contabilizadas. Note que não é possível saber em hipótese alguma qual carta o oponente comprou até que ela seja revelada. Mesmo se fosse possível, nós não revelaríamos a você :)',
  experimental: 'Isto é experimental',
  experimental_info: 'Como dissemos, o DECKTRACKER procura por padrões de comunicação de rede enquanto joga FAERIA. Desta forma, caso o FAERIA seja reconstruído ou o padrão seja modificado, o DECKTRACKER não funcionará. Além disso, cartas recém lançadas não constarão na lista. Pois, precisamos de ajuda de alguns Yaks para atualizar o DECKTRACKER frequentemente. Você pode colaborar reportando bugs no Canal Discord <a href="https://discord.gg/R5g3PwW">#card17</a>',
  problemas: 'Problemas conhecidos',
  problemas_info: '- Não funciona no modo PANDORA.<br><br>- Cartas que criam cartas ALEATÓRIAS podem bagunçar a contagem do DECKTRACKER ao serem jogadas (Ex: Turbilhão de Feitiços). <br><br>- Caso a conexão seja perdida ou o jogo seja fechado deve-se reiniciar o procedimento: Fechar o FAERIA, fechar o TRACKER.  Abrir o TRACKER , abrir o FAERIA. Claro, você pode terminar sua partida primeiro antes de fechar!<br><br>- Decks criados durante a sessão não são reconhecidos imediatamente pelo DECKTRACKER (você deve reiniciar o procedimento). Decks editados são reconhecidos normalmente.<br><br>-Funciona localmente e não envia os dados ao CARD17...por enquanto.',
  entendi: 'Ok, entendi ...',
  nota: 'nota',
  nota_win: 'Você deve instalar <a href="http://www.card17.com/WinPcap.zip"> WinPcap</a> <br> <b>antes</b> do DECKTRACKER',
  nota_osx: 'Atualmente funciona somente<br>no "modo janela"',
  nota_linux: 'Vamos jogar?<br>:)'
}

export default messages
