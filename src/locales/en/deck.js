const messages = {
  nome: 'Name',
  descricao: 'Public description',
  partidas: 'MATCHES',
  desempenho: 'PERFORMANCE',
  distribuicao: 'CARD MAP',
  editar_deck: 'Deck Edit',
  modo_batalha: 'BATTLE MODE',
  modo_pandora: 'PANDORA MODE',
  temporadas: 'SEASONS',
  batalha: 'BATTLE',
  pandora: 'PANDORA',
  vitorias: 'wins',
  derrotas: 'losses',
  winrate: 'winrate',
  progresso: 'progress',
  v: 'W',
  d: 'L',
  bom_contra: 'Good matchup',
  ruim_contra: 'Bad matchup',
  desempenho_info: 'Performance is calculated after 5 matches against <strong>same</strong> matchup (color + archetype + types [if any]). A winrate above 66% indicates good performance. A winrate below 40% indicates poor performance.',
  nenhum_deck: 'No registered decks',
  sem_cartas: 'No registered cards for this deck',
  placeholder: {
    search: 'Name or card text ...',
    nome: 'Deck name (Ex: Super Blue Jump)',
    descricao: 'Overview, muligans, strategies ...',
    nome_temporada: 'New season`s name'
  },
  botoes: {
    criar_deck: 'create deck',
    editar_deck: 'edit deck',
    reset_cartas: 'clear cards',
    encerrar_temporada: 'finish season'
  },
  notify: {
    registrado: 'deck registered',
    excluido: 'deck deleted',
    confirmar_exclusao: 'Are you sure? All statistics from this deck will be lost. You can not undo this operation!',
    encerrar_temporada: 'At the end of this season a new season will be created automatically with zeroed statistics for your decks.',
    excluir_temporada: 'By excluding this season the previous season will be reopened. Matches of the excluded season will be booked in the previous season.',
    nova_temporada: 'New season started'
  },
  validacao: {
    cartas_30: 'Max 30 cards',
    batalha_3_amostras: 'BATTLE DECK: Max of 3 copies per card',
    batalha_lendaria_1_copia: 'BATTLE DECK: Max of 1 copy per LEGENDARY card',
    nome_temporada: 'Enter new season`s name'
  }
}

export default messages
