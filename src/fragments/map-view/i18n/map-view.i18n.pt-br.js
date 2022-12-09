export default {
  mapView: {
    routeTo: 'Calcular rota para este lugar',
    polygonDetails: 'Detalhes do polígono',
    polygon: 'Polígono',
    whatIsHere: 'O que existe aqui ?',
    directionsFromHere: 'Rota a partir daqui',
    fitAllFeatures: 'Exibir todos os elementos',
    addRouteStop: 'Adicionar parada aqui',
    addDestinationToRoute: 'Adicionar à rota',
    acquirePositionErrors: {
      generic: 'Não foi possível adquirir sua localização porque ela não foi autorizada ou porque o navegador/dispositivo não a suporta.',
      unavailable: 'De acordo com seu dispositivo, sua localização não está disponível no momento. Certifique-se de que a opção/serviço de posicionamento esteja devidamente configurado.',
      permissionDenied: 'Sua posição não pôde ser adquirida porque o dispositivo negou o acesso a ela. Você pode tentar novamente alterando as configurações do dispositivo e depois clicando novamente no botão "minha posição".',
      timeout: 'Seu navegador/dispositivo retornou "tempo esgotado" enquanto tentava adquirir uma posição. Você pode tentar novamente clicando no botão "minha posição".'
    },
    yourCurrentLocation: 'Sua localização atual',
    options: 'Opções',
    polylineMeasure: {
      bearingTextIn: 'Dentro',
      bearingTextOut: 'Fora',
      tooltipTextDragAndDelete: 'Clique e arraste para <b>mover um ponto</b>br>Pressione SHIFT-key e clique para <b>deletar um ponto</b>',
      tooltipTextResume: '<br>Pressione CTRL-key e clique para <b>continuar uma linha</b>',
      tooltipTextDelete: 'Pressione  SHIFT e clique para <b>excluir um ponto</b>',
      tooltipTextAdd: 'Pressione CTRL-key e clique para <b>adicionar um ponto</b>',
      clearControlTitle: 'Limpar medidas',
      measureControlTitleOn: 'Ativar medida de distância',
      measureControlTitleOff: 'Desativar medida de distância',
      unitControlTitle: {
        text: 'Alterar unidades',
        metres: 'metros',
        landmiles: 'milhas terrestres',
        nauticalmiles: 'milhas náuticas'
      },
      clearControlLabel: '&times',
      measureControlLabel: '&#8614;',
      measureControlClasses: [],
      unitControlLabel: {
        metres: 'm',
        kilometres: 'km',
        feet: 'pés',
        landmiles: 'M',
        nauticalmiles: 'MN'
      }
    },
    defineAvoidPolygon: 'Definir polígonos a serem evitados na rota',
    defineAvoidRectangle: 'Definir retângulos a serem evitados na rota',
    youCantIntersectPolygons: 'Não é possível interceptar polígonos',
    polygonArea: 'Área do polígono',
    highlighting: 'Destaque',
    accuracy: 'Precisão',
    youCanCenterAtYourLocationLater: 'Você pode centralizar o mapa em sua localização atual a qualquer momento clicando no botão "minha localização".',
    yourLocation: 'Use a sua localização',
    setMyLocationAsMapCenter: 'Você quer centralizar o mapa em sua localização atual? Isto melhorará a precisão da busca no local. Você terá que autorizar, se solicitado.',
    removePlace: 'Remover local',
    viewOnORS: 'Ver no ORS',
    moveMapPositionToLeft: 'Mover mapa para a esquerda',
    moveMapPositionToRight: 'Mover mapa para a direita',
    moveMapPositionToUp: 'Mover mapa para cima',
    moveMapPositionToDown: 'Mover mapara para baixo',
    toggleDirect: 'Alternar direto daqui até o próximo local',
    heightGraph: {
      distance: 'Distância',
      elevation: 'Elevação',
      segment_length: 'Distância do segmento',
      type: 'Tipo',
      legend: 'Legenda'
    },
    editShape: 'Alterar forma',
    remove: 'Remover',
    avoidPolygonSaved: 'Polígono a evitar salvo',
    avoidPolygonRemoved: 'Polígono a evitar excluído',
    avoidPolygonNotRemoved: 'Não foi possível excluir o polígono a evitar',
    avoidPolygonNotSaved: 'Não foi possível salvar o polígono a evitar',
    polygonEditModeEnabled: 'Quando terminar as alterações clicke em qualquer lugar para salvar',
    customTileProvider: 'Provedor de mapa definido pelo usuário',
    gestureHandling: {
      touch: 'Use dois dedos para mover o mapa',
      scroll: 'Pressione Ctrl e role a tela simultaneamente para aplicar zoom no mapa',
      scrollMac: 'Use \u2318 e role a tela simultaneamente para aplicar zoom no mapa'
    }
  }
}
